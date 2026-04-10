from django.conf import settings
from django.db import models


class Recommendation(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    weakness = models.CharField(max_length=100)
    recommendation_text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)