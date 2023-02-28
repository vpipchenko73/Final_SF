from django.db import models
from datetime import datetime
from django.contrib.auth.models import User 


# Модель Машины

class Car(models.Model):
    car_number = models.CharField(unique=True, max_length=12, verbose_name='Зав. № машины')
    technic = models.ForeignKey('Technic', on_delete=models.CASCADE, verbose_name='Модель техники')
    engine = models.ForeignKey('Engine', on_delete=models.CASCADE, verbose_name='Модель двигателя')
    engine_number = models.CharField(max_length=12, verbose_name='Зав. № двигателя')
    transmission = models.ForeignKey('Transmission', on_delete=models.CASCADE, verbose_name='Модель трансмиссии')
    transmission_number = models.CharField(max_length=12, verbose_name='Зав. № трансмиссии')
    driving_bridge = models.ForeignKey('DrivingBridge', on_delete=models.CASCADE, verbose_name='Модель ведущего моста')
    driving_bridge_number = models.CharField(max_length=12, verbose_name='Зав. № ведущего моста')
    controlled_bridge = models.ForeignKey('ControlledBridge', on_delete=models.CASCADE, verbose_name='Модель управляемого моста')
    controlled_bridge_number = models.CharField(max_length=12, verbose_name='Зав. № управляемого моста')
    delivery_contract = models.CharField(max_length=20, verbose_name='Договор поставки №, дата')
    date_shipment = models.DateField(default=datetime.now, verbose_name='Дата отгрузки с завода')
    consignee = models.CharField(max_length=200, verbose_name='Грузополучатель (конечный потребитель)')
    delivery_address = models.CharField(max_length=200, verbose_name='Адрес поставки (эксплуатации)')
    equipment = models.TextField(blank=False,verbose_name='Комплектация (доп. опции)', default="Стандарт")
    client = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='Клиент')
    service_company = models.ForeignKey('ServiceCompany', on_delete=models.CASCADE, verbose_name='Сервисная компания')

    def __str__(self):
        return f'Зав. № машины ->{self.car_number}'

    class Meta:
        verbose_name = 'Машина'
        verbose_name_plural = 'Машины'

# Комплектующие машины

class Technic(models.Model):
    name = models.CharField(max_length=20, verbose_name='Название')
    description = models.TextField(verbose_name='Описание', blank=True, null=True)

    def __str__(self):
        return f'{self.name}'

    class Meta:
        verbose_name = 'Модель техники'
        verbose_name_plural = 'Модели техники'

class Engine(models.Model):
    name = models.CharField(max_length=30, verbose_name='Название')
    description = models.TextField(verbose_name='Описание', blank=True, null=True)

    def __str__(self):
        return f'Модель двигателя ->{self.name}'

    class Meta:
        verbose_name = 'Модель двигателя'
        verbose_name_plural = 'Модели двигателей'

class Transmission(models.Model):
    name = models.CharField(max_length=20, verbose_name='Название')
    description = models.TextField(verbose_name='Описание', blank=True, null=True)

    def __str__(self):
        return f'{self.name}'

    class Meta:
        verbose_name = 'Модель трансмиссии'
        verbose_name_plural = 'Модели трансмиссий'

class DrivingBridge(models.Model):
    name = models.CharField(max_length=20, verbose_name='Название')
    description = models.TextField(verbose_name='Описание', blank=True, null=True)

    def __str__(self):
        return f'Модель вед. моста ->{self.name}'

    class Meta:
        verbose_name = 'Модель ведущего моста'
        verbose_name_plural = 'Модели ведущих мостов'

class ControlledBridge(models.Model):
    name = models.CharField(max_length=20, verbose_name='Название')
    description = models.TextField(verbose_name='Описание', blank=True, null=True)

    def __str__(self):
        return f'Модель упр. моста ->{self.name}'

    class Meta:
        verbose_name = 'Модель управляемого моста'
        verbose_name_plural = 'Модели управляемых мостов'

# Сервисные функции  и ТО 

class Complaint(models.Model):
    date_failure = models.DateField(default=datetime.now, verbose_name='Дата отказа')
    operating_time = models.PositiveIntegerField(default=0, verbose_name='Наработка, м/час')
    node_failure = models.ForeignKey('Failure', on_delete=models.CASCADE, verbose_name='Узел отказа')
    description_failure = models.TextField(blank=True, null=True, verbose_name='Описание отказа')
    method_recovery = models.ForeignKey('RecoveryMethod', on_delete=models.CASCADE, verbose_name='Способ восстановления')
    repair_parts = models.TextField(blank=True, null=True, verbose_name='Используемые запасные части')
    date_recovery = models.DateField(default=datetime.now, verbose_name='Дата восстановления')
    car = models.ForeignKey(Car, on_delete=models.CASCADE, verbose_name='Машина')
    service_company = models.ForeignKey('ServiceCompany', on_delete=models.CASCADE, verbose_name='Сервисная компания', null=True, blank=True)

    def __str__(self):
        return f'Рекламация дата->{self.date_failure} машина->{self.car}'

    
    class Meta:
        verbose_name = 'Рекламация'
        verbose_name_plural = 'Рекламации'




class Failure(models.Model):
    name = models.CharField(max_length=100, verbose_name='Название')
    description = models.TextField(verbose_name='Описание', blank=True, null=True)

    def __str__(self):
        return f'{self.name}'

    class Meta:
        verbose_name = 'Характер отказа'
        verbose_name_plural = 'Характеры отказа'

class RecoveryMethod(models.Model):
    name = models.CharField(max_length=100, verbose_name='Название')
    description = models.TextField(verbose_name='Описание', blank=True, null=True)

    def __str__(self):
        return f'Способ восстановления ->{self.name}'

    class Meta:
        verbose_name = 'Способ восстановления'
        verbose_name_plural = 'Способы восстановления'



class Maintenance(models.Model):
    type = models.ForeignKey('TypeMaintenance', on_delete=models.CASCADE, verbose_name='Вид ТО')
    date = models.DateField(default=datetime.now, verbose_name='Дата проведения ТО')
    operating_time = models.PositiveIntegerField(default=0, verbose_name='Наработка, м/час')
    order_number = models.CharField(max_length=20, verbose_name='№ заказ-наряда')
    order_date = models.DateField(default=datetime.now, verbose_name='Дата заказ-наряда')
    service_company = models.ForeignKey('ServiceCompany', on_delete=models.CASCADE, verbose_name='Организация, проводившая ТО', null=True, blank=True)
    car = models.ForeignKey(Car, on_delete=models.CASCADE, verbose_name='Машина')

    def __str__(self):
        return f'Техническое обслуживание дата ->{self.date} машина ->{self.car}'

    class Meta:
        verbose_name = 'Техническое обслуживание'
        verbose_name_plural = 'Технические обслуживания'        


class TypeMaintenance(models.Model):
    name = models.CharField(max_length=50, verbose_name='Название')
    description = models.TextField(verbose_name='Описание', blank=True, null=True)

    def __str__(self):
        return f'Вид технического обслуживания -> {self.name}'

    class Meta:
        verbose_name = 'Вид технического обслуживания'
        verbose_name_plural = 'Виды технических обслуживаний'

class ServiceCompany(models.Model):
    name = models.CharField(max_length=200, verbose_name='Название')
    description = models.TextField(verbose_name='Описание', blank=True, null=True)

    def __str__(self):
        return f'Сервисная компания ->{self.name}'

    class Meta:
        verbose_name = 'Сервисная компания'
        verbose_name_plural = 'Сервисные компании'        