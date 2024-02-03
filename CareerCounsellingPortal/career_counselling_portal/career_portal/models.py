from django.db import models

class ACU(models.Model):
    name = models.TextField()
    email = models.EmailField(unique=True)
    password = models.TextField()
    role = models.CharField(default='U',max_length=1)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
     return f'{self.name} - {self.email}'

    
    
class Counsellor(models.Model):
    counsellor_id =  models.ForeignKey(ACU,on_delete= models.CASCADE)
    phone_no = models.TextField()
    gender = models.CharField(default='Male',max_length=6)
    cnic = models.CharField(max_length=15)
    cnic_front_img = models.TextField()
    cninc_back_img = models.TextField()
    field_of_study = models.TextField()
    is_approved= models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f'A counsellor with name: {self.counsellor_id}, email: {self.gender}'
    
class Qualification(models.Model):
    counsellor_id = models.OneToOneField(Counsellor, on_delete=models.CASCADE, primary_key=True)
    name = models.TextField()
    transcript_img = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'A qualification for counsellor: {self.counsellor_id} is {self.name}'
    
    
class WorkingExperience(models.Model):
    counsellor_id = models.ForeignKey(Counsellor, on_delete=models.CASCADE)
    institute_name = models.TextField()
    starting_date = models.DateTimeField()
    ending_date= models.DateTimeField()
    certificates_image = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'The working experience for counsellor: {self.counsellor_id} is {self.name}'
    
    
    
class Ratings(models.Model):
    counsellor_id = models.ForeignKey(Counsellor, on_delete=models.CASCADE)
    rating= models.IntegerField()
    review_description = models.TextField()
    user_id = models.ForeignKey(ACU,on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f'The rating for counsellor: {self.counsellor_id} is {self.rating}'
    
    
class Reviews(models.Model):
    user_id = models.ForeignKey(ACU,on_delete=models.CASCADE) # why??????
    reviewer_name = models.TextField()
    reviewer_email = models.EmailField(unique=True)
    reviewer_description = models.TextField()
    is_approved= models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    
    
    def __str__(self):
        return f'The reviewer name is : {self.reviewer_name} and email {self.email}'
    
    
    
class Blogs(models.Model):
    counsellor_id = models.ForeignKey(Counsellor, on_delete=models.CASCADE)
    title = models.TextField()
    author_name = models.TextField()
    area_of_field = models.TextField()
    description = models.TextField()
    cover_image = models.TextField()
<<<<<<< Updated upstream:CareerCounsellingPortal/career_counselling_portal/career_portal/models.py
    is_approved= models.BooleanField(default=False)
    created_at = models.DateField(auto_now_add=True)
    
    
    def __str__(self):
        return f'The  title for blog of counsellor {self.counsellor_id} is {self.title}'
    
    
    
    
    

    


 
    

    
=======
    is_approved = models.BooleanField(default=False)
    created_at = models.DateField(auto_now_add=True)

    def _str_(self):
        return f'The title for the blog of counsellor {self.counsellor_id} is {self.title}'

class CareerGPTHistory(models.Model):
    user_id = models.OneToOneField(ACU, on_delete=models.CASCADE, primary_key=True, related_name='careerGPTHistory')
    history = models.TextField()

    def __str__(self):
        return f'The user who used careerGPT is: {self.user_id.name}'

>>>>>>> Stashed changes:career_counselling_portal/career_portal/models.py
