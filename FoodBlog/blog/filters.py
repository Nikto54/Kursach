from django_filters import rest_framework as filters
from .models import Post, News


class PostFilter(filters.FilterSet):
    username = filters.CharFilter(field_name='user__username', lookup_expr='icontains')

    class Meta:
        model = Post
        fields = ['username']


class NewsFilter(filters.FilterSet):
    author = filters.CharFilter(field_name='author__username', lookup_expr='icontains')

    class Meta:
        model = News
        fields = ['author']