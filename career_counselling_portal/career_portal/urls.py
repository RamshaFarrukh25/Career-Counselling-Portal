from django.urls import path
from . import views

urlpatterns = [
    path('sendOTP', views.sendOTP, name='sendOTP'),
    path('registerUser', views.registerUser, name='registerUser'),
    path('checkEmail',views.checkEmail,name='checkEmail'),
    path('loginUser',views.loginUser,name='loginUser'),
    path('getTopCounsellors',views.getTopCounsellors,name='getTopCounsellors'),
    path('saveReviews',views.saveReviews,name='saveReviews')
]