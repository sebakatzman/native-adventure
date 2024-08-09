# Native Adventure

## Build and run DEV

Editar /front/.env

```bash
$ cd front
$ cp .env.example .env
$ nano .env
$ # Configurar dominio del backend
$ cd ..
$ docker compose build
$ docker compose up -d
```

## Build and run PROD

```bash
$ cd front
$ cp .env.example .env
$ nano .env
$ # Configurar dominio del backend
$ cd ..
$ docker compose -f docker-compose.production.yml build
$ docker compose -f docker-compose.production.yml up -d

hola
```
