from django.db import models
from django.contrib.auth.models import User
from manager.models import Products
from django.db.models.signals import post_save
from django.dispatch import receiver


class Directions(models.Model):
    name = models.CharField('Название', max_length=250)
    id_name = models.CharField('Имя идентификатора', max_length=250)

    def __str__(self):
        return str(self.name)

    class Meta:
        verbose_name = "Отдел"
        verbose_name_plural = "Отделы"


class Reg(models.Model):
    reg = models.ForeignKey(User, on_delete=models.PROTECT, related_name='reg_prog')
    direction = models.ForeignKey(Directions, verbose_name='Отдел', on_delete=models.PROTECT, related_name='reg_directions')
    status = models.CharField('Статус', max_length=250)

    def __str__(self):
        return str(self.reg)

    class Meta:
        verbose_name = "Инфа регистратора"
        verbose_name_plural = "Инфа регистраторов"


class Task(models.Model):
    # Товары
    product = models.ForeignKey(Products, verbose_name='Номер товара', on_delete=models.CASCADE, related_name='tasks')
    reg = models.ForeignKey(User, on_delete=models.PROTECT, related_name='reg_task')
    quantity = models.IntegerField('Количество')
    ready = models.IntegerField('Количество сделанных акков')
    status = models.CharField('Статус', max_length=250)
    position = models.IntegerField('Позиция')

    def __str__(self):
        return str(self.reg)

    class Meta:
        verbose_name = "Товар у регистратора"
        verbose_name_plural = "Товары у регистраторов"
