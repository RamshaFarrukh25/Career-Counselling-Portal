from django.urls import path
from . import views

urlpatterns = [

    # Signup
    path('sendOTP', views.sendOTP, name='sendOTP'),
    path('registerUser', views.registerUser, name='registerUser'),
    path('checkEmail',views.checkEmail,name='checkEmail'),

    # Offer Counselling
    path('checkCounsellorEmail', views.checkCounsellorEmail, name='checkCounsellorEmail'),
    path('registerCounsellor', views.registerCounsellor, name='registerCounsellor'),
    path('sendVerificationEmail', views.sendVerificationEmail, name='sendVerificationEmail')
]