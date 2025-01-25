from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError
from .serializers import LoginSerializer, SignUpSerializer

class SignUpView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        data = request.data
        serializer = SignUpSerializer(data=data)

        if serializer.is_valid():
            user = serializer.save()
            return Response({"message": "User successfully created", "user": serializer.data}, status=status.HTTP_201_CREATED)
        return Response({"message": "User creation failed", "errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.validated_data, status=200)
    
class SignOutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.data.get('refresh')
            if not refresh_token:
                return Response({'error': 'Refresh token is required'}, status=400)
            
            token = RefreshToken(refresh_token)
            token.blacklist()  # Blacklist the token
            
            return Response({"message": "User signed out successfully"}, status=200)
        except TokenError:
            return Response({"error": "Invalid or expired token"}, status=400)
