from rest_framework import viewsets
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAdminUser, AllowAny, IsAuthenticated

#from .serializers import HeroSerializer, UserSerializer, GroupSerializer
from .serializers import *
#from .models import Hero
from .models import *
from django.contrib.auth.models import User, Group


# Представление  Юзеров
class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all().order_by('id')
    serializer_class = GroupSerializer
    permission_classes = (IsAuthenticated, )

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('id')
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticated, )


# Представление сервисов

class ServiceCompanyViewSet(viewsets.ModelViewSet):
    queryset = ServiceCompany.objects.all().order_by('id')
    serializer_class = ServiceCompanySerializer
    #permission_classes = (AllowAny, )
    permission_classes = (IsAuthenticated, )

class TypeMaintenanceViewSet(viewsets.ModelViewSet):
    queryset = TypeMaintenance.objects.all().order_by('id')
    serializer_class = TypeMaintenanceSerializer
    #permission_classes = (AllowAny, )
    permission_classes = (IsAuthenticated, )

class MaintenanceViewSet(viewsets.ModelViewSet):
    queryset = Maintenance.objects.all().order_by('id')
    serializer_class = MaintenanceSerializer
    #permission_classes = (AllowAny, )
    permission_classes = (IsAuthenticated, )

class Maintenance_WRViewSet(viewsets.ModelViewSet):
    queryset = Maintenance.objects.all().order_by('id')
    serializer_class = Maintenance_WRSerializer
    #permission_classes = (AllowAny, )
    permission_classes = (IsAuthenticated, )


class RecoveryMethodViewSet(viewsets.ModelViewSet):
    queryset = RecoveryMethod.objects.all().order_by('id')
    serializer_class = RecoveryMethodSerializer
    #permission_classes = (AllowAny, )
    permission_classes = (IsAuthenticated, )                

class FailureViewSet(viewsets.ModelViewSet):
    queryset = Failure.objects.all().order_by('id')
    serializer_class = FailureSerializer
    #permission_classes = (AllowAny, )
    permission_classes = (IsAuthenticated, )

class ComplaintViewSet(viewsets.ModelViewSet):
    queryset = Complaint.objects.all().order_by('id')
    serializer_class = ComplaintSerializer
    #permission_classes = (AllowAny, )
    permission_classes = (IsAuthenticated, )

class Complaint_WRViewSet(viewsets.ModelViewSet):
    queryset = Complaint.objects.all().order_by('id')
    serializer_class = Complaint_WRSerializer
    #permission_classes = (AllowAny, )
    permission_classes = (IsAuthenticated, )



# Представления машин

class ControlledBridgeViewSet(viewsets.ModelViewSet):
    queryset = ControlledBridge.objects.all().order_by('id')
    serializer_class = ControlledBridgeSerializer
    #permission_classes = (AllowAny, )
    permission_classes = (IsAuthenticated, )

class DrivingBridgeViewSet(viewsets.ModelViewSet):
    queryset = DrivingBridge.objects.all().order_by('id')
    serializer_class = DrivingBridgeSerializer
    #permission_classes = (AllowAny, )
    permission_classes = (IsAuthenticated, )

class TransmissionViewSet(viewsets.ModelViewSet):
    queryset = Transmission.objects.all().order_by('id')
    serializer_class = TransmissionSerializer
    #permission_classes = (AllowAny, )
    permission_classes = (IsAuthenticated, )

class EngineViewSet(viewsets.ModelViewSet):
    queryset = Engine.objects.all().order_by('id')
    serializer_class = EngineSerializer
    #permission_classes = (AllowAny, )
    permission_classes = (IsAuthenticated, )

class TechnicViewSet(viewsets.ModelViewSet):
    queryset = Technic.objects.all().order_by('id')
    serializer_class = TechnicSerializer
    #permission_classes = (AllowAny, )
    permission_classes = (IsAuthenticated, )


class CarViewSet(viewsets.ModelViewSet):
    queryset = Car.objects.all().order_by('id')
    serializer_class = CarSerializer
    permission_classes = (AllowAny, )
    #permission_classes = (IsAuthenticated, )    

class Car_WRViewSet(viewsets.ModelViewSet):
    queryset = Car.objects.all().order_by('id')
    serializer_class = Car_WRSerializer
    permission_classes = (AllowAny, )
    #permission_classes = (IsAuthenticated, )   

# class Car_TESTViewSet(viewsets.ModelViewSet):
#     #queryset = Car.objects.all().order_by('id')
#     serializer_class = Car1Serializer
#     permission_classes = (AllowAny, )   

#     def get_queryset(self):
     
        # pk=self.kwargs.get("pk")
        # print('_________')
        # print(pk)
        # if not pk:
        #     return Car.objects.all()[:3]
        # return Car.objects.filter(pk=pk)     
        
        
class Car_userList(generics.ListAPIView):
    queryset = Car.objects.all().order_by('id')
    serializer_class = CarSerializer
    permission_classes = (AllowAny, )
    #permission_classes = (IsAuthenticated, )

    def get_queryset(self):
        username =self.kwargs['username']
        print('_________')
        print(username)
        return Car.objects.filter(client__username=username)

    # def get_queryset(self):
    #     username =self.kwargs['username']
    #     print('_________')
    #     print(username)
    #     if (username=='manager') or (username=='anonim'):
    #         return Car.objects.all()
    #     return Car.objects.filter(client__username=username)

class Car_serviceList(generics.ListAPIView):
    queryset = Car.objects.all().order_by('id')
    serializer_class = CarSerializer
    permission_classes = (AllowAny, )
    #permission_classes = (IsAuthenticated, )

    def get_queryset(self):
        service =self.kwargs['service']
        print('_________')
        print(service)
        return Car.objects.filter(service_company__name=service)    


class Complaint_userList(generics.ListAPIView):
    queryset = Complaint.objects.all().order_by('id')
    serializer_class = ComplaintSerializer
    #permission_classes = (AllowAny, )
    permission_classes = (IsAuthenticated, )

    def get_queryset(self):
        username =self.kwargs['username']
        print('_________')
        print(username)
        return Complaint.objects.filter(car__client__username=username)


class Complaint_serviceList(generics.ListAPIView):
    queryset = Complaint.objects.all().order_by('id')
    serializer_class = ComplaintSerializer
    #permission_classes = (AllowAny, )
    permission_classes = (IsAuthenticated, )

    def get_queryset(self):
        name =self.kwargs['service']
        print('_________')
        print(name)
        return Complaint.objects.filter(service_company__name=name)


class Maintenance_userList(generics.ListAPIView):
    queryset = Complaint.objects.all().order_by('id')
    serializer_class = MaintenanceSerializer
    #permission_classes = (AllowAny, )
    permission_classes = (IsAuthenticated, )

    def get_queryset(self):
        username =self.kwargs['username']
        print('_________')
        print(username)
        return Maintenance.objects.filter(car__client__username=username)    


class Maintenance_serviceList(generics.ListAPIView):
    queryset = Maintenance.objects.all().order_by('id')
    serializer_class = MaintenanceSerializer
    #permission_classes = (AllowAny, )
    permission_classes = (IsAuthenticated, )

    def get_queryset(self):
        name =self.kwargs['service']
        print('_________')
        print(name)
        return Maintenance.objects.filter(service_company__name=name)    














    