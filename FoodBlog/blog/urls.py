from .views import NewsViewSet, PostViewSet


from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'news', NewsViewSet, basename='news')
router.register(r'posts', PostViewSet, basename='post')
urlpatterns = router.urls
