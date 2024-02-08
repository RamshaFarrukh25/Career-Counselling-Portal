from rest_framework import serializers
from .models import *

class BlogsSerializer(serializers.ModelSerializer):
    # dynamically get user_email against the respective blog
    counsellor_email = serializers.SerializerMethodField()

    def get_counsellor_email(self, obj):
        return obj.counsellor_id.counsellor_id.email

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


class CounsellorDataSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source='counsellor_id.name')
    email = serializers.CharField(source='counsellor_id.email')
    
    class Meta:
        model = Counsellor
        fields = ['name', 'email', 'phone_no', 'profile_pic']


class WorkingExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkingExperience
        fields = '__all__'

class QualificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Qualification
        fields = '__all__'

class ACUSerializer(serializers.ModelSerializer):
    class Meta:
        model = ACU
        fields = ('name', 'email')

class CounsellorSerializer(serializers.ModelSerializer):
    counsellor_id = ACUSerializer()
    working_experiences = WorkingExperienceSerializer(many=True)
    qualification = QualificationSerializer()

    class Meta:
        model = Counsellor
        fields = '__all__'
