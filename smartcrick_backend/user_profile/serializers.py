from rest_framework import serializers

from .models import Profile


class ProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source="user.username", read_only=True)
    email = serializers.EmailField(source="user.email", read_only=True)
    full_name = serializers.CharField(source="user.full_name", required=False)
    country = serializers.CharField(source="user.country", required=False)

    class Meta:
        model = Profile
        fields = ["username", "email", "full_name", "country", "phone", "bio", "updated_at"]
        read_only_fields = ["username", "email", "updated_at"]

    def update(self, instance, validated_data):
        user_data = validated_data.pop("user", {})
        user = instance.user
        if "full_name" in user_data:
            user.full_name = user_data["full_name"]
        if "country" in user_data:
            user.country = user_data["country"]
        user.save()

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance
