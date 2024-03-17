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
    # GET SESSION DATA
    path('getSessionData', views.getSessionData, name='getSessionData'),
    path('deleteSessionData', views.deleteSessionData, name='deleteSessionData'),
    # Ask Counsellor
    path('getTopCounsellors',views.getTopCounsellors,name='getTopCounsellors'),
    # Reviews/Ratings
    path('saveReviews',views.saveReviews,name='saveReviews'),
    path('getReviews', views.getReviews, name = 'getReviwes'),
    path('getCounsellorsByUID', views.getCounsellorsByUID,  name="getCounsellorsByUID"),
    path('saveRatings', views.saveRatings, name="saveRatings"),
    # Blog Cards
    path('fetchBlogsData', views.fetchBlogsData, name='fetchBlogsData'),
    # Blog Details
    path('blogDetails',views.blogDetails,name='blogDetails'),
    #Create SendBirdChannel
    path('createSendBirdChannel', views.createSendBirdChannel, name='createSendBirdChannel'),
    # CareerGPT History
    path('saveHistory', views.saveHistory, name='saveHistory'),
    path('getHistory', views.getHistory, name='getHistory'),

    # Counsellor Dashboard 
    path('getCounsellorData', views.getCounsellorData, name='getCounsellorData'),
    path('getCounsellorCardsData', views.getCounsellorCardsData, name='getCounsellorCardsData'),
    path('getCounsellorProfileData', views.getCounsellorProfileData, name='getCounsellorProfileData'),
    path('getCounsellorSettings', views.getCounsellorSettings, name='getCounsellorSettings'),
    path('updateCounsellorSettings', views.updateCounsellorSettings, name='updateCounsellorSettings'),
    path('getCounsellorBlogs', views.getCounsellorBlogs, name='getCounsellorBlogs'),
    path('addBlog', views.addBlog, name='addBlog'),
    path('editBlog', views.editBlog, name='editBlog'),
    path('deleteBlog/<int:bid>', views.deleteBlog, name='deleteBlog'),
    path('sendBirdWebHook', views.sendBirdWebHook, name='sendBirdWebHook'),


    # Admin Dashboard 

    # Total User Count
    path('getUsersCount', views.getUsersCount, name='getUsersCount'),
    # Total Blogs Count
    path('getBlogsCount', views.getBlogsCount, name='getBlogsCount'),
    # Total Counsellors Count
    path('getCounsellorsCount', views.getCounsellorsCount, name='getCounsellorsCount'),
    # Total Reviews Count
    path('getReviewsCount', views.getReviewsCount, name='getReviewsCount'),
    # Admin Profile
    path('getAdminProfile', views.getAdminProfile, name='getAdminProfile'),
    path('updateAdminProfile', views.updateAdminProfile, name='updateAdminProfile'),
    # Users Report
    path('getUsers', views.getUsers,  name='getUsers'),
    path('deleteUser', views.deleteUser, name='deleteUser'),
    # Approve Reviews
    path('getUnapprovedReviews', views.getUnapprovedReviews, name='getUnapprovedReviews'),
    path('deleteReview', views.deleteReview,  name='deleteReview'),
    path('approveReview', views.approveReview, name='approveReview'),
    # Approve Blogs
    path('getUnapprovedBlogs', views.getUnapprovedBlogs,  name='getUnapprovedBlogs'),
    path('rejectBlog', views.rejectBlog, name='rejectBlog'),
    path('approveBlog', views.approveBlog, name='approveBlog'),
    
    path('getCounsellorsData', views.getCounsellorsData, name='getCounsellorsData'),
    path('getApprovedCounsellors', views.getApprovedCounsellors, name='getApprovedCounsellors'),
    path('deleteCounsellor/<str:userEmail>/<str:rejectionReason>', views.deleteCounsellor, name='deleteCounsellor'),
    path('approveCounsellor/<str:userEmail>/<str:greetingMessage>', views.approveCounsellor, name='approveCounsellor'),

]