from datetime import date

from performance.models import Goal, Performance
from registration.models import User
from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework_simplejwt.tokens import RefreshToken


class RecommendationAPITestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username="recommendation-user",
            email="recommendation@example.com",
            password="testpass123",
            full_name="Recommendation User",
            country="Pakistan",
        )
        refresh = RefreshToken.for_user(self.user)
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {refresh.access_token}")

    def test_recommendations_endpoint_returns_weakness_and_goal_guidance(self):
        Performance.objects.create(
            user=self.user,
            role="allrounder",
            session_type="practice",
            date=date(2026, 4, 10),
            short_ball_success=20,
        )
        Goal.objects.create(
            user=self.user,
            goal_type="batting",
            improvement_area="Strike Rate",
            description="Increase run scoring tempo.",
        )

        response = self.client.get("/api/recommendations/")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        weaknesses = [item["weakness"] for item in response.data]
        self.assertIn("Weak against short ball", weaknesses)
        self.assertIn("Low Strike Rate", weaknesses)
