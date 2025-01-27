from rest_framework import serializers
from django.contrib.auth.hashers import check_password
from rest_framework_simplejwt.tokens import RefreshToken
from .models import LoginCredentials

# serializers.py
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = LoginCredentials
        fields = ('schoolId', 'schoolName', 'email', 'town', 'state', 'pincode', 'country')

class SignUpSerializer(serializers.ModelSerializer):
    class Meta:
        model = LoginCredentials
        fields = (
            'schoolId',
            'schoolName',
            'email',
            'password',
            'town',
            'state',
            'pincode',
            'country'
        )
 
    def create(self, validated_data):
        # Check if email already exists
        # print("Validated Data:", validated_data.get('schoolName'))  
        if LoginCredentials.objects.filter(email=validated_data['email']).exists():
            raise serializers.ValidationError({"email": "Email already exists"})
        
        # Ensure password is hashed before saving
        password = validated_data.pop('password')
        user = LoginCredentials(**validated_data)
        user.set_password(password)  # Hashing password before saving
        user.save()

        # Generate tokens for the new user
        refresh = RefreshToken.for_user(user)
        refresh["schoolId"] = str(user.schoolId)  # Store custom user identifier in the token
        access_token = refresh.access_token

        return {
            "user": user,
            "refresh": str(refresh),
            "access": str(access_token),
        }
    
class LoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField() 
    password = serializers.CharField(write_only=True) 

    class Meta:
        model = LoginCredentials
        fields = ('email','password')


    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')

        try:
            user = LoginCredentials.objects.get(email=email)
        except LoginCredentials.DoesNotExist:
            raise serializers.ValidationError({"email": "Invalid email or password."})

        # Check password
        if not check_password(password, user.password):
            raise serializers.ValidationError({"password": "Invalid email or password."})

        refresh = RefreshToken.for_user(user)
        refresh["schoolId"] = str(user.schoolId)  # Store custom user identifier in the token
        access_token = refresh.access_token

        return {
            "refresh": str(refresh),
            "access": str(access_token),
        }
