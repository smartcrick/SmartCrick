from rest_framework.views import APIView
from rest_framework.response import Response

from .utils import generate_analysis


class AnalysisView(APIView):
    def get(self, request):
        return Response(generate_analysis(request.user))
