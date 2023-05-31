from .models import Orders, Products, Clients, Exchanges
from django import forms


class OrdersForm(forms.Form):
    client = forms.ModelChoiceField(queryset=Clients.objects.all(), empty_label='Клиент')
    deadline = forms.DateTimeField(widget=forms.DateInput(attrs={'type': 'date'}), label='')
    priority = forms.ChoiceField(choices=[('', 'Приоритет'), ('1', 'Низкий'), ('2', 'Средний'), ('3', 'Высокий')],
                                      widget=forms.Select)
    bundle = forms.BooleanField(label='Связка', required=False)
    comment1 = forms.CharField(widget=forms.TextInput(attrs={'placeholder': 'Коментарий'}))
    exchange1 = forms.ModelChoiceField(queryset=Exchanges.objects.all(), empty_label='Биржа')
    price1 = forms.IntegerField(label='Цена')
    quantity1 = forms.IntegerField(label='Количество')

    def save(self):
        client = self.cleaned_data['client']
        deadline = self.cleaned_data['deadline']
        priority = self.cleaned_data['priority']
        bundle = self.cleaned_data['bundle']
        comment1 = self.cleaned_data['comment1']

        order = Orders(client=client, deadline=deadline, priority=priority, bundle=bundle)
        order.save()

        prod = Products(comment=comment1)
        prod.save()
