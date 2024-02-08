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
    # Reviews/Ratings
    path('saveReviews',views.saveReviews,name='saveReviews'),
    path('getReviews', views.getReviews, name = 'getReviwes'),
    path('getCounsellorsByUID', views.getCounsellorsByUID,  name="getCounsellorsByUID"),
    path('saveRatings', views.saveRatings, name="saveRatings"),
    # CareerGPT History
    #path('storeCareerGPTHistory', views.storeCareerGPTHistory, name='storeCareerGPTHistory'),
    #path('loadCareerGPTHistory', views.loadCareerGPTHistory, name='loadCareerGPTHistory'),
    # Blog Cards
    path('fetchBlogsData', views.fetchBlogsData, name='fetchBlogsData'),
    # Blog Details
    path('blogDetails',views.blogDetails,name='blogDetails'),

    # Counsellor Dashboard 
    path('getCounsellorData/<int:uid>', views.getCounsellorData, name='getCounsellorData'),
    path('getCounsellorCardsData/<int:uid>', views.getCounsellorCardsData, name='getCounsellorCardsData'),
    path('getCounsellorProfileData/<int:uid>', views.getCounsellorProfileData, name='getCounsellorProfileData'),
    path('getCounsellorSettings/<int:uid>', views.getCounsellorSettings, name='getCounsellorSettings'),
    path('updateCounsellorSettings', views.updateCounsellorSettings, name='updateCounsellorSettings'),
    path('getCounsellorBlogs/<int:uid>', views.getCounsellorBlogs, name='getCounsellorBlogs'),
    path('addBlog', views.addBlog, name='addBlog'),
    path('editBlog', views.editBlog, name='editBlog'),
    path('deleteBlog/<int:bid>', views.deleteBlog, name='deleteBlog'),

    # Admin Profile
    path('getAdminProfile', views.getAdminProfile, name='getAdminProfile'),
    path('updateAdminProfile', views.updateAdminProfile, name='updateAdminProfile'),
    # Users Report
    path('getUsers', views.getUsers,  name='getUsers'),
    path('deleteUser', views.deleteUser, name='deleteUser'),
]