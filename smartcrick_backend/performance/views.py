from rest_framework import viewsets

from .models import Goal, Performance, Video
from .serializers import GoalSerializer, PerformanceSerializer, VideoSerializer


class PerformanceViewSet(viewsets.ModelViewSet):
    serializer_class = PerformanceSerializer

    def get_queryset(self):
        return Performance.objects.filter(user=self.request.user).order_by("-date", "-created_at")

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class GoalViewSet(viewsets.ModelViewSet):
    serializer_class = GoalSerializer

    def get_queryset(self):
        return Goal.objects.filter(user=self.request.user).order_by("-created_at")

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class VideoViewSet(viewsets.ModelViewSet):
    serializer_class = VideoSerializer

    def get_queryset(self):
        return Video.objects.filter(user=self.request.user).order_by("-uploaded_at")

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
