from sqlalchemy import create_engine

engine = create_engine('mysql+mysqldb://RSG3:tu_contraseña@34.151.233.27/Grupo3')

try:
    connection = engine.connect()
    print("Conexión exitosa")
    connection.close()
except Exception as e:
    print(f"Error de conexión: {e}")
