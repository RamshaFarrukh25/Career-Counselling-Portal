from django.contrib import admin
from .models import ACU,Ratings,Qualification,Counsellor,Reviews

# Register your models here.
admin.site.register(ACU)
admin.site.register(Qualification)
admin.site.register(Ratings)
admin.site.register(Counsellor)
admin.site.register(Reviews)

