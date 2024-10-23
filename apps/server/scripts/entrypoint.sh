#!/bin/sh
# Definir la ruta absoluta donde debe ejecutarse el script

# Crear el archivo .env
touch /app/apps/server/.env

# Iterar sobre todas las variables de entorno y guardarlas en el archivo .env
for var in $(printenv)
do
  # Formato esperado: VAR_NAME=value
  # Filtrar la variable para evitar que algunas variables sensibles de Docker se guarden.
  if echo "$var" | grep -q -v '^PWD=\|^SHLVL=\|^_=.\|^OLDPWD=\|^HOME=\|^HOSTNAME=\|^PATH=\|^TERM='; then
    echo "$var" >> /app/apps/server/.env
  fi
done

exec "$@"
