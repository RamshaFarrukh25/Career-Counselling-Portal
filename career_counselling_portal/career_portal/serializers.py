from rest_framework import serializers
from .models import Counsellor, Blogs, UserChatWithCounsellors, Reviews

class BlogsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blogs
        fields = '__all__'


class ReviewsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reviews
        fields = '__all__'


class TopCounsellorSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source='counsellor_id.name')
    field_of_study = serializers.CharField(source='qualification.field_of_study')
    qualification = serializers.CharField(source='qualification.qualification')
    review_description = serializers.CharField(source='ratings.first.review_description',allow_null=True)
    ratings = serializers.IntegerField(source='ratings.first.rating',allow_null=True)

    class Meta:
        model = Counsellor
        fields = ['name', 'field_of_study', 'qualification', 'review_description', 'ratings','profile_pic']


class UserChatWithCounsellorsSerializer(serializers.ModelSerializer):
    counsellor_name = serializers.CharField(source='counsellor_id.counsellor_id.name')

    class Meta:
        model = UserChatWithCounsellors
        fields = ["counsellor_id", "counsellor_name"]

    
