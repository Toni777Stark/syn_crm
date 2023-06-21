from .models import Clients, Exchanges, Geo, TypeOfNumber, MailType, Emulator, AutoSave
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
        autosave = AutoSave.objects.filter(manager=user).first()
        if autosave:
            for i in range(1, 6):
                self.fields[f'comment{i}'].initial = getattr(autosave, f'comment{i}', '')
                self.fields[f'exchange{i}'].initial = getattr(autosave, f'exchange{i}', None)
                self.fields[f'price{i}'].initial = getattr(autosave, f'price{i}', 0)
                self.fields[f'quantity{i}'].initial = getattr(autosave, f'quantity{i}', 0)
                self.fields[f'mail{i}'].initial = getattr(autosave, f'mail{i}', None)
                self.fields[f'number{i}'].initial = getattr(autosave, f'number{i}', None)
                self.fields[f'emulator{i}'].initial = getattr(autosave, f'emulator{i}', None)
                geo_ids = getattr(autosave, f'geo{i}', [])
                geos = Geo.objects.filter(id__in=geo_ids)
                print(geos)
                self.fields[f'geo{i}'].initial = list(geos)
                self.fields[f'resident{i}'].initial = getattr(autosave, f'resident{i}', None)

            self.fields['client'].initial = autosave.client if autosave.client else None
            self.fields['deadline'].initial = autosave.deadline.strftime('%Y-%m-%d') if autosave.deadline else None
            self.fields['priority'].initial = str(autosave.priority) if autosave.priority else ''


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
