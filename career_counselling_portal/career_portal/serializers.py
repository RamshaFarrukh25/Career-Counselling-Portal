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
    id = serializers.IntegerField(source='counsellor_id.id')
    name = serializers.CharField(source='counsellor_id.name')
    email = serializers.CharField(source='counsellor_id.email')
    field_of_study = serializers.CharField(source='qualification.field_of_study')
    qualification = serializers.CharField(source='qualification.qualification')
    review_description = serializers.SerializerMethodField()
    avg_rating = serializers.IntegerField()
    
    class Meta:
        model = Counsellor
        fields = ['id', 'name', 'field_of_study', 'email', 'profile_pic', 'qualification', 'review_description', 'avg_rating', 'profile_pic']

    def get_review_description(self, obj):
        latest_review = obj.ratings.order_by('-created_at').first()
        return latest_review.review_description if latest_review else None


class CounsellorDataSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source='counsellor_id.name')
    email = serializers.CharField(source='counsellor_id.email')
    password = serializers.CharField(source='counsellor_id.password')
    
    class Meta:
        model = Counsellor
        fields = ['name', 'email', 'phone_no', 'profile_pic','password']
    
    
class ACUSerializer(serializers.ModelSerializer):
    class Meta:
        model = ACU
        fields = '__all__'


class WorkingExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkingExperience
        fields = '__all__'

class QualificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Qualification
        fields = '__all__'


class CounsellorSerializer(serializers.ModelSerializer):
    counsellor_id = ACUSerializer()
    working_experiences = WorkingExperienceSerializer(many=True)
    qualification = QualificationSerializer()

    class Meta:
        model = Counsellor
        fields = '__all__'


class CareerGPTHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = CareerGPTHistory
        fields = '__all__'
