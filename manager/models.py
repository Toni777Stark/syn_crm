from django.db import models
from django.contrib.auth.models import User
from PIL import Image


class Geo(models.Model):
    # Гео
    name = models.CharField('Страна', max_length=250)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Страна"
        verbose_name_plural = "Страны"


class MailType(models.Model):
    # Тип почты
    name = models.CharField('Тип почты', max_length=250)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Тип почты"
        verbose_name_plural = "Тип почт"


class TypeOfNumber(models.Model):
    # Тип номера
    name = models.CharField('Тип номера', max_length=250)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Тип номера"
        verbose_name_plural = "Тип номеров"


class Emulator(models.Model):
    # Эмулятор
    name = models.CharField('Эмулятор', max_length=250)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Эмулятор"
        verbose_name_plural = "Эмуляторы"


class Exchanges(models.Model):
    # Биржы
    name = models.CharField('Название', max_length=50, unique=True)
    exchange_type = models.CharField('Статус', max_length=50)
    on = models.BooleanField('Вкл', default=1)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Биржы"
        verbose_name_plural = "Биржа"


class Clients(models.Model):
    # Клиенты
    name = models.CharField('Имя', max_length=50, unique=True)
    tg = models.CharField('Телеграмм', max_length=200, unique=True)
    language = models.CharField('Язык', max_length=3)
    status = models.CharField('Статус', max_length=50)
    manager = models.ForeignKey(User, on_delete=models.PROTECT, related_name='clients')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Клиент"
        verbose_name_plural = "Клиенты"


class Orders(models.Model):
    # Заказы
    manager = models.ForeignKey(User, on_delete=models.PROTECT, related_name='orders')
    client = models.ForeignKey(Clients, on_delete=models.PROTECT, related_name='clients')
    summ = models.DecimalField('Сумма', max_digits=10, decimal_places=2)
    date = models.DateTimeField('Дата', auto_now_add=True)
    deadline = models.DateTimeField('Срок заказа')
    priority = models.IntegerField('Приоритет', default=3)
    status = models.CharField('Статус', max_length=50, default='Не в работе')
    bundle = models.BooleanField('Связка', default=False)
    order_type = models.CharField('Тип заказа', max_length=50)

    def __str__(self):
        return str(self.id)

    class Meta:
        verbose_name = "Заказ"
        verbose_name_plural = "Заказы"


class Products(models.Model):
    # Товары
    order = models.ForeignKey(Orders, verbose_name='Номер заказа', on_delete=models.CASCADE, related_name='product')
    comment = models.CharField('Коментарий', max_length=250)
    exchange = models.ForeignKey(Exchanges, verbose_name='Биржа', on_delete=models.PROTECT, related_name='exchange_pr',
                                 null=True, blank=True)
    price = models.IntegerField('Цена')
    quantity = models.IntegerField('Количество')
    geo_id = models.ManyToManyField(Geo, verbose_name='Гео', blank=True)
    resident = models.CharField('Резидент', max_length=250)
    mail_type = models.CharField('Тип почты', max_length=250)
    type_of_number = models.CharField('Тип номера', max_length=250)
    emulator = models.CharField('Эмулятор', max_length=250)

    def __str__(self):
        return "Заказ № "+str(self.order)

    class Meta:
        verbose_name = "Товар"
        verbose_name_plural = "Товары"


class AutoSave(models.Model):
    # Автосохранение полей
    manager = models.ForeignKey(User, on_delete=models.PROTECT)
    client = models.ForeignKey(Clients, on_delete=models.PROTECT, null=True, blank=True)
    deadline = models.DateTimeField('Срок заказа', null=True, blank=True)
    priority = models.IntegerField('Приоритет', null=True, blank=True)
    bundle = models.BooleanField('Связка', default=False, null=True, blank=True)
    comment1 = models.CharField('Коментарий', max_length=250, null=True, blank=True)
    exchange1 = models.ForeignKey(Exchanges, verbose_name='Биржа', on_delete=models.PROTECT,
                                 null=True, blank=True, related_name='autosave_exchange1')
    price1 = models.IntegerField('Цена', null=True, blank=True)
    quantity1 = models.IntegerField('Количество', null=True, blank=True)
    geo_id1 = models.ManyToManyField(Geo, related_name='autosave_geo1', verbose_name='Гео', blank=True)
    resident1 = models.CharField('Резидент', max_length=250, null=True, blank=True)
    mail1 = models.CharField('Тип почты', max_length=250, null=True, blank=True)
    number1 = models.CharField('Тип номера', max_length=250, null=True, blank=True)
    emulator1 = models.CharField('Эмулятор', max_length=250, null=True, blank=True)
    comment2 = models.CharField('Коментарий', max_length=250, null=True, blank=True)
    exchange2 = models.ForeignKey(Exchanges, verbose_name='Биржа', on_delete=models.PROTECT,
                                 null=True, blank=True, related_name='autosave_exchange2')
    price2 = models.IntegerField('Цена', null=True, blank=True)
    quantity2 = models.IntegerField('Количество', null=True, blank=True)
    geo_id2 = models.ManyToManyField(Geo, related_name='autosave_geo2', verbose_name='Гео', blank=True)
    resident2 = models.CharField('Резидент', max_length=250, null=True, blank=True)
    mail2 = models.CharField('Тип почты', max_length=250, null=True, blank=True)
    number2 = models.CharField('Тип номера', max_length=250, null=True, blank=True)
    emulator2 = models.CharField('Эмулятор', max_length=250, null=True, blank=True)
    comment3 = models.CharField('Коментарий', max_length=250, null=True, blank=True)
    exchange3 = models.ForeignKey(Exchanges, verbose_name='Биржа', on_delete=models.PROTECT,
                                 null=True, blank=True, related_name='autosave_exchange3')
    price3 = models.IntegerField('Цена', null=True, blank=True)
    quantity3 = models.IntegerField('Количество', null=True, blank=True)
    geo_id3 = models.ManyToManyField(Geo, related_name='autosave_geo3', verbose_name='Гео', blank=True)
    resident3 = models.CharField('Резидент', max_length=250, null=True, blank=True)
    mail3 = models.CharField('Тип почты', max_length=250, null=True, blank=True)
    number3 = models.CharField('Тип номера', max_length=250, null=True, blank=True)
    emulator3 = models.CharField('Эмулятор', max_length=250, null=True, blank=True)
    comment4 = models.CharField('Коментарий', max_length=250, null=True, blank=True)
    exchange4 = models.ForeignKey(Exchanges, verbose_name='Биржа', on_delete=models.PROTECT,
                                 null=True, blank=True, related_name='autosave_exchange4')
    price4 = models.IntegerField('Цена', null=True, blank=True)
    quantity4 = models.IntegerField('Количество', null=True, blank=True)
    geo_id4 = models.ManyToManyField(Geo, related_name='autosave_geo4', verbose_name='Гео', blank=True)
    resident4 = models.CharField('Резидент', max_length=250, null=True, blank=True)
    mail4 = models.CharField('Тип почты', max_length=250, null=True, blank=True)
    number4 = models.CharField('Тип номера', max_length=250, null=True, blank=True)
    emulator4 = models.CharField('Эмулятор', max_length=250, null=True, blank=True)
    comment5 = models.CharField('Коментарий', max_length=250, null=True, blank=True)
    exchange5 = models.ForeignKey(Exchanges, verbose_name='Биржа', on_delete=models.PROTECT,
                                 null=True, blank=True, related_name='autosave_exchange5')
    price5 = models.IntegerField('Цена', null=True, blank=True)
    quantity5 = models.IntegerField('Количество', null=True, blank=True)
    geo_id5 = models.ManyToManyField(Geo, related_name='autosave_geo5', verbose_name='Гео', blank=True)
    resident5 = models.CharField('Резидент', max_length=250, null=True, blank=True)
    mail5 = models.CharField('Тип почты', max_length=250, null=True, blank=True)
    number5 = models.CharField('Тип номера', max_length=250, null=True, blank=True)
    emulator5 = models.CharField('Эмулятор', max_length=250, null=True, blank=True)

    def __str__(self):
        return str(self.manager)

    class Meta:
        verbose_name = "Сохраненная информация"
        verbose_name_plural = "Сохраненная информация"
