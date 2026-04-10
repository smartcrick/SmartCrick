from datetime import date

from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework_simplejwt.tokens import RefreshToken

from performance.models import Performance
from registration.models import User


class AnalysisAPITestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username="analysis-user",
            email="analysis@example.com",
            password="testpass123",
            full_name="Analysis User",
            country="Pakistan",
        )
        refresh = RefreshToken.for_user(self.user)
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {refresh.access_token}")

    def test_analysis_endpoint_returns_aggregated_metrics(self):
        Performance.objects.create(
            user=self.user,
            role="allrounder",
            session_type="practice",
            date=date(2026, 4, 10),
            runs=40,
            balls=20,
            wickets=2,
            overs=4,
            runs_conceded=24,
            short_ball_success=35,
            yorker_accuracy=30,
        )
        Performance.objects.create(
            user=self.user,
            role="allrounder",
            session_type="match",
            date=date(2026, 4, 9),
            runs=20,
            balls=10,
            wickets=1,
            overs=2,
            runs_conceded=18,
        )

        response = self.client.get("/api/analysis/")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["avg_runs"], 30)
        self.assertEqual(response.data["strike_rate"], 200)
        self.assertEqual(response.data["avg_wickets"], 1.5)
        self.assertEqual(response.data["economy"], 7)
        self.assertIn("Weak against short ball", response.data["weaknesses"])
        self.assertIn("Poor yorker accuracy", response.data["weaknesses"])
