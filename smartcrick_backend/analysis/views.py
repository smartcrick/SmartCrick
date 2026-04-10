from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from .utils import generate_analysis


class AnalysisView(APIView):
    def get(self, request):
        user = request.user
        result = generate_analysis(user)
        return Response(result)