# Getting Started with VENV installed

## Available Scripts

In the project directory, you can run:

### `python manage.py runserver`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000)

### `python manage.py migrate`

applies all pending migrations to the database, updating its schema to match your Django models.

### `python manage.py makemigrations`

creates new migration files by detecting changes you’ve made in your Django models.

### `pip install djangorestframework-simplejwt`

installs the Simple JWT package, which is an authentication library for Django REST Framework that provides JSON Web Token (JWT) authentication.

in short, It lets your Django API issue, verify, and refresh JWT tokens for secure user authentication. ✅

### `python -m venv .venv`

creates a virtual environment named .venv in your project folder, which is an isolated Python environment where you can install packages without affecting your system-wide Python. ✅

### `install python.exe -m pip install --upgrade pip`

👉 This command upgrades pip (Python’s package installer) to the newest version inside the selected Python environment.

### `django-admin startproject backend . `

👉 Without the dot, Django would create a new folder named backend; with the dot, it puts the project files directly into your existing folder.

### `Django>=5.0,<6.0" djangorestframework "psycopg[binary]>=3.1"`

This ensures your project uses Django 5.x, Django REST Framework, and PostgreSQL support via psycopg 3.1+.

### `python manage.py startapp api`

creates a new Django application named api inside your project, generating a folder with starter files (models.py, views.py, apps.py, etc.) so you can build features for that app. ✅