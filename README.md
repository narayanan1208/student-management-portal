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
(i) Do the miggration for students app: python manage.py makemigrations students
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