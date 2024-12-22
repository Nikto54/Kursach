from rest_framework import viewsets

from blog.filters import PostFilter, NewsFilter
from blog.models import News, Post
# from blog.pagination import CustomBlogResultsSetPagination
from blog.serializers import NewsSerializer, PostSerializer


class NewsViewSet(viewsets.ModelViewSet):
    queryset = News.objects.all()
    serializer_class = NewsSerializer
    filterset_class = NewsFilter


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    filterset_class = PostFilter