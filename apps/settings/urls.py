from django.urls import path
from .views import index,about,menu,news,news_detail,photo,contact

urlpatterns = [
    path('', index, name="index"),
    path('about/', about, name="about"),
    path('menu/', menu, name="menu"),
    path('news/', news, name="news"),
    path('news_detail/', news_detail, name="news_detail"),
    path('photo/', photo, name="photo"),
    path('contact/', contact, name="contact"),
]
