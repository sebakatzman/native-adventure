FROM python:3.9.1

WORKDIR /code

# Copia requirements.txt a /code/requirements.txt.
COPY requirements.txt /code/

# Actualizar pip a la ultima version
RUN pip install --upgrade pip

# Instala dependencias.
RUN pip install -r requirements.txt

# Crea el directorio static
RUN mkdir -p /code/static

# Copia todo el contenido de la carpeta actual a /code.
COPY . /code/

# Expone el puerto 8000.
EXPOSE 8000

# Ejecuta el comando "python manage.py runserver
CMD ["python", "manage.py", "runserver"]