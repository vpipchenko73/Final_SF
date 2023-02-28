from django.urls import include, path, re_path
from rest_framework import routers
from . import views 
#from .views import *
#from .models import *
#from .views import  Car_TESTViewSet 
from .views import Car_userList, Car_serviceList, Complaint_userList, Complaint_serviceList
from .views import Maintenance_userList, Maintenance_serviceList 


router = routers.DefaultRouter()
# Пользователи 
router.register(r'users', views.UserViewSet)
router.register(r'groups', views.GroupViewSet)

# Сервис
router.register(r'service_company', views.ServiceCompanyViewSet)
router.register(r'tip_to', views.TypeMaintenanceViewSet)
router.register(r'to', views.MaintenanceViewSet)
router.register(r'to_wr', views.Maintenance_WRViewSet)
router.register(r'recovery_method', views.RecoveryMethodViewSet)
router.register(r'failure', views.FailureViewSet)
router.register(r'complaint', views.ComplaintViewSet)
router.register(r'complaint_wr', views.Complaint_WRViewSet)

# Машина 
router.register(r'controlled_bridge', views.ControlledBridgeViewSet)
router.register(r'driving_bridge', views.DrivingBridgeViewSet)
router.register(r'transmission', views.TransmissionViewSet)
router.register(r'engine', views.EngineViewSet)
router.register(r'technic', views.TechnicViewSet)
router.register(r'car', views.CarViewSet)
router.register(r'car_wr', views.Car_WRViewSet)
#router.register(r'^car_test/(?P<username>.+)/$', views.Car_TESTViewSet, basename ="car_test")



# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', include(router.urls)),
#     path('api/v1/car/', CarList.as_view()),
#     path('api/v1/car/<int:pk>/', CarList.as_view()),
#     path('api-sb/', include('rest_framework.urls')),
#     path('api-sb/', include('rest_framework.urls', namespace='rest_framework')),
    path('api-sb-user/', include('djoser.urls')),  # new
          # запрос конкретного юзера http://127.0.0.1:8000/api-sb-user/users/me  ( get запрос с токеном)
          # запрос списка юзеров http://127.0.0.1:8000/api-sb-user/users  ( get запрос с токеном)
    re_path(r'^api-sb-token/', include('djoser.urls.authtoken')),  # new
          # http://127.0.0.1:8000/api-sb-token/token/login/  вход ( post запрос результат - получение токена)
          # http://127.0.0.1:8000/api-sb-token/token/logout/  выход ( post запрос с токеном )
    re_path('^car_sort_user/(?P<username>.+)/$', Car_userList.as_view()),  
    re_path('^car_sort_service/(?P<service>.+)/$', Car_serviceList.as_view()), 
    re_path('^complaint_sort_user/(?P<username>.+)/$', Complaint_userList.as_view()), 
    re_path('^complaint_sort_service/(?P<service>.+)/$', Complaint_serviceList.as_view()),
    re_path('^to_sort_user/(?P<username>.+)/$', Maintenance_userList.as_view()),
    re_path('^to_sort_service/(?P<service>.+)/$', Maintenance_serviceList.as_view()),
]