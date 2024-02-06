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
from .models import ACU, Counsellor, Ratings, Reviews, Qualification, WorkingExperience, Blogs, CareerGPTHistory, UserChatWithCounsellors
from django.db.models import Q
from rest_framework.decorators import api_view
from .serializers import BlogsSerializer, TopCounsellorSerializer, ReviewsSerializer, UserChatWithCounsellorsSerializer
import traceback


from .Utils.counsellor import makeDirectoy, saveImage

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
                return JsonResponse({'isLogin':True,'role':user.role,'user_id':request.session['user_id']})
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
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        uid = data.get('uid')
        counsellorList = UserChatWithCounsellors.objects.filter(user_id = uid)
        serializer = UserChatWithCounsellorsSerializer(counsellorList, many = True)
        return HttpResponse(json.dumps({"counsellorsList" : serializer.data}))
    else:
        return HttpResponse(json.dumps({'status': 'error', 'message': 'Method not allowed'}), status=405, content_type='application/json')


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