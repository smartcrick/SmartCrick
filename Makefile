PYTHON := venv/bin/python
PIP := $(PYTHON) -m pip
DJANGO_USE_SQLITE ?= True
DJANGO := DJANGO_USE_SQLITE=$(DJANGO_USE_SQLITE) $(PYTHON) smartcrick_backend/manage.py

.PHONY: help setup setup-backend setup-frontend run-backend run-frontend lint lint-backend lint-frontend fix-lint fix-lint-backend fix-lint-frontend check test makemigrations migrate clean docker-up docker-down

help:
	@printf "Available targets:\n"
	@printf "  setup            Create local backend/frontend dependencies\n"
	@printf "  run-backend      Start Django dev server\n"
	@printf "  run-frontend     Start Vite dev server\n"
	@printf "  lint             Run backend and frontend lint checks\n"
	@printf "  fix-lint         Autofix backend and frontend lint issues\n"
	@printf "  check            Run Django system checks\n"
	@printf "  test             Run Django tests\n"
	@printf "  makemigrations   Create Django migrations\n"
	@printf "  migrate          Apply Django migrations\n"
	@printf "  clean            Remove generated local artifacts\n"
	@printf "  docker-up        Start docker compose stack\n"
	@printf "  docker-down      Stop docker compose stack\n"

setup: setup-backend setup-frontend

setup-backend:
	test -d venv || python3 -m venv venv
	$(PIP) install --upgrade pip
	$(PIP) install -r smartcrick_backend/requirements.txt ruff

setup-frontend:
	npm --prefix frontend install

run-backend:
	$(DJANGO) runserver 0.0.0.0:8000

run-frontend:
	npm --prefix frontend run dev -- --host 0.0.0.0

lint: lint-backend lint-frontend

lint-backend:
	$(PYTHON) -m ruff check smartcrick_backend

lint-frontend:
	npm --prefix frontend run lint

fix-lint: fix-lint-backend fix-lint-frontend

fix-lint-backend:
	$(PYTHON) -m ruff check --fix smartcrick_backend
	$(PYTHON) -m ruff format smartcrick_backend

fix-lint-frontend:
	npm --prefix frontend run lint -- --fix

check:
	$(DJANGO) check

test:
	$(DJANGO) test

makemigrations:
	$(DJANGO) makemigrations

migrate:
	$(DJANGO) migrate

clean:
	rm -rf .ruff_cache .pytest_cache frontend/dist frontend/node_modules
	find . -type d -name "__pycache__" -prune -exec rm -rf {} +
	find . -type f -name "*.pyc" -delete

docker-up:
	docker compose up --build

docker-down:
	docker compose down
