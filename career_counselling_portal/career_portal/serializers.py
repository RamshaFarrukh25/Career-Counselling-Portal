from rest_framework import serializers
from .models import Counsellor, Blogs

class BlogsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blogs
        fields = '__all__'

class TopCounsellorSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(source='counsellor_id.id')
    name = serializers.CharField(source='counsellor_id.name')
    field_of_study = serializers.CharField(source='qualification.field_of_study')
    qualification = serializers.CharField(source='qualification.qualification')
    review_description = serializers.CharField(source='ratings.first.review_description',allow_null=True)
    ratings = serializers.IntegerField(source='ratings.first.rating',allow_null=True)

    class Meta:
        model = Counsellor
        fields = ['id','name', 'field_of_study', 'qualification', 'review_description', 'ratings','profile_pic']
