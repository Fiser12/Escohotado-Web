#!/bin/sh
# Definir la ruta absoluta donde debe ejecutarse el script
TARGET_DIR="/app/apps/web"

# Cambiar al directorio especificado
cd "$TARGET_DIR" || exit 1

# Crear el archivo .env
touch /app/.env

# Iterar sobre todas las variables de entorno y guardarlas en el archivo .env
for var in $(printenv)
do
  # Formato esperado: VAR_NAME=value
  # Filtrar la variable para evitar que algunas variables sensibles de Docker se guarden.
  if echo "$var" | grep -q -v '^PWD=\|^SHLVL=\|^_=.\|^OLDPWD=\|^HOME=\|^HOSTNAME=\|^PATH=\|^TERM='; then
    echo "$var" >> /app/.env
  fi
done

#Ejecutamos las migraciones nuevas
yarn prisma migrate deploy
# Ejecutar el comando que se pase como argumento
exec "$@"
