from django.urls import path, include

from . import views


urlpatterns = [
    path('api/create', views.PostCreate),
    path('api/<int:pk>', views.PostDetail.as_view()),
    path('api/', views.PostList.as_view()),
    path('', views.index, name='redirect'),
    path('v2', views.indexv2),
]
