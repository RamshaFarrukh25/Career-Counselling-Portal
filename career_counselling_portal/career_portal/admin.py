from django.contrib import admin
from .models import ACU, Counsellor, Qualification, WorkingExperience

# Register your models here.
admin.site.register(ACU)
admin.site.register(Counsellor)
admin.site.register(Qualification)
admin.site.register(WorkingExperience)
