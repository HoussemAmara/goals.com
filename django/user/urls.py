from django.contrib import admin
from django.urls import path
from user.views import *

urlpatterns = [
    path("signup/", SignupView.as_view()),  # api/users/signup/
    path("login/", LoginView.as_view()),  # api/users/login/
    path("user/", UserView.as_view()),  # api/users/user/
    path("checkusernameavailability/", CheckUsernameAvailability.as_view()),  # api/users/checkusernameavailability/
    path("checkemailavailability/", CheckEmailAvailability.as_view()),  # api/users/checkemailavailability/
]
