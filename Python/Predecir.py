import pandas as pd
import joblib
import config
import numpy as np
import tensorflow as tf
from tensorflow import keras
from itertools import product
from sqlalchemy import create_engine

# Cargar el modelo y el escalador guardados
model = keras.models.load_model('uv_intensity_model.keras')
scaler = joblib.load('scaler.pkl')

# Construir la URL de conexión
db_url = f"mysql+mysqldb://{config.DATABASE_USER}:{config.DATABASE_PASSWORD}@{config.DATABASE_HOST}/{config.DATABASE_NAME}"

# Crear el motor de la base de datos
engine = create_engine(db_url)
# Generar nuevas fechas y horas para todos los días de la semana y horas especificadas
dates = pd.date_range(start='2024-07-01', periods=7, freq='D')  # Una semana de datos
hours = pd.date_range('12:00', '17:00', freq='H').time  # De 12:00 PM a 5:00 PM

# Crear todas las combinaciones de fechas y horas
data = list(product(dates, hours))
new_data = pd.DataFrame(data, columns=['fecha', 'hora'])

# Convertir la columna 'hora' a tipo timedelta
new_data['hora'] = pd.to_timedelta(new_data['hora'].astype(str))

# Crear una columna de hora legible para concatenar con fecha
new_data['hora_legible'] = new_data['hora'].astype(str).str.split().str[-1]

# Crear la columna 'fechahora' combinando fecha y hora_legible
new_data['fechahora'] = pd.to_datetime(new_data['fecha'].astype(str) + ' ' + new_data['hora_legible'])

# Convertir fechahora a segundos desde una fecha base (por ejemplo, época UNIX)
new_data['fechahora_seconds'] = (new_data['fechahora'] - pd.Timestamp("1970-01-01")) // pd.Timedelta('1s')

# Agregar características adicionales
new_data['hour'] = new_data['fechahora'].dt.hour
new_data['minute'] = new_data['fechahora'].dt.minute
new_data['second'] = new_data['fechahora'].dt.second
new_data['month'] = new_data['fechahora'].dt.month
new_data['dayofweek'] = new_data['fechahora'].dt.dayofweek
new_data['dayofyear'] = new_data['fechahora'].dt.dayofyear
new_data['day'] = new_data['fechahora'].dt.day

# Crear una columna con el nombre del día de la semana
new_data['day_name'] = new_data['fechahora'].dt.day_name()

# Seleccionar características para predicción
X_new = new_data[['fechahora_seconds', 'hour', 'minute', 'second', 'month', 'dayofweek', 'dayofyear', 'day']]

# Normalizar características usando el escalador cargado
X_new_scaled = scaler.transform(X_new)

# Realizar predicciones
predictions = model.predict(X_new_scaled)

# Añadir las predicciones al dataframe
new_data['predicted_uv_intensity'] = predictions

# Mostrar las predicciones con el nombre del día
print(new_data[['fechahora', 'day_name', 'predicted_uv_intensity']])



# Ajustar los datos para coincidir con las columnas de la tabla
new_data_to_insert = new_data[['fecha', 'hora_legible', 'predicted_uv_intensity', 'day_name']]
new_data_to_insert.columns = ['fecha', 'hora', 'uv_intensity', 'dia_semana']

# Insertar los datos en la tabla
new_data_to_insert.to_sql('pronostico', con=engine, if_exists='append', index=False)
