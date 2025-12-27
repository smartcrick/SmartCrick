from rest_framework import serializers
from registration.models import User

# -----------------------------
# LOGIN SERIALIZER
# -----------------------------
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)


# -----------------------------
# FORGOT PASSWORD SERIALIZER
# -----------------------------
class ForgotPasswordSerializer(serializers.Serializer):
    email = serializers.EmailField()


# -----------------------------
# RESET PASSWORD SERIALIZER
# -----------------------------
class ResetPasswordSerializer(serializers.Serializer):
    new_password = serializers.CharField(
        write_only=True, min_length=6, required=True
    )
    confirm_password = serializers.CharField(
        write_only=True, min_length=6, required=True
    )

    def validate(self, data):
        if data["new_password"] != data["confirm_password"]:
            raise serializers.ValidationError(
                {"confirm_password": "Passwords do not match"}
            )
        return data
