from rest_framework.views import APIView
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from drf_spectacular.utils import extend_schema

from .serializers import ProfileSerializer


class ProfileAPIView(APIView):
    permission_classes = [IsAuthenticated]

    @extend_schema(
        responses=ProfileSerializer,
        description="Get the authenticated user's profile"
    )
    def get(self, request):
        profile = request.user.profile
        serializer = ProfileSerializer(profile)
        return Response(serializer.data)


    @extend_schema(
        request=ProfileSerializer,
        responses=ProfileSerializer,
        description="Update entire profile (PUT) — supports multipart for avatar"
    )
    def put(self, request):
        profile = request.user.profile
        serializer = ProfileSerializer(profile, data=request.data, partial=False)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    @extend_schema(
        request=ProfileSerializer,
        responses=ProfileSerializer,
        description="Partially update user profile (PATCH)"
    )
    def patch(self, request):
        profile = request.user.profile
        serializer = ProfileSerializer(profile, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
