# from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import StudentSerializer
from django.http.response import JsonResponse

class StudentView(APIView):

    def post(self, request):
        data = request.data
        serializer = StudentSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Student successfully created", safe=False)
        return JsonResponse("Failed to add student", safe=False)