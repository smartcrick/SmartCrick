"""URL configuration for smartcrick_backend project."""

from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.http import HttpResponse
from django.urls import include, path
from drf_spectacular.views import SpectacularAPIView, SpectacularRedocView, SpectacularSwaggerView


def home(request):
    return HttpResponse("SmartCrick Backend is running")


urlpatterns = [
    path("admin/", admin.site.urls),
    path("", home),
    path("api/schema/", SpectacularAPIView.as_view(), name="schema"),
    path("api/docs/", SpectacularSwaggerView.as_view(url_name="schema"), name="swagger-ui"),
    path("api/redoc/", SpectacularRedocView.as_view(url_name="schema"), name="redoc"),
    path("api/test/", include("testapi.urls")),
    path("api/register/", include("registration.urls")),
    path("api/auth/", include("authentication.urls")),
    path("api/profile/", include("user_profile.urls")),
    path("api/", include("performance.urls")),
    path("api/", include("analysis.urls")),
    path("api/", include("recommendation.urls")),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
