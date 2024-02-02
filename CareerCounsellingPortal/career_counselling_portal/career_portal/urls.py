from django.urls import path
from . import views

urlpatterns = [
    path('sendOTP', views.sendOTP, name='sendOTP'),
    path('registerUser', views.registerUser, name='registerUser'),
    path('checkEmail',views.checkEmail,name='checkEmail'),
    path('fetchBlogsData', views.fetchBlogsData, name='fetchBlogsData'),
    path('blogDetails',views.blogDetails,name='blogDetails'),
    path('saveReviews', views.saveReviews, name = 'saveReviews'),
]