from django.db import models
from login.models import LoginCredentials

# Create your models here.
class Student(models.Model):
    studentId = models.AutoField(primary_key=True)
    standard = models.CharField(max_length=20)
    firstName = models.CharField(max_length=100)
    lastName = models.CharField(max_length=100)
    registrationNo = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    course = models.CharField(max_length=100)
    schoolId = models.ForeignKey(
        LoginCredentials,
        on_delete=models.CASCADE,
        db_column='schoolId',
        related_name='students'
    )