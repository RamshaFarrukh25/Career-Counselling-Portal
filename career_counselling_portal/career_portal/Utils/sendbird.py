import json
from django.conf import settings
from django.http import HttpResponse, JsonResponse
import requests

def createUser(id, nickname, profile_url):
    try:
        url = f"https://api-{settings.SEND_BIRD_APP_ID}.sendbird.com/v3/users"
        headers = {
            "Api-Token": settings.SEND_BIRD_API_TOKEN,
            "Content-Type": "application/json",
        }
        payload = {
            "user_id": id,
            "nickname": nickname,
            "profile_url": profile_url,
        }
        print(settings.SEND_BIRD_APP_ID,settings.SEND_BIRD_API_TOKEN)
        print("Payload in user create",payload)
        response = requests.post(url, headers=headers, json=payload)
        print("reseponse--- in create user", response.json())
        print(settings.SEND_BIRD_APP_ID, settings.SEND_BIRD_API_TOKEN)
        if response.status_code == 200:
            response_data = response.json()
            user_id = response_data.get('user_id')
            return HttpResponse(json.dumps({'user_id':user_id}))
        else:
            error_data = {
                "error": f"Sendbird API Error: {response.status_code}",
                "details": response.json(),
            }
            return JsonResponse(error_data, status=response.status_code)

    except Exception as e:
        print(f"Exception while creating Sendbird user: {e}")
        return JsonResponse({"error": f"Internal Server Error: {e}"}, status=500)

  
def createChannel (user_id, counsellor_id, user_name, counsellor_name):
  print(user_id, counsellor_id, user_name, counsellor_name)
  try:
    # print(settings.SEND_BIRD_APP_ID)
    # print(settings.SEND_BIRD_API_TOKEN)
    url = f"https://api-{settings.SEND_BIRD_APP_ID}.sendbird.com/v3/group_channels"
    headers = {
    "Api-Token": settings.SEND_BIRD_API_TOKEN,
    "Content-Type": "application/json",
      }
    payload = {
    "name": f"{user_name} with {counsellor_name}",
    "cover_url": "https://sendbird.com/main/img/cover/cover_08.jpg",
    "custom_type": "Chatting_Purpose",
    "is_distinct": True,
    "user_ids": [user_id, counsellor_id],
    "operator_ids": [user_id]
}
            
    response = requests.post(url, headers=headers, json=payload)
    print("Reponse in create channel function: ", response.json())
    if response.status_code == 200:
        response_data = response.json()
        channel_url = response_data.get('channel_url')
        print("channel url", channel_url)
        return HttpResponse(json.dumps({'channel_url':channel_url}))
    else:
        response.raise_for_status()

  except Exception as e:
      print(f"Exception while creating Sendbird channel: {e}")
      return JsonResponse({"error": f"Internal Server Error: {e}"}, status=500)

def getUser(user_id):
    try:
        url = f"https://api-{settings.SEND_BIRD_APP_ID}.sendbird.com/v3/users/{user_id}"
        headers = {
            "Api-Token": settings.SEND_BIRD_API_TOKEN,
            "Content-Type": "application/json",
        }
      

        response = requests.get(url, headers=headers)
        print("reseponse---", response.json())
        if response.status_code == 200:
            return True
        else:
            return False

    except Exception as e:
        print(f"Exception while fetching using user from Sendbird : {e}")
        return JsonResponse({"error": f"Internal Server Error: {e}"}, status=500)