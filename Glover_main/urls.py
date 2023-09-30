from django.urls import path
from .views import *
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    # 사용자 페이지
	path('', main, name='main'),
    path('search/', main, name='search'),
    
    # 관리자 페이지
    path('a_login/', a_login, name='a_login'),
    path('a_main/', a_main, name='a_main'),
    path('a_events/', a_events, name='a_events'),
    path('a_add/', a_add, name='a_add'),
    path('a_search/',a_search,name='a_search'),
    # path('a_modify/<str:event_name>/',a_modify,name='a_modify'),
    
    # introduce, makers
    path('introduce/', introduce, name='introduce'),
    path('makers/', makers, name='makers'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)