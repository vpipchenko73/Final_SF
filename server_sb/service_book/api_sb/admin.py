from django.contrib import admin
from .models import *
from import_export import resources
from import_export.admin import ImportExportModelAdmin

# Модели сервиса

class ServiceCompanyResource(resources.ModelResource):
   class Meta:
         model  = ServiceCompany


class ServiceCompanyAdmin(ImportExportModelAdmin):

 resource_class  = ServiceCompanyResource

#admin.site.register(ServiceCompany,ServiceCompanyAdmin)

@admin.register(ServiceCompany)
class ServiceCompanyAdmin(admin.ModelAdmin):
    list_display = ['name', 'description']
    ordering = ('id',)
    search_fields = ['name']



class TypeMaintenanceResource(resources.ModelResource):
   class Meta:
         model  = TypeMaintenance


class TypeMaintenanceAdmin(ImportExportModelAdmin):

 resource_class  = TypeMaintenanceResource

#admin.site.register(TypeMaintenance,TypeMaintenanceAdmin)

@admin.register(TypeMaintenance)
class TypeMaintenanceAdmin(admin.ModelAdmin):
    list_display = ['name', 'description']
    ordering = ('id',)
    search_fields = ['name']




class MaintenanceResource(resources.ModelResource):
   class Meta:
         model  = Maintenance


class MaintenanceAdmin(ImportExportModelAdmin):

 resource_class  = MaintenanceResource

#admin.site.register(Maintenance,MaintenanceAdmin)

@admin.register(Maintenance)
class MaintenanceAdmin(admin.ModelAdmin):
    list_display = [ 'type', 'date', 'operating_time', 'order_number', 'order_date', 'service_company', 'car' ]   
    ordering = ('date',)
    search_fields = ['type']


class RecoveryMethodResource(resources.ModelResource):
   class Meta:
         model  = RecoveryMethod


class RecoveryMethodAdmin(ImportExportModelAdmin):

 resource_class  = RecoveryMethodResource

#admin.site.register(RecoveryMethod,RecoveryMethodAdmin)

@admin.register(RecoveryMethod)
class RecoveryMethodAdmin(admin.ModelAdmin):
    list_display = [ 'name', 'description']   
    ordering = ('name',)
    search_fields = ['name']


class FailureResource(resources.ModelResource):
   class Meta:
         model  = Failure


class FailureAdmin(ImportExportModelAdmin):

 resource_class  = FailureResource

#admin.site.register(Failure,FailureAdmin)

@admin.register(Failure)
class FailureAdmin(admin.ModelAdmin):
    list_display = [ 'name', 'description']   
    ordering = ('name',)
    search_fields = ['name']


class ComplaintResource(resources.ModelResource):
   class Meta:
         model  = Complaint


class ComplaintAdmin(ImportExportModelAdmin):

 resource_class  = ComplaintResource

#admin.site.register(Complaint, ComplaintAdmin)

@admin.register(Complaint)
class ComplaintAdmin(admin.ModelAdmin):
    list_display = [ 'date_failure', 'operating_time', 'node_failure', 'description_failure', 
                   'method_recovery', 'repair_parts', 'date_recovery', 'car', 'service_company']   
    ordering = ('date_failure',)
    #search_fields = ['description_failure']
    search_fields = ['node_failure'] 



# Модели машины и комплектущих 

class ControlledBridgeResource(resources.ModelResource):
   class Meta:
         model  = ControlledBridge

class ControlledBridgeAdmin(ImportExportModelAdmin):

 resource_class  = ControlledBridgeResource

#admin.site.register(ControlledBridge, ControlledBridgeAdmin)

@admin.register(ControlledBridge)
class ControlledBridgeAdmin(admin.ModelAdmin):
    list_display = [ 'name', 'description']   
    ordering = ('name',)
    search_fields = ['name']


class DrivingBridgeResource(resources.ModelResource):
   class Meta:
         model  = DrivingBridge


class DrivingBridgeAdmin(ImportExportModelAdmin):

 resource_class  = DrivingBridgeResource

#admin.site.register(DrivingBridge, DrivingBridgeAdmin)

@admin.register(DrivingBridge)
class DrivingBridgeAdmin(admin.ModelAdmin):
    list_display = [ 'name', 'description']   
    ordering = ('name',)
    search_fields = ['name']


class TransmissionResource(resources.ModelResource):
   class Meta:
         model  = Transmission


class TransmissionAdmin(ImportExportModelAdmin):

 resource_class  = TransmissionResource

#admin.site.register(Transmission, TransmissionAdmin)

@admin.register(Transmission)
class TransmissionAdmin(admin.ModelAdmin):
    list_display = [ 'name', 'description']   
    ordering = ('name',)
    search_fields = ['name']


class EngineResource(resources.ModelResource):
   class Meta:
         model  = Engine


class EngineAdmin(ImportExportModelAdmin):

 resource_class  = EngineResource

#admin.site.register(Engine, EngineAdmin)

@admin.register(Engine)
class EngineAdmin(admin.ModelAdmin):
    list_display = [ 'name', 'description']   
    ordering = ('name',)
    search_fields = ['name']


class TechnicResource(resources.ModelResource):
   class Meta:
         model  = Technic


class TechnicAdmin(ImportExportModelAdmin):

 resource_class  = TechnicResource

#admin.site.register(Technic, TechnicAdmin)

@admin.register(Technic)
class TechnicAdmin(admin.ModelAdmin):
    list_display = [ 'name', 'description']   
    ordering = ('name',)
    search_fields = ['name']


class CarResource(resources.ModelResource):
   class Meta:
         model  = Car


class CarAdmin(ImportExportModelAdmin):

 resource_class  = CarResource

#admin.site.register(Car, CarAdmin)

@admin.register(Car)
class CarAdmin(admin.ModelAdmin):
    list_display = [ 'car_number', 'technic', 'engine', 'engine_number', 'transmission', 'transmission_number', 
                      'driving_bridge', 'driving_bridge_number', 'controlled_bridge', 'controlled_bridge_number', 
                      'delivery_contract', 'date_shipment', 'consignee',    'delivery_address',    'equipment', 
                      'client', 'service_company' ]   
    ordering = ('id',)
    search_fields = ['technic__name', 'client__username']
    #search_fields = ['engine_number']

