from django.db import models

class ACU(models.Model):
    name = models.TextField()
    email = models.EmailField(unique=True)
    password = models.TextField()
    role = models.CharField(default='U', max_length=1)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.name} - {self.email}'

class Counsellor(models.Model):
    counsellor_id =  models.ForeignKey(ACU,on_delete= models.CASCADE, related_name='counsellors')
    phone_no = models.TextField()
    gender = models.CharField(default='Male',max_length=6)
    cnic = models.CharField(max_length=15)
    profile_pic = models.TextField()
    cnic_front_img = models.TextField()
    cninc_back_img = models.TextField()
    is_approved= models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f'A counsellor with name: {self.counsellor_id.name}, email: {self.counsellor_id.email}'
    

class Qualification(models.Model):
    counsellor_id = models.OneToOneField(Counsellor, on_delete=models.CASCADE, primary_key=True, related_name='qualification')
    qualification = models.TextField()
    field_of_study = models.TextField()
    transcript_img = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'A qualification of counsellor: {self.counsellor_id.counsellor_id.email} is {self.qualification}'

      
class WorkingExperience(models.Model):
    counsellor_id = models.ForeignKey(Counsellor, on_delete=models.CASCADE, related_name='working_experiences')
    institute_name = models.TextField()
    starting_year = models.TextField()
    ending_year = models.TextField()
    certificates_image = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'The working experience of counsellor: {self.counsellor_id.counsellor_id.email} is {self.institute_name}'

class Ratings(models.Model):
    counsellor_id = models.ForeignKey(Counsellor, on_delete=models.CASCADE, related_name='ratings')
    rating = models.IntegerField(default=0)
    review_description = models.TextField()
    user_id = models.ForeignKey(ACU, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f'The rating for counsellor: {self.counsellor_id} is {self.rating}'


class Reviews(models.Model):
    user_id = models.ForeignKey(ACU, on_delete=models.CASCADE, related_name='reviews')
    reviewer_name = models.TextField()
    reviewer_email = models.EmailField()
    reviewer_description = models.TextField()
    is_approved = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'The reviewer name is : {self.reviewer_name} and email {self.reviewer_email}'


class Blogs(models.Model):
    counsellor_id = models.ForeignKey(Counsellor, on_delete=models.CASCADE, related_name='blogs')
    title = models.TextField()
    author_name = models.TextField()
    area_of_field = models.TextField()
    description = models.TextField()
    cover_image = models.TextField()
    is_approved = models.BooleanField(default=False)
    created_at = models.DateField(auto_now_add=True)

    def __str__(self):
        return f'The title for the blog of counsellor {self.counsellor_id} is {self.title}'
    

class CareerGPTHistory(models.Model):
    user_id = models.ForeignKey(ACU, on_delete=models.CASCADE, related_name='careerGPTHistory')
    msgId = models.BigIntegerField()
    message = models.TextField()
    type = models.CharField(max_length=4, default="bot")

    def __str__(self):
        return f'The user who used careerGPT is: {self.user_id.name}'
    