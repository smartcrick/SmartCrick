from rest_framework.test import APITestCase
from django.urls import reverse
from registration.models import User
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken

class ProfileAPITest(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', email='t@test.com', password='testpass123', full_name='Test User', country='Pakistan')
        refresh = RefreshToken.for_user(self.user)
        self.access = str(refresh.access_token)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.access}')

    def test_get_profile(self):
        url = reverse('profile_api')
        resp = self.client.get(url)
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        self.assertEqual(resp.data['username'], 'testuser')
        self.assertEqual(resp.data['email'], 't@test.com')

    def test_update_profile_partial(self):
        url = reverse('profile_api')
        resp = self.client.patch(url, {'phone': '12345', 'bio': 'hello'})
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        self.assertEqual(resp.data['phone'], '12345')
        self.assertEqual(resp.data['bio'], 'hello')

    def test_unauthenticated(self):
        # remove credentials
        self.client.credentials()
        url = reverse('profile_api')
        resp = self.client.get(url)
        self.assertEqual(resp.status_code, status.HTTP_401_UNAUTHORIZED)
