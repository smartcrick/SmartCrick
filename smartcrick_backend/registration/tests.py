from django.test import SimpleTestCase


class RegisterCorsTests(SimpleTestCase):
    def test_register_preflight_allows_loopback_frontend_origin(self):
        response = self.client.options(
            "/api/register/",
            HTTP_ORIGIN="http://127.0.0.1:5173",
            HTTP_ACCESS_CONTROL_REQUEST_METHOD="POST",
        )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.headers.get("access-control-allow-origin"), "http://127.0.0.1:5173")
