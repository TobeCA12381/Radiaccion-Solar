import pandas as pd
from sqlalchemy import create_engine
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, r2_score
import numpy as np

# Crear la conexión usando SQLAlchemy
engine = create_engine('mysql+mysqldb://RSG3:tu_contraseña@192.168.1.110/arduinodata')

# Consultar los datos de la tabla registros
query = """
    SELECT fecha, hora, uv_intensity
    FROM registros
"""
df = pd.read_sql(query, engine)

# Convertir la columna 'fecha' a tipo datetime si no está en ese formato
df['fecha'] = pd.to_datetime(df['fecha'])

# Convertir la columna 'hora' a tipo timedelta si no está en ese formato
df['hora'] = pd.to_timedelta(df['hora'])

# Crear una columna de hora legible para concatenar con fecha
df['hora_legible'] = df['hora'].astype(str).str.split().str[-1]

# Crear la columna 'fechahora' combinando fecha y hora_legible
df['fechahora'] = pd.to_datetime(df['fecha'].astype(str) + ' ' + df['hora_legible'])

# Convertir fechahora a segundos desde una fecha base (por ejemplo, época UNIX)
df['fechahora_seconds'] = (df['fechahora'] - pd.Timestamp("1970-01-01")) // pd.Timedelta('1s')

# Agregar características adicionales
df['hour'] = df['fechahora'].dt.hour
df['minute'] = df['fechahora'].dt.minute
df['second'] = df['fechahora'].dt.second

# Seleccionar características y variable objetivo
X = df[['fechahora_seconds', 'hour', 'minute', 'second']]
y = df['uv_intensity'].values

# Dividir los datos en conjuntos de entrenamiento y prueba
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Inicializar y entrenar el modelo de regresión lineal
model = LinearRegression()
model.fit(X_train, y_train)

# Evaluar el modelo en el conjunto de prueba
y_pred_test = model.predict(X_test)
mse = mean_squared_error(y_test, y_pred_test)
r2 = r2_score(y_test, y_pred_test)

print(f'\nError Cuadrático Medio (MSE): {mse}')
print(f'Coeficiente de Determinación (R²): {r2}')

# Fecha y hora para la predicción (ejemplo: '2024-06-25 14:29:00')
fecha_hora_pred = pd.Timestamp('2024-06-25 15:47:00')

# Convertir a segundos desde la época UNIX
fecha_hora_pred_seconds = (fecha_hora_pred - pd.Timestamp("1970-01-01")) // pd.Timedelta('1s')

# Extraer hora, minuto y segundo de la fecha y hora para predicción
hora_pred = fecha_hora_pred.hour
minuto_pred = fecha_hora_pred.minute
segundo_pred = fecha_hora_pred.second

# Convertir a formato numpy array para predicción
X_pred = np.array([[fecha_hora_pred_seconds, hora_pred, minuto_pred, segundo_pred]])

# Hacer la predicción
y_pred = model.predict(X_pred)

# Formatear la predicción a dos decimales
uv_prediccion_formateada = f'{y_pred[0]:.2f}'

# Mostrar el resultado de la predicción formateado
print(f'Predicción de UV intensity para {fecha_hora_pred}: {uv_prediccion_formateada}')
