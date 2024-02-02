
import json
import re
from django.http import HttpResponse
from django.shortcuts import render
from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt
from django.core.mail import send_mail
import random
from .models import ACU, Blogs,Counsellor, Reviews
from django.core.exceptions import ObjectDoesNotExist
from .serializers import *


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

def get_truncated_review(description,max_lines=1):
        pattern = r'\.|\n'
        lines = re.split(pattern, description)
        truncated_lines = lines[:max_lines]
        truncated_description = '.'.join(truncated_lines)
        if truncated_description and truncated_description[-1] != '.':
            truncated_description += '.'

        return truncated_description
    
def fetchBlogsData(request):
    if request.method == 'GET':
        try:
            blogsData = Blogs.objects.all()
            serializer = BlogsSerializer(blogsData, many=True)
            for data in serializer.data:
                if data["description"]:
                    data["description"] =  get_truncated_review(data["description"]) + "..."
            return HttpResponse(json.dumps({'blogsData':serializer.data}))
        except Exception as e:
            return HttpResponse(json.dumps({'status': 'error'}))
    else:
        return HttpResponse(json.dumps({'status': 'error', 'message': 'Method not allowed'}, status=405))
    

@csrf_exempt
def blogDetails(request):
    if request.method == 'POST':
            data = json.loads(request.body.decode('utf-8'))
            id = data.get('id')
            print(id)
            blogDetails = Blogs.objects.get(id= id)
            serializer= BlogsSerializer(blogDetails)
            return HttpResponse(json.dumps({'blogDetails':serializer.data}))   
    else:
        return HttpResponse(json.dumps({'status': 'error', 'message': 'Method not allowed'}), status=405, content_type='application/json')
    

