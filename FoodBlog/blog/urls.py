from django.urls import path
from .views import MainView,ProductCreateView, ProductDeleteView,main_page

urlpatterns = [
    path('', main_page, name='main_page'),
    path('product/add/', ProductCreateView.as_view(), name='product_add'),
    path('product/delete/<int:pk>/', ProductDeleteView.as_view(), name='product_delete'),
]
