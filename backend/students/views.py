# from django.shortcuts import render
from .models import Student
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import StudentSerializer
from django.http.response import JsonResponse, Http404

class StudentView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        print("POST SCHOOL ID : ", request.user.schoolId)
        data = request.data
        data["schoolId"] = request.user.schoolId  # Add the logged-in user's ID to the data
        serializer = StudentSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Student successfully created", safe=False)
        return JsonResponse("Failed to add student", safe=False)
    

    def get_student_details(self, pk):
        try:
            return Student.objects.get(studentId=pk)
        except Student.DoesNotExist:
            raise Http404("Student does not exist")

    def get(self, request, pk=None):
        if pk:
            data = self.get_student_details(pk=pk)
            serializer = StudentSerializer(data)
        else:
            print("SCHOOL ID : ", request.user.schoolId)
            school_id = request.user.schoolId 
            students = Student.objects.filter(schoolId=school_id)
            if not students.exists():
                return Response(
                    {"message": "No students are associated with this account.", "students": []},
                    status=200
                )
            serializer = StudentSerializer(students, many=True)
        return Response(serializer.data)
    
    def put(self, request, pk=None):
        student_to_update = Student.objects.get(studentId=pk)
        serializer = StudentSerializer(instance=student_to_update, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Student info successfully updated", safe=False)
        return JsonResponse("Failed to update student info", safe=False)
    
    def delete(self, request, pk=None):
        student_to_delete = Student.objects.get(studentId=pk)
        student_to_delete.delete()
        return JsonResponse("Student info successfully deleted", safe=False)


