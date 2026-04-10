from rest_framework import serializers

from .models import Performance, Goal, Video


class PerformanceSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Performance
        fields = "__all__"
        read_only_fields = ("user", "created_at")


class GoalSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Goal
        fields = "__all__"
        read_only_fields = ("user", "created_at")

    def validate_performance(self, value):
        request = self.context.get("request")
        if request and value.user_id != request.user.id:
            raise serializers.ValidationError("You can only attach goals to your own performance entries.")
        return value


class VideoSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Video
        fields = "__all__"
        read_only_fields = ("user", "uploaded_at")

    def validate_performance(self, value):
        request = self.context.get("request")
        if request and value.user_id != request.user.id:
            raise serializers.ValidationError("You can only attach videos to your own performance entries.")
        return value
