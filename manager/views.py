from django.shortcuts import render
from .models import Orders


def index(request):
    orders = Orders.objects.all()
    return render(request, 'manager/index.html', {'orders': orders})
