from django.db import models
from django.conf import settings

class Performance(models.Model):
    ROLE_CHOICES = [
        ('batter', 'Batter'),
        ('bowler', 'Bowler'),
        ('allrounder', 'All-Rounder'),
    ]

    SESSION_TYPE = [
        ('match', 'Match'),
        ('practice', 'Practice'),
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    # Core
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)
    session_type = models.CharField(max_length=20, choices=SESSION_TYPE)
    date = models.DateField()

    # Match Info
    opponent = models.CharField(max_length=100, blank=True)
    venue = models.CharField(max_length=100, blank=True)
    result = models.CharField(max_length=20, blank=True)

    # Practice Info
    practice_type = models.CharField(max_length=100, blank=True)
    duration = models.IntegerField(null=True, blank=True)  # in minutes
    focus_area = models.CharField(max_length=100, blank=True)

    # Batting
    runs = models.IntegerField(null=True, blank=True)
    balls = models.IntegerField(null=True, blank=True)
    fours = models.IntegerField(default=0)
    sixes = models.IntegerField(default=0)
    dismissal_type = models.CharField(max_length=50, blank=True)

    # Practice batting
    short_ball_success = models.FloatField(null=True, blank=True)
    cover_drive_success = models.FloatField(null=True, blank=True)

    # Bowling
    overs = models.FloatField(null=True, blank=True)
    runs_conceded = models.IntegerField(null=True, blank=True)
    wickets = models.IntegerField(null=True, blank=True)

    # Practice bowling
    yorker_accuracy = models.FloatField(null=True, blank=True)
    line_length_accuracy = models.FloatField(null=True, blank=True)

    # Fielding
    catches = models.IntegerField(default=0)
    run_outs = models.IntegerField(default=0)

    # AI (future)
    ai_feedback = models.JSONField(null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.date}"
    
    
class Goal(models.Model):
    GOAL_TYPES = [
        ('batting', 'Batting'),
        ('bowling', 'Bowling'),
        ('fitness', 'Fitness'),
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    performance = models.ForeignKey(
        Performance,
        on_delete=models.CASCADE,
        related_name="goals",
        null=True,
        blank=True,
    )
    goal_type = models.CharField(max_length=20, choices=GOAL_TYPES)
    improvement_area = models.CharField(max_length=100)
    description = models.TextField(blank=True)

    created_at = models.DateTimeField(auto_now_add=True)


class Video(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    performance = models.ForeignKey(Performance, on_delete=models.CASCADE, related_name='videos')

    video = models.FileField(upload_to='videos/')
    video_type = models.CharField(max_length=50)
    description = models.TextField(blank=True)

    uploaded_at = models.DateTimeField(auto_now_add=True)
