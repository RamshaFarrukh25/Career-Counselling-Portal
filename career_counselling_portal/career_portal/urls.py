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
    path('sendVerificationEmail', views.sendVerificationEmail, name='sendVerificationEmail'),
    # Login
    path('loginUser',views.loginUser,name='loginUser'),
    # Ask Counsellor
    path('getTopCounsellors',views.getTopCounsellors,name='getTopCounsellors'),
    # Reviews
    path('saveReviews',views.saveReviews,name='saveReviews'),
    # CareerGPT History
    path('storeCareerGPTHistory', views.storeCareerGPTHistory, name='storeCareerGPTHistory'),
    # Blog Cards
    path('fetchBlogsData', views.fetchBlogsData, name='fetchBlogsData'),
    # Blog Details
    path('blogDetails',views.blogDetails,name='blogDetails'),
]