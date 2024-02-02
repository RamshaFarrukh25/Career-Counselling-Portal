import json
import os
from django.http import HttpResponse
from django.http import JsonResponse
from django.shortcuts import render
from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt
from django.core.mail import send_mail
import random
from .models import ACU, Counsellor, Qualification, WorkingExperience
from django.core.exceptions import ObjectDoesNotExist
from django.conf import settings

from .counsellor import makeDirectoy, saveImage

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
            
            print(email,otp)
            send_mail(subject, message, from_email='BotGuidedPathways@gmail.com', recipient_list=[email])
            return HttpResponse(json.dumps({'status': 'success', 'message': 'OTP sent successfully','otp':otp}))
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
            password = signup_data.get('password')
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
                return HttpResponse(json.dumps({'status': 'error', 'message': 'Email already exists','isExist':True}))
            except ObjectDoesNotExist:
                return HttpResponse(json.dumps({'status': 'successs', 'message': 'Email does not exist','isExist':False}))
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
            password = offerCounsellorFormData.get('password')

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
    
    