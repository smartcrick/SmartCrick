#!/bin/sh
# wait-for-db.sh
set -e
host="$1"
shift
until PGPASSWORD=${POSTGRES_PASSWORD:-smartcrick_pass} psql -h "$host" -U "${POSTGRES_USER:-smartcrick_user}" -c '\q' 2>/dev/null; do
  echo "Waiting for Postgres at $host..."
  sleep 2
done
exec "$@"
