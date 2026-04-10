from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from .utils import generate_recommendations


class RecommendationView(APIView):
    def get(self, request):
        user = request.user
        data = generate_recommendations(user)
        return Response(data)