from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth.models import User

from blog.models import Status


class PostAPITest(APITestCase):

    def setUp(self):
        url = '/api/v1/posts/'
        self.user = User.objects.create_user(username='fardz1', email='<EMAILasd>', password='<PASSWORDsd>')
        self.post1  = self.client.post(url, data={'title': 'test', 'body': 'test', 'user': self.user.id}).json().get('id')

    def test_get_posts(self):
        url = '/api/v1/posts/'
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_post_post(self):
        url = '/api/v1/posts/'
        response = self.client.post(url, data={'title': 'test', 'body': 'test', 'user': self.user.id})
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_patch_posts(self):
        url = f'/api/v1/posts/{self.post1}/'
        response = self.client.patch(url, data={'title': 'test1', 'body': 'test2'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class NewsAPITest(APITestCase):

    def setUp(self):
        url = '/api/v1/news/'
        self.user = User.objects.create_user(username='fardz', email='<EMAIL>', password='<PASSWORD>')
        self.status = Status.objects.create(name='test')
        self.news1  = self.client.post(url, data={'title': 'test', 'body': 'test', 'author': self.user.id, 'status': self.status.id}).json().get('id')

    def test_get_news(self):
        url = '/api/v1/news/'
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_post_news(self):
        url = '/api/v1/news/'
        response = self.client.post(url, data={'title': 'test', 'body': 'test', 'author': self.user.id, 'status': self.status.id})
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_patch_news(self):
        url = f'/api/v1/news/{self.news1}/'
        response = self.client.patch(url, data={'title': 'test1', 'body': 'test2'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class AuthAPITest(APITestCase):

    def setUp(self):
        url = '/api/v1/users/'
        self.client.post(url, data={'username': 'user12', 'password': '1q2w3e4rF'})
        url = '/api/v1/jwt/create/'
        self.tokens = self.client.post(url, data={'username': 'user12', 'password': '1q2w3e4rF'}).json()

    def test_jwt_create(self):
        url = '/api/v1/jwt/create/'
        response = self.client.post(url, data={'username': 'user12', 'password': '1q2w3e4rF'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_user_create(self):
        url = '/api/v1/users/'
        response = self.client.post(url, data={'username': 'user13', 'password': '1q2w3e4rF'})
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        response = self.client.post(url, data={'username': 'user12', 'password': '1q2w3e4rF'})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_refresh_token(self):
        url = f'/api/v1/jwt/refresh/'
        response = self.client.post(url, data={'refresh': self.tokens['refresh']})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
