from django.urls import path
from .views import (
    LoginAPIView,
    GoogleLoginAPIView,
    ForgotPasswordAPIView,
    ResetPasswordAPIView,
)

urlpatterns = [
    path("login/", LoginAPIView.as_view()),
    path("google-login/", GoogleLoginAPIView.as_view()),
    path("forgot-password/", ForgotPasswordAPIView.as_view()),
    path("reset-password/<str:uidb64>/<str:token>/", ResetPasswordAPIView.as_view()),
]
