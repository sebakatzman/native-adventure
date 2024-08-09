FROM python:3.9.1

WORKDIR /code

# Copia requirements.txt a /code/requirements.txt.
COPY requirements.txt /code/

# Actualizar pip a la ultima version
RUN pip install --upgrade pip

# Instala dependencias.
RUN pip install -r requirements.txt
