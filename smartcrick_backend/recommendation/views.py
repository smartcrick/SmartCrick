from rest_framework.response import Response
from rest_framework.views import APIView

from .utils import generate_recommendations


class RecommendationView(APIView):
    def get(self, request):
        return Response(generate_recommendations(request.user))
