
import json
from django.http import HttpResponse
from django.shortcuts import render
from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt
from django.core.mail import send_mail
import random
from .models import ACU
from django.core.exceptions import ObjectDoesNotExist


def generate_otp():
    return str(random.randrange(1000, 10000))


@csrf_exempt
def sendOTP(request):
    print("hello")
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

@csrf_exempt
def registerUser(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body.decode('utf-8'))
            signup_data = data.get('signupData', {})
            name = signup_data.get('name')
            email = signup_data.get('email')
            password = signup_data.get('password')
            confirmPassword = signup_data.get('confirmPassword')
            user = ACU(name=name,email=email,password=password,confirmPassword=confirmPassword)
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
    
    