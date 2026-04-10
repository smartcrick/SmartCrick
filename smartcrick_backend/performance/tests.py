from datetime import date

from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework_simplejwt.tokens import RefreshToken

from performance.models import Goal, Performance
from registration.models import User


class PerformanceAPITestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username="player-one",
            email="player-one@example.com",
            password="testpass123",
            full_name="Player One",
            country="Pakistan",
        )
        self.other_user = User.objects.create_user(
            username="player-two",
            email="player-two@example.com",
            password="testpass123",
            full_name="Player Two",
            country="India",
        )
        refresh = RefreshToken.for_user(self.user)
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {refresh.access_token}")

    def test_create_performance_assigns_authenticated_user(self):
        payload = {
            "role": "batter",
            "session_type": "match",
            "date": str(date(2026, 4, 10)),
            "opponent": "Warriors",
            "venue": "National Stadium",
            "runs": 42,
            "balls": 30,
        }

        response = self.client.post("/api/performance/", payload, format="json")

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Performance.objects.count(), 1)
        self.assertEqual(Performance.objects.get().user, self.user)

    def test_list_performance_only_returns_authenticated_user_records(self):
        Performance.objects.create(
            user=self.user,
            role="batter",
            session_type="match",
            date=date(2026, 4, 9),
            runs=55,
            balls=34,
        )
        Performance.objects.create(
            user=self.other_user,
            role="bowler",
            session_type="practice",
            date=date(2026, 4, 8),
            wickets=3,
            overs=4,
        )

        response = self.client.get("/api/performance/")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]["runs"], 55)

    def test_create_goal_assigns_authenticated_user(self):
        payload = {
            "goal_type": "batting",
            "improvement_area": "Strike Rate",
            "description": "Increase scoring rate in powerplay overs.",
        }

        response = self.client.post("/api/goals/", payload, format="json")

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Goal.objects.count(), 1)
        self.assertEqual(Goal.objects.get().user, self.user)

    def test_patch_performance_updates_authenticated_user_record(self):
        performance = Performance.objects.create(
            user=self.user,
            role="batter",
            session_type="practice",
            date=date(2026, 4, 10),
            runs=32,
            balls=24,
        )

        response = self.client.patch(
            f"/api/performance/{performance.id}/",
            {"runs": 54, "balls": 38},
            format="json",
        )

        performance.refresh_from_db()

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(performance.runs, 54)
        self.assertEqual(performance.balls, 38)

    def test_create_goal_can_link_to_owned_performance(self):
        performance = Performance.objects.create(
            user=self.user,
            role="bowler",
            session_type="match",
            date=date(2026, 4, 11),
            wickets=2,
            overs=4,
        )
        payload = {
            "goal_type": "batting",
            "improvement_area": "Strike Rate",
            "description": "Increase scoring rate in powerplay overs.",
            "performance": performance.id,
        }

        response = self.client.post("/api/goals/", payload, format="json")

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Goal.objects.count(), 1)
        self.assertEqual(Goal.objects.get().performance, performance)

    def test_create_goal_rejects_other_users_performance(self):
        other_performance = Performance.objects.create(
            user=self.other_user,
            role="bowler",
            session_type="practice",
            date=date(2026, 4, 12),
            wickets=3,
            overs=4,
        )
        payload = {
            "goal_type": "batting",
            "improvement_area": "Strike Rate",
            "performance": other_performance.id,
        }

        response = self.client.post("/api/goals/", payload, format="json")

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("performance", response.data)
