from django.urls import path
from .views import RegisterApiView

urlpatterns = [
    path("", RegisterApiView.as_view(), name="register_api"),
]
