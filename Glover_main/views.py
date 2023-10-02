from django.shortcuts import render, redirect, get_object_or_404
from .models import student, stamp, stamp_collection
from django.db import transaction
from django.core.files.storage import FileSystemStorage
from django.core.exceptions import ObjectDoesNotExist
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login
from django.conf import settings
import os


# Create your views here.
# 메인페이지
def main(request, student_id=None):
    if request.method == 'POST':
        student_id = request.POST.get('student_id')
        major = request.POST.get('major')
        
        try:
            student_info = student.objects.get(student_id=student_id, major=major)
            stamp_collections = stamp_collection.objects.filter(student=student_info)
            
            student_info.consent = True
            flag = student_info.consent
            context = {'consent': flag}
            student.objects.filter(student_id=student_info.student_id).update(**context)
            
            return render(request, 'user_page/participation.html', {'student_info': student_info, 'stamp_collections':stamp_collections, 'flag': flag})
        
        except ObjectDoesNotExist:
            # 조회에 실패한 경우 오류 메시지를 사용자에게 표시
            error_message = "학생 정보를 찾을 수 없습니다."
            return render(request, 'user_page/index.html', {'error_message': error_message, 'flag': False})

    return render(request, 'user_page/index.html')

# is_consented
def is_consented(request, student_id):
    try:
        flag = student.objects.get(student_id=student_id)
        
        
        return JsonResponse({'flag': flag.consent})
    except:
        return JsonResponse({'flag': 'notfound'})


# 서비스 소개
def introduce(request):
	return render(request, 'user_page/introduce.html')


# 만든이들
def makers(request):
	return render(request, 'user_page/makers.html')



# ---------------여기부터 관리자페이지
# 관리자 로그인
def a_login(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            # 로그인 성공 후 리다이렉트 또는 다른 작업을 수행할 수 있습니다.
            return redirect('a_main')
        else:
            # 로그인 실패
            return render(request, 'admin_page/a_login.html', {'error_message': '아이디와 비밀번호를 확인해주세요.'})
        
    if request.user.is_authenticated:
        return redirect('a_main')
    
    return render(request, 'admin_page/a_login.html')


# 관리자 메인
@login_required
def a_main(request):
	return render(request, 'admin_page/a_main.html')


# stamp 리스트(수정, 삭제)
@login_required
@transaction.atomic
def a_events(request):
    stamps = stamp.objects.all()
    
    if request.method == 'POST':
        action = request.POST.get('action')
        
        # 저장 눌렀을 때
        if action == 'save':
            updated_data = {'event_name': request.POST.get('event_name'),
                            'event_info': request.POST.get('event_info'),
                            'event_start': request.POST.get('event_start'),
                            'event_end': request.POST.get('event_end')}
            
            ori_name = request.POST.get('ori_name')
            new_name = request.POST.get('event_name')
            
            # 스탬프 모델에 데이터 저장/이미지 입력
            images = request.FILES.get('after_image')
            try:
                if images:
                    fs = FileSystemStorage(location=os.path.join(settings.MEDIA_ROOT))
                    filename = fs.save(images.name, images)
                    updated_data['image'] = filename
                    
                # DB에 직접 업뎃
                stamp.objects.filter(event_name=ori_name).update(**updated_data)
                
                new_stamp_instance = stamp.objects.get(event_name=new_name)  # 새로운 event_name에 해당하는 stamp 인스턴스

                # 2. 연결된 stamp_collection 레코드 찾기 및 외래 키 값 업데이트
                related_stamp_collections = stamp_collection.objects.filter(stamp__event_name=ori_name)
                related_stamp_collections.update(stamp=new_stamp_instance)
                
                return redirect('a_events')  # 수정 후 도장 목록으로 리디렉션

            except stamp.DoesNotExist:
                    return render(request, 'admin_page/a_events.html', {'error_message': '필드를 확인해주세요.'})

        # 삭제 눌렀을 때
        if action == 'delete':
            ori_stamp = request.POST.get('ori_name')  # 삭제할 스탬프의 ID를 받아옴
            
            try:
                delstamp = stamp.objects.get(pk=ori_stamp)  # 해당 ID의 스탬프 객체를 가져옴
                delstamp.delete()  # 스탬프 삭제
                
                return redirect('a_events')  # 삭제 후 리다이렉트
            except stamp.DoesNotExist:
                return render(request, 'admin_page/a_events.html', {'error_message': '이벤트가 존재하지 않습니다.'})
    
    return render(request, 'admin_page/a_events.html', {'stamps': stamps})


# stamp 추가
@login_required
def a_add(request):
    if request.method == 'POST':
        action = request.POST.get('action')
        
        if action == 'save':
            # "저장" 버튼이 클릭되었을 때 처리할 로직
            event_name = request.POST['event_name']
            event_info = request.POST['event_info']
            event_start = request.POST['event_start']
            event_end = request.POST['event_end']
            image = request.FILES.get('after_image') if 'after_image' in request.FILES else None

            print(event_name)
            # 데이터 유효성 검사 및 저장
            if event_name and event_info and event_start and event_end and image:
                mystamp = stamp (
                    event_name = event_name,
                    event_info = event_info,
                    event_start = event_start,
                    event_end = event_end,
                    image = image,
                )
                mystamp.save()
                return redirect('a_events')
            else:
                # 필요한 모든 데이터가 제출되지 않은 경우에 대한 처리
                error_message = "모든 필드를 입력해야 합니다."
        
    else:
        error_message = ""

    return render(request, 'admin_page/a_add.html', {'error_message': error_message})


# 이벤트 참여자 체크
@login_required
def a_search(request):
    events = stamp.objects.all()
    students = student.objects.all()
    selected_event = None

    if request.method == 'POST':
        event_name = request.POST.get('event_name')
        major = request.POST.get('major')
        student_id = request.POST.get('student_id')

        if event_name:
           selected_event = stamp.objects.get(event_name=event_name)

        if major:
           students = students.filter(major=major)
        
        if student_id:
           students = students.filter(student_id__icontains=student_id)
        
        
        # 선택된 이벤트의 체크박스 확인 후 해당 학생의 student_collection을 업데이트
        event_check1 = request.POST.getlist('hiddenInput')
        event_check2 = request.POST.getlist('hiddenInput2')
        after_major = request.POST.get('a_major')
        
        for stamp_collection_id, is_collected_str in zip(event_check2, event_check1):
            try:
                # is_collected_str 값을 불리언 값으로 변환하여 사용
                is_collected = is_collected_str.lower() == 'true'

                collection = stamp_collection.objects.get(id=stamp_collection_id)

                collection.is_collected = is_collected
                collection.save()
            except:
                pass
        
        if student_id and major:
            stamp_collections = stamp_collection.objects.filter(student__major__icontains=major, student__student_id__icontains=student_id, stamp=selected_event)
        elif major:
            stamp_collections = stamp_collection.objects.filter(student__major__icontains=major, stamp=selected_event)
        else:
            stamp_collections = stamp_collection.objects.none()
        

        context = {'students': students, 
                   'events': events, 
                   'initial_data': request.POST, 
                   'stamp_collections':stamp_collections,
                   }

        return render(request, 'admin_page/a_search.html', context)

    return render(request, 'admin_page/a_search.html', {'events': events, 'students': students})