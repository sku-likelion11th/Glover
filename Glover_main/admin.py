from django.contrib import admin
from .models import student, stamp, stamp_collection

# Register your models here.
admin.site.register(student)
admin.site.register(stamp)
admin.site.register(stamp_collection)