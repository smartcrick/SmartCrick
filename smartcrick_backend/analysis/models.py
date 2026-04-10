from django.conf import settings
from django.db import models


class Analysis(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    # Batting
    avg_runs = models.FloatField(null=True, blank=True)
    strike_rate = models.FloatField(null=True, blank=True)

    # Bowling
    avg_wickets = models.FloatField(null=True, blank=True)
    economy = models.FloatField(null=True, blank=True)

    # Weakness detection
    weaknesses = models.JSONField(null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)