<<<<<<< HEAD
from django.shortcuts import render
from .models import Orders


def index(request):
    orders = Orders.objects.all()
    return render(request, 'manager/index.html', {'orders': orders})
=======
from django.shortcuts import render
from .models import Orders


def index(request):
    orders = Orders.objects.all()
    return render(request, 'manager/index.html', {'orders': orders})
>>>>>>> 6fa352acace61a8ccb033ae0bbbbb05130b3e9c0
