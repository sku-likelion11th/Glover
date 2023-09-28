from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver

# Create your models here.
class stamp(models.Model):
    event_name = models.CharField(max_length=200, primary_key=True)
    event_info = models.TextField()
    event_start = models.DateField()
    event_end = models.DateField()
    image = models.ImageField(upload_to='images/')
    
    def __str__(self):
        return self.event_name


class stamp_collection(models.Model):
    student = models.ForeignKey('student', on_delete=models.CASCADE)
    stamp = models.ForeignKey(stamp, on_delete=models.CASCADE)
    is_collected = models.BooleanField(default=False)
    
    def __str__(self):
        return f'{self.student} - {self.stamp}'


class student(models.Model):
    student_id = models.CharField(max_length=20, primary_key=True)
    full_name = models.CharField(max_length=20)
    major = models.CharField(max_length=100)
    grade = models.IntegerField()
    consent = models.BooleanField(default=False)
    
    stamps = models.ManyToManyField(stamp, through='stamp_collection', related_name='collectors')
    
    def __str__(self):
        return f'{self.student_id} - {self.major} - {self.full_name} - {self.consent}'
    
    
# stamp추가할 때마다 중계모델에 추가
@receiver(post_save, sender=stamp)
def create_stamp_collection(sender, instance, **kwargs):
    students = student.objects.all()
    
    for student_instance in students:
        stamp_collection.objects.create(student=student_instance, stamp=instance)
        
        
# 학생 추가되면 기존 스탬프 추가
@receiver(post_save, sender=student)
def create_student_stamp_collection(sender, instance, created, **kwargs):
    if created:
        stamps = stamp.objects.all()
    
        for stamp_instance in stamps:
            stamp_collection.objects.get_or_create(student=instance, stamp=stamp_instance)