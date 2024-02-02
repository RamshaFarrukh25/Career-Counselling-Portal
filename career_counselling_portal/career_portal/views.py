
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.mail import send_mail
import random,json,re
from django.contrib.auth.hashers import check_password
from .models import ACU,Counsellor,Ratings,Reviews
from django.contrib.auth.hashers import make_password
from django.db.models import Q
from rest_framework.decorators import api_view
from .serializers import TopCounsellorSerializer
import traceback



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
            send_mail(subject, message, from_email='BotGuidedPathways@gmail.com', recipient_list=[email])
            return HttpResponse(json.dumps({'otp':otp}))
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