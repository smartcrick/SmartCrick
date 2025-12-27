from django.urls import path
from .views import LoginAPIView, LogoutAPIView, GoogleLoginAPIView

urlpatterns = [
    path("login/", LoginAPIView.as_view(), name="login_api"),
    path("logout/", LogoutAPIView.as_view(), name="logout_api"),
    path("google-login/", GoogleLoginAPIView.as_view(), name="google_login_api"),
]
