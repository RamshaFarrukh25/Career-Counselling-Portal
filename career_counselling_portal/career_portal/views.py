import os
from datetime import datetime
from django.shortcuts import render
from django.core.exceptions import ObjectDoesNotExist
from django.conf import settings
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.mail import send_mail
import random,json,re
from django.contrib.auth.hashers import make_password, check_password
from .models import *
from django.db.models import Q, Avg
from rest_framework.decorators import api_view
from .serializers import *
import traceback
from .Utils.sendbird import createUser, createChannel, getUser  

from .Utils.counsellor import makeDirectoy, saveImage, deleteImage, removeDirectory

# Send OTP
def generate_otp():
    return str(random.randrange(1000, 10000))


@csrf_exempt
def sendOTP(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body.decode('utf-8'))
            email = data.get('email')
            otp = generate_otp()
            subject = 'Verification Code'
            message = f'Your verification code is: {otp}'
            send_mail(subject, message, from_email='BotGuidedPathways@gmail.com', recipient_list=[email])
            return HttpResponse(json.dumps({'otp':otp}))
        except Exception as e:
            return HttpResponse(json.dumps({'status': 'error', 'message': str(e)}), status=500, content_type='application/json')
    else:
        return HttpResponse(json.dumps({'status': 'error', 'message': 'Method not allowed'}), status=405, content_type='application/json')


# Register User
@csrf_exempt
def registerUser(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body.decode('utf-8'))
            signup_data = data.get('signupData', {})
            name = signup_data.get('name')
            email = signup_data.get('email')
            password = make_password(signup_data.get('password'))
           
            user = ACU(name=name,email=email,password=password)
            user.save()
            return HttpResponse(json.dumps({'status': 'success'}))
        except Exception as e:
            return HttpResponse(json.dumps({'status': 'error', 'message': str(e)}), status=500)
    
    else:
        return HttpResponse(json.dumps({'status': 'error', 'message': 'Method not allowed'}), status=405)
    
    
@csrf_exempt
def checkEmail(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body.decode('utf-8'))
            email = data.get('email')
            try:
                existing_acu_entry = ACU.objects.get(email=email)
                return HttpResponse(json.dumps({'isExist':True}))
            except ACU.DoesNotExist:
                return HttpResponse(json.dumps({'isExist':False}))
        except Exception as e:
            return HttpResponse(json.dumps({'status': 'error', 'message': str(e)}), status=500, content_type='application/json')   
    else:
        return HttpResponse(json.dumps({'status': 'error', 'message': 'Method not allowed'}), status=405, content_type='application/json')
    


# Offer Counselling
@csrf_exempt
def checkCounsellorEmail(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body.decode('utf-8'))
            email = data.get('email')
            try:
                existingCounsellor = ACU.objects.get(email=email)
                role = existingCounsellor.role
                print("Role", role)
                if(role == 'U'):
                    return JsonResponse({'role': 'U','isExist': True})
                elif(role == 'B'):
                    return JsonResponse({'role': 'B','isExist': True})
                else:
                    return JsonResponse({'role': 'C','isExist': True})
            except ObjectDoesNotExist:
                return JsonResponse({'message': 'Email does not exist','isExist': False})
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=500)
    else:
        return JsonResponse({'status': 'error', 'message': 'Method not allowed'}, status=405)


# Register Counsellor    
@csrf_exempt
def registerCounsellor(request):
    if request.method == 'POST':
        try:
            offerCounsellorFormJson = request.POST.get('offerCounsellorForm')
            offerCounsellorFormData = json.loads(offerCounsellorFormJson)
            name = offerCounsellorFormData.get('name')
            email = offerCounsellorFormData.get('email')
            password = make_password(offerCounsellorFormData.get('password'))

            # Store Data in ACU Table
            counsellor = None
            try:
                counsellor = ACU.objects.get(email=email)
                counsellor.name=name
                counsellor.password=password
                counsellor.role='B'
                counsellor.save()
            except ObjectDoesNotExist:
                counsellor = ACU(name=name, email=email, password=password, role='C')
                counsellor.save()

            path = makeDirectoy((os.path.join(settings.BASE_DIR, 'Counsellors')), email)
            #print("Path", path)  
                 
            phoneNo = offerCounsellorFormData.get('phoneNo')
            gender = offerCounsellorFormData.get('gender')
            cnic = offerCounsellorFormData.get('cnic')
            profilePic = request.FILES.get('profilePic', None)
            cnicFrontImg = request.FILES.get('cnicFrontImg', None)
            cnicBackImg = request.FILES.get('cnicBackImg', None)
            # Storing images in the directory
            profilePicURL = saveImage(path, "profilePic", profilePic.name, profilePic)
            cnicFrontImgURL = saveImage(path, "cnicFrontImage", cnicFrontImg.name, cnicFrontImg)
            cnicBackImgURL = saveImage(path, "cnicBackImage", cnicBackImg.name, cnicBackImg)
            # Storing data in Counsellor's table
            counsellorData = None
            try:
                counsellorData=Counsellor(counsellor_id=counsellor, phone_no=phoneNo, gender=gender, cnic=cnic, profile_pic=profilePicURL, cnic_front_img=cnicFrontImgURL, cninc_back_img=cnicBackImgURL)
                counsellorData.save()
            except Exception as e:
                return JsonResponse({'status': 'error', 'message': str(e)}, status=500)
            
            qualification = offerCounsellorFormData.get('qualification')
            fieldOfStudy = offerCounsellorFormData.get('fieldOfStudy')
            transcript = request.FILES.get('transcript', None)
            # Storing transcript image in the directory
            transcriptURL = saveImage(path, "transcript", transcript.name, transcript)
            print("URLTranscript", os.path.join(settings.BASE_DIR, 'Counsellors', transcriptURL.lstrip('/')))
            try:
                qualificationData = Qualification(counsellor_id=counsellorData, qualification=qualification, field_of_study=fieldOfStudy, transcript_img=transcriptURL)
                qualificationData.save()
            except Exception as e:   
                return JsonResponse({'status': 'error', 'message': str(e)}, status=500) 

            # Working Experience Directory
            wePath = makeDirectoy(path, "WorkingExperience")
            # WorkingExperience Data
            workingExperienceData = offerCounsellorFormData.get('workingExperience')
            #print(workingExperienceData[0]['institute'])

            # Certificates
            certificates = []
            index = 0
            while f'certificates[{index}]' in request.FILES:
                certificates.append(request.FILES.get(f'certificates[{index}]'))
                index += 1
            #print("Certificates", certificates)
            # Storing Certificates in the Working Experience Directory
            certificatesURL = []
            index = 0
            while index < len(certificates):
                certificatesURL.append(saveImage(wePath, f'certificates[{index + 1}]', certificates[index].name, certificates[index]))
                index += 1
            
            # Storing Working Experinces
            try:
                index = 0
                while index < len(workingExperienceData):
                    wEData = WorkingExperience(
                        counsellor_id=counsellorData, 
                        institute_name=workingExperienceData[index]['institute'],
                        starting_year=workingExperienceData[index]['startingYear'],
                        ending_year=workingExperienceData[index]['endingYear'],
                        certificates_image=certificatesURL[index])
                    wEData.save()
                    index += 1
            except Exception as e:   
                return JsonResponse({'status': 'error', 'message': str(e)}, status=500) 

            # Making Directory for storing blogs
            blogsDirectory = makeDirectoy(path, "Blogs")  

            return JsonResponse({'status': 'success', 'message': 'Data Saved Successfully'})
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=500)
    else:
        return JsonResponse({'status': 'error', 'message': 'Method not allowed'}, status=405)


# Send Verification Email to Counsellor
@csrf_exempt
def sendVerificationEmail(request):
    if request.method == 'POST':
        try:
            data = data = json.loads(request.body.decode('utf-8'))
            email = data.get('email')
            name = data.get('name')
            subject="Record Verification Pending"
            message= f"Dear {name}, We Hope this message finds you well. Your registration on BotGuidedPathways is currently being processed. Our team is diligently verifying the provided information, and we anticipate completing the verification soon. Once the verification process is complete, you will receive a confirmation email along with further details about accessing your account. Thank you for choosing BotGuidedPathways."
            send_mail(subject, message, from_email='BotGuidedPathways@gmail.com', recipient_list=[email])
            return JsonResponse({'status': 'success', 'message': 'Email Sent Successfully'})
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=500)
    else:
        return JsonResponse({'status': 'error', 'message': 'Method not allowed'}, status=405)

# Offer Counselling End
    

# Login    
@csrf_exempt
@csrf_exempt
def loginUser(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        email = data.get('email')
        password = data.get('password')

        try:
            user = ACU.objects.get(email=email)
            if user is not None and check_password(password, user.password):
                request.session['email'] = user.email
                request.session['user_id'] = user.id
                print("id", request.session['user_id'])
                return JsonResponse({'isLogin':True,'role':user.role,
                                     'user_id':request.session['user_id'],
                                     'user_name':user.name,'user_email':user.email})
            else:
                return JsonResponse({'isLogin':False})
        except ACU.DoesNotExist:
            return JsonResponse({'isLogin':False})
    else:
        return HttpResponse(json.dumps({'status': 'error', 'message': 'Method not allowed'}), status=405, content_type='application/json')
        
# Login End

# Ask Counsellor Page           
def get_truncated_review(description,max_lines=3):
        pattern = r'\.|\n'
        lines = re.split(pattern, description)
        truncated_lines = lines[:max_lines]
        truncated_description = '.'.join(truncated_lines)
        if truncated_description and truncated_description[-1] != '.':
            truncated_description += '.'

        return truncated_description
    
@api_view(['GET'])
def getTopCounsellors(request):
    if request.method == 'GET':
        top_counsellors = (
            Counsellor.objects
            .filter(Q(counsellor_id__role='C') | Q(counsellor_id__role='B'))
            .order_by('-ratings__rating')[:10]
        )
        serializer = TopCounsellorSerializer(top_counsellors, many=True)
        for data in serializer.data:
            if data['review_description']:
                data['review_description'] = get_truncated_review(data['review_description'])
        return HttpResponse(json.dumps({'top_counsellors': serializer.data}))
    else:
        return HttpResponse({'status': 'error', 'message': 'Method not allowed'}, status=405)

# Ask Counsellor Page End
    

# Reviews / Ratings
@csrf_exempt
def saveReviews(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body.decode('utf-8'))
            if data.get('user_id') is not None:
                print(data)
                reviews_data = data.get('reviewsForm', {})
                reviewer_name = reviews_data.get('name')
                user_id = data.get('user_id')
                reviewer_email = reviews_data.get('email')
                reviewer_description = reviews_data.get('comments')
                user = ACU.objects.get(id = user_id)
                print(user)
                review = Reviews(user_id = user, reviewer_name = reviewer_name, reviewer_email = reviewer_email, reviewer_description = reviewer_description)
                review.save()
                return HttpResponse(json.dumps({'status': 'success'}))
            else:
                return HttpResponse(json.dumps({'status': 'error'}),status=500)
        except Exception as e:
            print("Exception:", e)
            traceback.print_exc()
            return HttpResponse(json.dumps({'status': 'error', 'message': str(e)}), status=500)
    
    else:
        return HttpResponse(json.dumps({'status': 'error', 'message': 'Method not allowed'}), status=405)


# Show Latest Reviews
def getReviews(request):
    if request.method == 'GET':
        try:
            reviewsData = Reviews.objects.all()
            serializer = ReviewsSerializer(reviewsData, many = True)
            for data in serializer.data:
                if data["reviewer_description"]:
                    data["reviewer_description"] =  get_truncated_review(data["reviewer_description"], 2)
            return HttpResponse(json.dumps({'reviewsData':serializer.data}))
        except Exception as e:
            return HttpResponse(json.dumps({'status': 'error'}))
    else:
        return HttpResponse(json.dumps({'status': 'error', 'message': 'Method not allowed'}),status=405)
    

@csrf_exempt
def getCounsellorsByUID(request):
    data = json.loads(request.body.decode('utf-8'))
    if request.method == 'POST' and data.get('uid'):
        uid = data.get('uid')
        counsellorList = UserChatWithCounsellors.objects.filter(user_id = uid)
        serializer = UserChatWithCounsellorsSerializer(counsellorList, many = True)
        return HttpResponse(json.dumps({"counsellorsList" : serializer.data}))
    else:
        return HttpResponse(json.dumps({'status': 'error', 'message': 'Method not allowed'}))


@csrf_exempt
def saveRatings(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body.decode('utf-8'))
            if data.get('user_id') is not None:
                ratings_data = data.get('reviewsForm', {})
                counsellor_name = ratings_data.get('selectedOption')
                user_id = data.get('user_id')
                review_description = ratings_data.get('counsellorReview')
                rate = ratings_data.get('rating')
                user = ACU.objects.get(id = user_id)
                cu = ACU.objects.get(name =  counsellor_name)
                counsellor = Counsellor.objects.get(counsellor_id =  cu.id)
                rating = Ratings(counsellor_id = counsellor, rating = rate, review_description = review_description, user_id = user)
                rating.save()
                return HttpResponse(json.dumps({'status': 'success'}))
            else:
                return HttpResponse(json.dumps({'status': 'error'}),status=500)
        except Exception as e:
            traceback.print_exc()
            return HttpResponse(json.dumps({'status': 'error', 'message': str(e)}), status=500)

# Reviews/Ratings End
    
# Blogs Data
def fetchBlogsData(request):
    if request.method == 'GET':
        try:
            blogsData = Blogs.objects.all()
            serializer = BlogsSerializer(blogsData, many=True)
            for data in serializer.data:
                if data["description"]:
                    data["description"] =  get_truncated_review(data["description"], 1) + "..."
            return HttpResponse(json.dumps({'blogsData':serializer.data}))
        except Exception as e:
            return HttpResponse(json.dumps({'status': 'error'}))
    else:
        return HttpResponse(json.dumps({'status': 'error', 'message': 'Method not allowed'}),status=405)
    

@csrf_exempt
def blogDetails(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        id = data.get('id')
        blogDetails = Blogs.objects.get(id= id)
        serializer= BlogsSerializer(blogDetails)
        return HttpResponse(json.dumps({'blogDetails':serializer.data}))   
    else:
        return HttpResponse(json.dumps({'status': 'error', 'message': 'Method not allowed'}), status=405, content_type='application/json')

# Blogs Data End    

# Admin Profile
def getAdminProfile(request):
    if request.method == 'GET':
        try:
            profileData = ACU.objects.get(role = 'A')
            serializer = ACUSerializer(profileData)
            return HttpResponse(json.dumps({'profileData' : serializer.data}))
        except Exception as e:
            return HttpResponse(json.dumps({'status': 'error'}))
    else:
        return HttpResponse(json.dumps({'status': 'error', 'message': 'Method not allowed'}),status=405)

@csrf_exempt
def updateAdminProfile(request):
    if request.method == 'PUT':
        data = json.loads(request.body.decode('utf-8'))
        profile_data = data.get('profileForm', {})
        name = profile_data.get('name')
        password = profile_data.get('password')
        admin = ACU.objects.get(role = 'A')
        admin.name = name
        admin.password = make_password(password)
        admin.save()
        return HttpResponse(json.dumps({'status' : 'profile updated successfully'}))
    else:
        return HttpResponse(json.dumps({'status': 'error', 'message': 'Method not allowed'}), status=405, content_type='application/json')
# Admin Profile End

# User Report
def getUsers(request):
    if request.method == 'GET':
        try:
            users = ACU.objects.filter(Q(role = 'U') | Q(role = 'B'))
            serializer = ACUSerializer(users, many=True)
            return HttpResponse(json.dumps({'usersList' : serializer.data}))
        except Exception as e:
            return HttpResponse(json.dumps({'status': 'error'}))
    else:
        return HttpResponse(json.dumps({'status': 'error', 'message': 'Method not allowed'}),status=405)
    

@csrf_exempt
def deleteUser(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body.decode('utf-8'))
            user_id = data.get('selectedRow')
            user = ACU.objects.get(id=user_id)
            # Deleting Counsellor directory
            if user.role == 'B':
                removeDirectory((os.path.join(settings.BASE_DIR, 'Counsellors')), user.email)
            user.delete()
            return HttpResponse(json.dumps({'status': 'user deleted successfully'}))
        except ACU.DoesNotExist:
            return HttpResponse(json.dumps({'status': 'error', 'message': 'User not found'}), status=404, content_type='application/json')
    else:
        return HttpResponse(json.dumps({'status': 'error', 'message': 'Method not allowed'}), status=405, content_type='application/json')
# User Report End
    
# Approve Reviews
def getUnapprovedReviews(request):
    if request.method == 'GET':
        try:
            reviewsData = Reviews.objects.filter(is_approved = False)
            serializer = ReviewsSerializer(reviewsData, many = True)
            return HttpResponse(json.dumps({'unapprovedReviews' : serializer.data}))
        except Exception as e:
            return HttpResponse(json.dumps({'status': 'error'}))
    else:
        return HttpResponse(json.dumps({'status': 'error', 'message': 'Method not allowed'}),status=405)


@csrf_exempt
def deleteReview(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body.decode('utf-8'))
            review_id = data.get('selectedRow')
            review = Reviews.objects.get(id= review_id)
            review.delete()
            return HttpResponse(json.dumps({'status': 'user deleted successfully'}))
        except ACU.DoesNotExist:
            return HttpResponse(json.dumps({'status': 'error', 'message': 'User not found'}), status=404, content_type='application/json')
    else:
        return HttpResponse(json.dumps({'status': 'error', 'message': 'Method not allowed'}), status=405, content_type='application/json')
    

@csrf_exempt
def approveReview(request):
    if request.method == 'PUT':
        data = json.loads(request.body.decode('utf-8'))
        reviewer_id = data.get('selectedRow')
        print(reviewer_id)
        review = Reviews.objects.get(id= reviewer_id)
        review.is_approved = True
        review.save()
        return HttpResponse(json.dumps({'status' : 'review approved successfully'}))
    else:
        return HttpResponse(json.dumps({'status': 'error', 'message': 'Method not allowed'}), status=405, content_type='application/json')
# Approve Reviews End

# CareerGPT History 
# @csrf_exempt
# def storeCareerGPTHistory(request):
#     if request.method == 'POST':
#         try:
#             data = json.loads(request.body.decode('utf-8'))
#             user_id = data.get('id')
#             messages = data.get('messages')
#             print("Messages in store", messages)
#             user = ACU.objects.get(id=user_id)
#             history = CareerGPTHistory(user_id=user, history=messages)
#             history.save()
#             return JsonResponse({'status': 'success'})
#         except Exception as e:
#             return JsonResponse({'status': 'error', 'message': str(e)}, status=500)
#     else:
#         return JsonResponse({'status': 'error', 'message': 'Method not allowed'}, status=405)
    

# @csrf_exempt
# def loadCareerGPTHistory(request):
#     if request.method == 'POST':
#         try:
#             data = json.loads(request.body.decode('utf-8'))
#             id = data.get('id')
#             history = CareerGPTHistory.objects.get(user_id=id)
#             print("History in Load", history.history)
#             return JsonResponse({'history': history.history})
#         except Exception as e:
#             return JsonResponse({'status': 'error', 'message': str(e)}, status=500)
#     else:
#         return JsonResponse({'status': 'error', 'message': 'Method not allowed'}, status=405)
 
# CareerGPT History End   

# Counsellor Dashboard
@api_view(['GET'])
def getCounsellorData(request, uid):
    if request.method == 'GET':
        acuInstance = ACU.objects.get(id=uid)
        counsellor = Counsellor.objects.get(counsellor_id=acuInstance)
        serializedData = CounsellorDataSerializer(counsellor)
        return JsonResponse({'counsellorData': serializedData.data})
    else:
        return JsonResponse({'status': 'error', 'message': 'Method not allowed'}, status=405)
    

@api_view(['GET'])
def getCounsellorCardsData(request, uid):
    if request.method == 'GET':
        acuInstance = ACU.objects.get(id=uid)
        counsellor = Counsellor.objects.get(counsellor_id=acuInstance)
        approvedBlogs = Blogs.objects.filter(Q(counsellor_id=counsellor) & Q(is_approved=True)).count()
        pendingApprovalBlogs = Blogs.objects.filter(Q(counsellor_id=counsellor) & Q(is_approved=False)).count()
        averageRating = Ratings.objects.filter(Q(counsellor_id=counsellor)).aggregate(Avg('rating'))['rating__avg']
        averageRating = averageRating if averageRating is not None else 0.0       
        return JsonResponse({'counsellorCards': {'approvedBlogs': approvedBlogs, 'pendingApprovalBlogs' : pendingApprovalBlogs, 'averageRating': averageRating}})
    else:
        return JsonResponse({'status': 'error', 'message': 'Method not allowed'}, status=405)
    

# Profile
@api_view(['GET'])
def getCounsellorProfileData(request, uid):
    if request.method == 'GET':
        try:
            counsellor = Counsellor.objects.select_related('counsellor_id').prefetch_related('working_experiences', 'qualification').get(counsellor_id=uid)
            serializer = CounsellorSerializer(counsellor)
            return JsonResponse({'status': 'success','counsellor_profile_data':serializer.data})
        
        except ACU.DoesNotExist:
            return JsonResponse({'status': 'error', 'message': 'ACU with given user_id does not exist'}, status=404)
    else:
        return JsonResponse({'status': 'error', 'message': 'Method not allowed'}, status=405)
    


@api_view(['GET'])
def getCounsellorSettings(request, uid):
    if request.method == 'GET':
        counsellor = Counsellor.objects.select_related('counsellor_id').get(counsellor_id=uid)
        serializer = CounsellorDataSerializer(counsellor)
        return JsonResponse({'counsellorData': serializer.data})
    else:
        return JsonResponse({'status': 'error', 'message': 'Method not allowed'}, status=405)   
    

@csrf_exempt
def updateCounsellorSettings(request):
    if request.method == 'POST':
        uid = request.POST.get('uId')
        email = request.POST.get('email')
        phoneNo = request.POST.get('phoneNo', None)
        password = request.POST.get('password')
        counsellor = Counsellor.objects.select_related('counsellor_id').get(counsellor_id=uid)
        counsellor.phone_no = phoneNo
        if password != counsellor.counsellor_id.password:
           counsellor.counsellor_id.password = make_password(password)
           
        profilePic = request.FILES.get('profilePic', None)
        if profilePic:
            originalImage = counsellor.profile_pic
            path = os.path.join(settings.BASE_DIR, 'Counsellors', email)
            deleteImage(path, originalImage[1:])
            profilePicURL = saveImage(path, "profilePic", profilePic.name, profilePic)
            counsellor.profile_pic = profilePicURL

        counsellor.save()
        counsellor.counsellor_id.save()
        
        return JsonResponse({'status': 'success'})
    else:
        return JsonResponse({'status': 'error', 'message': 'Method not allowed'}, status=405)   


# Show Blogs
@api_view(['GET'])
def getCounsellorBlogs(request, uid):
    if request.method == 'GET':
        try:
            acuInstance = ACU.objects.get(id=uid)
            counsellor = Counsellor.objects.get(counsellor_id=acuInstance)
            blogs = Blogs.objects.filter(Q(counsellor_id=counsellor) & Q(is_approved=True))
            serializer = BlogsSerializer(blogs, many=True)
            return JsonResponse({'blogs':serializer.data})
        except Blogs.DoesNotExist:
            return JsonResponse({'error': 'No blogs found for the given ID'}, status=404)
    else:
        return JsonResponse({'status': 'error', 'message': 'Method not allowed'}, status=405)


@csrf_exempt
def addBlog(request):
    if request.method == 'POST':
        try:
            addBlogDataJson = request.POST.get('addBlogData')
            addBlogDataFormJson = json.loads(addBlogDataJson)
            cover_image = request.FILES.get('cover_image', None)
            user_id = request.POST.get('user_id')
            email = request.POST.get('email')
            name = request.POST.get('name')
            
            title = addBlogDataFormJson.get('title')
            description = addBlogDataFormJson.get('description')
            area_of_field= addBlogDataFormJson.get('area_of_field')
          
            acuInstance = ACU.objects.get(id=user_id)
            counsellor = Counsellor.objects.filter(counsellor_id=acuInstance).first()
            if not counsellor:
                return JsonResponse({'status': 'error', 'message': 'Counsellor with the provided ID does not exist'}, status=404)
            path = os.path.join(settings.BASE_DIR, 'Counsellors', email, 'Blogs')
            coverImageURL = saveImage(path, "cover_image", cover_image.name, cover_image)
            
            counsellor = Counsellor.objects.get(counsellor_id=acuInstance)
        
            blogs = Blogs(counsellor_id=counsellor,
                                         title=title,author_name=name,
                                         area_of_field=area_of_field,
                                         description=description,
                                         cover_image=coverImageURL)
            blogs.save()
            return JsonResponse({'status': 'success'})
        except Exception as e:
            print(e)
            return JsonResponse({'status': 'error', 'message': str(e)}, status=500)
    else:
        return JsonResponse({'status': 'error', 'message': 'Method not allowed'}, status=405)
    
    
# CareerGPT History End    
    

#SendBird Api for Create Channel
@csrf_exempt
def createSendBirdChannel(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        counsellorId = data.get('counsellorId')
        counsellorNickName = data.get('counsellorNickName')
        counsellorProfileURL = data.get('counsellorProfileURL')
        user_id = data.get("user_id")
        # Check if the user is logged in (user_id exists in the session)
        if user_id is not None:
            try:
                # Fetch user details from the database using the user_id
                user = ACU.objects.get(id=user_id)
                User_object = user_id
                Counsellor_object = counsellorId
                # Check if the entry already exists in UserChatWithCounsellors
                existing_entry = UserChatWithCounsellors.objects.filter(
                    user_id=user_id,
                    counsellor_id=counsellorId
                ).exists()

                if not existing_entry:
                    # If the entry doesn't exist, create one
                    UserChatWithCounsellors.objects.create(
                        user_id=user,
                        counsellor_id=Counsellor_object
                    )

                if (not getUser(User_object)):
                    user_user_id = createUser(user_id, user.name, "")
                    print(user_user_id)
                    User_object = json.loads(user_user_id.content).get('user_id')

                if (not getUser(Counsellor_object)):
                    counsellor_user_id = createUser(counsellorId, counsellorNickName, counsellorProfileURL)
                    print(counsellor_user_id)
                    Counsellor_object = json.loads(counsellor_user_id.content).get('user_id')

                # Create a SendBird channel
                print(User_object, Counsellor_object, user.name, counsellorNickName)
                channel = createChannel(User_object, Counsellor_object, user.name, counsellorNickName)
                channel_url = json.loads(channel.content).get('channel_url')
                print("Channel Url in views.py : ", channel_url)

                if not channel_url:
                    raise Exception("Sorry, channel is not created on SendBird!!")

                return HttpResponse(channel_url, status=200)

            except ACU.DoesNotExist:
                return JsonResponse({'message': 'User not found in the database'}, status=404)
            except Exception as e:
                return JsonResponse({'message': str(e)}, status=500)
        else:
            return JsonResponse({'message': 'User not logged in'}, status=401)
    else:
        return HttpResponse(json.dumps({'status': 'error', 'message': 'Method not allowed'}), status=405, content_type='application/json')
    
    #End of SendBird Api

##########API FOR ADMIN DASHBOARD (COUNT API)##########

#Api for getting total of user count
def getUsersCount(request):
    try:
        users_count = ACU.objects.count()
        return JsonResponse({'users_count': users_count})
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
    
#Api for getting total of Blogs count
def getBlogsCount(request):
    try:
        blog_count =Blogs.objects.count()
        return JsonResponse({'blog_count': blog_count})
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
    

#Api for getting total of Counsellors count
def getCounsellorsCount(request):
    try:
        counsellor_count = Counsellor.objects.filter(is_approved=True).count()
        return JsonResponse({'counsellor_count': counsellor_count})
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

#Api for getting total of Reviews count
def getReviewsCount(request):
    try:
        review_count = Reviews.objects.filter(is_approved=True).count()
        return JsonResponse({'review_count': review_count})
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
    
##########---end of dashboard api---##########

@csrf_exempt
def editBlog(request):
    if request.method == 'POST':
        try:
            addBlogDataJson = request.POST.get('addBlogData')
            addBlogDataFormJson = json.loads(addBlogDataJson)
            cover_image = request.FILES.get('cover_image', None)
            user_id = request.POST.get('user_id')
            email = request.POST.get('email')
            name = request.POST.get('name')
            
            title = addBlogDataFormJson.get('title')
            description = addBlogDataFormJson.get('description')
            area_of_field= addBlogDataFormJson.get('area_of_field')
            blogId = request.POST.get('blogId')

            # Updating Blog Data           
            blogs = Blogs.objects.get(id=blogId)
            blogs.title = title
            blogs.area_of_field = area_of_field
            blogs.description = description
            # Remove Existing Cover Image
            path = os.path.join(settings.BASE_DIR, 'Counsellors', email, 'Blogs')
            deleteImage(path, blogs.cover_image[1:])
            # Save updated image
            coverImageURL = saveImage(path, "cover_image", cover_image.name, cover_image)
            blogs.cover_image = coverImageURL
            
            blogs.is_approved = False
            blogs.save()
            return JsonResponse({'status': 'success'})
        except Exception as e:
            print(e)
            return JsonResponse({'status': 'error', 'message': str(e)}, status=500)
    else:
        return JsonResponse({'status': 'error', 'message': 'Method not allowed'}, status=405)


@api_view(['DELETE'])
def deleteBlog(request, bid):
    if request.method == 'DELETE':
        try:
            blog = Blogs.objects.get(id=bid)
            originalImage = blog.cover_image
            path = os.path.join(settings.BASE_DIR, 'Counsellors', blog.counsellor_id.counsellor_id.email,'Blogs')
            deleteImage(path, originalImage[1:])
            blog.delete()
            return JsonResponse({"message": "Blog deleted successfully"}, status=200)
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=500)
    else:
        return JsonResponse({'status': 'error', 'message': 'Method not allowed'}, status=405)

# Counsellor Dashboard End 
