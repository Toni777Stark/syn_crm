from .models import Orders, Products, Clients, Exchanges, Geo, TypeOfNumber, MailType, Emulator
from django import forms


class OrdersForm(forms.Form):
    def __init__(self, *args, **kwargs):
        user = kwargs.pop('user', None)  # Извлекаем пользователя из аргументов, если передан

        super(OrdersForm, self).__init__(*args, **kwargs)

        if user:
            self.generate_fields(user)

    def generate_fields(self, user):
        # Генерация полей для каждой группы комментария, обмена, цены, количества и т.д.
        for i in range(1, 6):
            self.fields[f'comment{i}'] = forms.CharField(
                widget=forms.TextInput(attrs={'placeholder': 'Комментарий'})
            )
            self.fields[f'exchange{i}'] = forms.ModelChoiceField(
                queryset=Exchanges.objects.filter(on=True).order_by('-id'), empty_label='Биржа'
            )
            self.fields[f'price{i}'] = forms.IntegerField(
                widget=forms.widgets.TextInput(attrs={'placeholder': 'Цена', 'type': 'number',
                                                      'oninput': 'onChange__form();'})
            )
            self.fields[f'quantity{i}'] = forms.IntegerField(
                widget=forms.widgets.TextInput(attrs={'placeholder': 'Кол-во', 'type': 'number',
                                                      'oninput': 'onChange__form();'})
            )
            self.fields[f'mail{i}'] = forms.ModelChoiceField(
                queryset=MailType.objects.all(), empty_label='Тип почты'
            )
            self.fields[f'number{i}'] = forms.ModelChoiceField(
                queryset=TypeOfNumber.objects.all(), empty_label='Тип номера'
            )
            self.fields[f'emulator{i}'] = forms.ModelChoiceField(
                queryset=Emulator.objects.all(), empty_label='Эмулятор'
            )
            self.fields[f'geo{i}'] = forms.ModelMultipleChoiceField(
                queryset=Geo.objects.all(), required=False
            )
            self.fields[f'resident{i}'] = forms.ModelChoiceField(
                queryset=Geo.objects.all(), empty_label='Резидент'
            )
        # Поля client, deadline, priority и bundle
        self.fields['client'] = forms.ModelChoiceField(
            queryset=Clients.objects.filter(manager=user), empty_label='Клиент'
        )
        self.fields['deadline'] = forms.DateTimeField(
            widget=forms.DateInput(attrs={'type': 'date'}), label=''
        )
        self.fields['priority'] = forms.ChoiceField(
            choices=[('', 'Приоритет'), ('1', 'Низкий'), ('2', 'Средний'), ('3', 'Высокий')],
            widget=forms.Select
        )
        self.fields['bundle'] = forms.BooleanField(label='Связка')


class ClientsForm(forms.Form):
    name = forms.CharField(widget=forms.TextInput(attrs={'placeholder': 'Ник'}))
    tg = forms.CharField(widget=forms.TextInput(attrs={'placeholder': 'ТГ'}))
    status = forms.ChoiceField(choices=[('', 'Статус'), ('Посредник', 'Посредник'), ('Выпуск карт', 'Выпуск карт'),
                                        ('Арбитражник', 'Арбитражник'), ('Абьюзер', 'Абьюзер'),
                                        ('Потерянный клиент', 'Потерянный клиент'), ('Деберц', 'Деберц'),
                                        ('Не работает', 'Не работает'), ('Отпуск', 'Отпуск')],
                               widget=forms.Select)
    lang = forms.ChoiceField(choices=[('', 'Язык общения'), ('1', 'Рус'), ('2', 'Укр'), ('3', 'Англ')],
                             widget=forms.Select)


class ExchangesForm(forms.Form):
    name = forms.CharField(widget=forms.TextInput(attrs={'placeholder': 'Название'}))
    type = forms.ChoiceField(choices=[('', 'Тип'), ('EU', 'EU'), ('UA', 'UA')])
