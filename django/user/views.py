from django.shortcuts import get_object_or_404
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.views import APIView
from rest_framework.response import Response
from django.conf import settings
import jwt
import datetime
from django.utils import timezone
import random
from .models import *
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User
from .serializers import UserSerializer




# Create your views here.
class SignupView(APIView):
    def  post(self,request):
        if request.method == 'POST':
            username = request.data['username']
            email = request.data['email']
            password = request.data['password']
            # Create a new user
            user = User.objects.create_user(username=username, email=email, password=password)
            # Optionally, set other fields like first_name and last_name
            user.first_name = request.data['first_name']
            user.last_name = request.data['last_name']
            user.save()
            serializer = UserSerializer(user)
            return Response(serializer.data)

class LoginView(APIView):
    def post(self, request):
        username = request.data["username"]
        password = request.data["password"]

        user = User.objects.filter(username=username).first()

        if user is None:
            raise AuthenticationFailed("incorrect username")
        if not user is None and not user.check_password(password):
            raise AuthenticationFailed("incorrect password")

        payload = {
            "id": user.pk,
            "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
            "iat": datetime.datetime.utcnow(),
        }
        token = jwt.encode(payload, settings.JWT_SECRET_KEY, algorithm="HS256")

        response = Response()
        response.data = {"response": "success"}
        response.set_cookie("jwt", token, httponly=True, samesite="None", secure=True)
        return response
    
class UserView(APIView):
    def get(self, request):
        token = request.COOKIES.get("jwt")

        if not token:
            raise AuthenticationFailed("Unauthenticated")

        try:
            # Decode the token using the JWT_SECRET_KEY from settings
            payload = jwt.decode(token, settings.JWT_SECRET_KEY, algorithms=["HS256"])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed("Unauthenticated")

        # Retrieve the user using the payload's 'id' field
        user = User.objects.filter(id=payload["id"]).first()

        # Serialize the user using your UserSerializer
        serializer = UserSerializer(user)

        return Response(serializer.data)
    
class CheckUsernameAvailability(APIView):
    def post(self, request):
        username = request.data.get("username")
        if User.objects.filter(username=username).exists():
            return Response({"isTaken": True})
        return Response({"isTaken": False})
    
class CheckEmailAvailability(APIView):
    def post(self, request):
        email = request.data.get("email")
        if User.objects.filter(email=email).exists():
            return Response({"isTaken": True})
        return Response({"isTaken": False})

