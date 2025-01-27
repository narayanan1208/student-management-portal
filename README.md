Open a new terminal and the following commands:
Backend:
(a) Install the virtual environment: python -m venv venv
(b) Activate the virtual environment: venv\Scripts\activate for windows or source venv/bin/activate for mac/linux.
(c) Install the packages: pip install Django, pip install djangorestframework, pip install django-cors-headers
(d) Creates a backend folder inside parent: django-admin startproject backend
(e) Change directory to backend and check if django app is running: python manage.py runserver
(f) Create a students app: python manage.py startapp students
(g) Create a student model in students/models.py
(h) Add the students app details, rest_framework, corsheaders in INSTALLED_APPS field present in backend/settings.py
(i) Do the migration for students app: python manage.py makemigrations students
(j) Check sql migration structure: python manage.py sqlmigrate students 0001
(k) Do the migration: python manage.py migrate
(l) Create a user account for django admin: python manage.py createsuperuser and set the credentials.
(m) Follow step 'e' and access the admin adding /admin after 8000 in url and login in using the created credentials.
(n) Register the student model in students/admin.py to view it in admin page.
(o) On reloading, Students model will be seen in admin page.
(p) Create a students/serializers.py file for serializing json into students model.
(q) Write CRUD operations in students/views.py file.
(r) Create a students/urls.py and add the path to access it.
(s) Add the students url path in backend/urls.py

Frontend:
(a) Install nodejs
(b) Create a new react-typescript app frontend using vite: npm create vite@latest frontend --template react-ts
(c) Install packages: npm bootstrap, npm react-bootstrap, npm install cdbreact, npm install @reduxjs/toolkit react-redux

Authntication:
(a) Install the package: pip install djangorestframework-simplejwt
(b) Create a login app: python manage.py startapp login
(c) Create a login model in students/models.py
(d) Add the login app details, rest_framework_simplejwt, rest_framework_simplejwt.token_blacklist in INSTALLED_APPS field present in backend/settings.py
(e) Add below configuration in backend/settings.py:  
    REST_FRAMEWORK = {
        'DEFAULT_AUTHENTICATION_CLASSES': [
            'rest_framework_simplejwt.authentication.JWTAuthentication',
        ],
    }

    SIMPLE_JWT = {
        'USER_ID_FIELD': 'schoolId',
        'USER_ID_CLAIM': 'user_id',
        'ACCESS_TOKEN_LIFETIME': timedelta(minutes=5),
        'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
        'ROTATE_REFRESH_TOKENS': True,
        'BLACKLIST_AFTER_ROTATION': True,
        'AUTH_HEADER_TYPES': ('Bearer',),
    }

    AUTH_USER_MODEL = 'login.LoginCredentials'
(e) Do the migration for login app: python manage.py makemigrations login
(f) Check sql migration structure: python manage.py sqlmigrate login 0001
(g) Do the migration: python manage.py migrate
