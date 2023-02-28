from rest_framework import serializers

from .models import *
from django.contrib.auth.models import User, Group


# сериализеры  пользователей

class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = '__all__'

 
class UserSerializer(serializers.ModelSerializer):
    groups = serializers.SlugRelatedField(
        many=True,
        read_only=True,
        slug_field='name'
    )
    
    class Meta:
        model = User
        fields = '__all__'
        #depth = 1


# сериализеры   моделей сервиса

class ServiceCompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceCompany
        fields = '__all__'


class TypeMaintenanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = TypeMaintenance
        fields = '__all__'
        depth = 1 #depth должно быть задано целочисленное значение, указывающее 
        # глубину взаимосвязей, которые необходимо пройти, прежде чем вернуться 
        # к плоскому представлению.


class MaintenanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Maintenance
        fields = '__all__'
        depth = 2 #depth должно быть задано целочисленное значение, указывающее 
        # глубину взаимосвязей, которые необходимо пройти, прежде чем вернуться 
        # к плоскому представлению.


class Maintenance_WRSerializer(serializers.ModelSerializer):
    class Meta:
        model = Maintenance
        fields = '__all__'
        
        

class RecoveryMethodSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecoveryMethod
        fields = '__all__'


class FailureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Failure
        fields = '__all__'
        

class ComplaintSerializer(serializers.ModelSerializer):

    rekovery_time = serializers.SerializerMethodField('period')  # доп поле длительности ремонта 
                                                                 # вычисляется нижеидущей функцией 

    def period(self,model):
        delta=(model.date_recovery - model.date_failure)
        return delta.days

       
    class Meta:
        model = Complaint
        fields = '__all__'
        depth = 2 #depth должно быть задано целочисленное значение, указывающее 
        # глубину взаимосвязей, которые необходимо пройти, прежде чем вернуться 
        # к плоскому представлению.


class Complaint_WRSerializer(serializers.ModelSerializer):

    class Meta:
        model = Complaint
        fields = '__all__'
        
    

# сериализеры   моделей машин

class ControlledBridgeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ControlledBridge
        fields = '__all__'

class DrivingBridgeSerializer(serializers.ModelSerializer):
    class Meta:
        model = DrivingBridge
        fields = '__all__'

class TransmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transmission
        fields = '__all__'

class EngineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Engine
        fields = '__all__'

class TechnicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Technic
        fields = '__all__'

class CarSerializer(serializers.ModelSerializer):
        
    class Meta:
        model = Car
        fields = '__all__'
        depth = 1 #depth должно быть задано целочисленное значение, указывающее 
        # глубину взаимосвязей, которые необходимо пройти, прежде чем вернуться 
        # к плоскому представлению.

class Car_WRSerializer(serializers.ModelSerializer):
        
    class Meta:
        model = Car
        fields = '__all__'


class Car1Serializer(serializers.ModelSerializer):
        
    class Meta:
        model = Car
        fields = '__all__'
        depth = 2 #depth должно быть задано целочисленное значение, указывающее 
        # глубину взаимосвязей, которые необходимо пройти, прежде чем вернуться 
        # к плоскому представлению.
        
   




        

