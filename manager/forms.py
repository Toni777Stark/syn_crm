from .models import Orders, Products, Clients, Exchanges, Geo, TypeOfNumber, MailType, Emulator
from django import forms


class CustomSelect(forms.Select):
    def __init__(self, attrs=None, choices=()):
        default_attrs = {'multiple': 'multiple', 'data-maximum-selection-length': '2'}
        if attrs:
            default_attrs.update(attrs)
        super().__init__(attrs=default_attrs, choices=choices)


class OrdersForm(forms.Form):
    client = forms.ModelChoiceField(queryset=Clients.objects.all(), empty_label='Клиент', required=False)
    deadline = forms.DateTimeField(widget=forms.DateInput(attrs={'type': 'date'}), label='', required=False)
    priority = forms.ChoiceField(choices=[('', 'Приоритет'), ('1', 'Низкий'), ('2', 'Средний'), ('3', 'Высокий')],
                                      widget=forms.Select, required=False)
    bundle = forms.BooleanField(label='Связка', required=False)

    comment1 = forms.CharField(widget=forms.TextInput(attrs={'placeholder': 'Коментарий'}), required=False)
    exchange1 = forms.ModelChoiceField(queryset=Exchanges.objects.filter(on=True), empty_label='Биржа', required=False)
    price1 = forms.IntegerField(widget=forms.widgets.TextInput(attrs={'placeholder': 'Цена', 'type': 'number',
                                                                      'oninput': 'onChange__form();'}), required=False)
    quantity1 = forms.IntegerField(widget=forms.widgets.TextInput(attrs={'placeholder': 'Кол-во', 'type': 'number',
                                                                      'oninput': 'onChange__form();'}), required=False)
    mail1 = forms.ModelChoiceField(queryset=MailType.objects.all(), empty_label='Тип почты', required=False)
    number1 = forms.ModelChoiceField(queryset=TypeOfNumber.objects.all(), empty_label='Тип номера', required=False)
    emulator1 = forms.ModelChoiceField(queryset=Emulator.objects.all(), empty_label='Эмулятор', required=False)
    geo1 = forms.ModelMultipleChoiceField(queryset=Geo.objects.all(), required=False)
    resident1 = forms.ModelChoiceField(queryset=Geo.objects.all(), empty_label='Резидент', required=False)

    comment2 = forms.CharField(widget=forms.TextInput(attrs={'placeholder': 'Коментарий'}), required=False)
    exchange2 = forms.ModelChoiceField(queryset=Exchanges.objects.all(), empty_label='Биржа', required=False)
    price2 = forms.IntegerField(widget=forms.widgets.TextInput(attrs={'placeholder': 'Цена', 'type': 'number',
                                                                      'oninput': 'onChange__form();'}), required=False)
    quantity2 = forms.IntegerField(widget=forms.widgets.TextInput(attrs={'placeholder': 'Кол-во', 'type': 'number',
                                                                      'oninput': 'onChange__form();'}), required=False)
    mail2 = forms.ModelChoiceField(queryset=MailType.objects.all(), empty_label='Тип почты', required=False)
    number2 = forms.ModelChoiceField(queryset=TypeOfNumber.objects.all(), empty_label='Тип номера', required=False)
    emulator2 = forms.ModelChoiceField(queryset=Emulator.objects.all(), empty_label='Эмулятор', required=False)
    geo2 = forms.ModelMultipleChoiceField(queryset=Geo.objects.all(), widget=CustomSelect, required=False)
    resident2 = forms.ModelChoiceField(queryset=Geo.objects.all(), empty_label='Резидент', required=False)

    comment3 = forms.CharField(widget=forms.TextInput(attrs={'placeholder': 'Коментарий'}), required=False)
    exchange3 = forms.ModelChoiceField(queryset=Exchanges.objects.all(), empty_label='Биржа', required=False)
    price3 = forms.IntegerField(widget=forms.widgets.TextInput(attrs={'placeholder': 'Цена', 'type': 'number',
                                                                      'oninput': 'onChange__form();'}), required=False)
    quantity3 = forms.IntegerField(widget=forms.widgets.TextInput(attrs={'placeholder': 'Кол-во', 'type': 'number',
                                                                      'oninput': 'onChange__form();'}), required=False)
    mail3 = forms.ModelChoiceField(queryset=MailType.objects.all(), empty_label='Тип почты', required=False)
    number3 = forms.ModelChoiceField(queryset=TypeOfNumber.objects.all(), empty_label='Тип номера', required=False)
    emulator3 = forms.ModelChoiceField(queryset=Emulator.objects.all(), empty_label='Эмулятор', required=False)
    geo3 = forms.ModelMultipleChoiceField(queryset=Geo.objects.all(), widget=CustomSelect, required=False)
    resident3 = forms.ModelChoiceField(queryset=Geo.objects.all(), empty_label='Резидент', required=False)

    comment4 = forms.CharField(widget=forms.TextInput(attrs={'placeholder': 'Коментарий'}), required=False)
    exchange4 = forms.ModelChoiceField(queryset=Exchanges.objects.all(), empty_label='Биржа', required=False)
    price4 = forms.IntegerField(widget=forms.widgets.TextInput(attrs={'placeholder': 'Цена', 'type': 'number',
                                                                      'oninput': 'onChange__form();'}), required=False)
    quantity4 = forms.IntegerField(widget=forms.widgets.TextInput(attrs={'placeholder': 'Кол-во', 'type': 'number',
                                                                      'oninput': 'onChange__form();'}), required=False)
    mail4 = forms.ModelChoiceField(queryset=MailType.objects.all(), empty_label='Тип почты', required=False)
    number4 = forms.ModelChoiceField(queryset=TypeOfNumber.objects.all(), empty_label='Тип номера', required=False)
    emulator4 = forms.ModelChoiceField(queryset=Emulator.objects.all(), empty_label='Эмулятор', required=False)
    geo4 = forms.ModelMultipleChoiceField(queryset=Geo.objects.all(), widget=CustomSelect, required=False)
    resident4 = forms.ModelChoiceField(queryset=Geo.objects.all(), empty_label='Резидент', required=False)

    comment5 = forms.CharField(widget=forms.TextInput(attrs={'placeholder': 'Коментарий'}), required=False)
    exchange5 = forms.ModelChoiceField(queryset=Exchanges.objects.all(), empty_label='Биржа', required=False)
    price5 = forms.IntegerField(widget=forms.widgets.TextInput(attrs={'placeholder': 'Цена', 'type': 'number',
                                                                      'oninput': 'onChange__form();'}), required=False)
    quantity5 = forms.IntegerField(widget=forms.widgets.TextInput(attrs={'placeholder': 'Кол-во', 'type': 'number',
                                                                      'oninput': 'onChange__form();'}), required=False)
    mail5 = forms.ModelChoiceField(queryset=MailType.objects.all(), empty_label='Тип почты', required=False)
    number5 = forms.ModelChoiceField(queryset=TypeOfNumber.objects.all(), empty_label='Тип номера', required=False)
    emulator5 = forms.ModelChoiceField(queryset=Emulator.objects.all(), empty_label='Эмулятор', required=False)
    geo5 = forms.ModelMultipleChoiceField(queryset=Geo.objects.all(), widget=CustomSelect, required=False)
    resident5 = forms.ModelChoiceField(queryset=Geo.objects.all(), empty_label='Резидент', required=False)

    # def save(self):
    #     client = self.cleaned_data['client']
    #     deadline = self.cleaned_data['deadline']
    #     priority = self.cleaned_data['priority']
    #     bundle = self.cleaned_data['bundle']
    #     comment1 = self.cleaned_data['comment1']
    #
    #     order = Orders(client=client, deadline=deadline, priority=priority, bundle=bundle)
    #     order.save()
    #
    #     prod = Products(comment=comment1)
    #     prod.save()
