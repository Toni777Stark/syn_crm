from django.shortcuts import render
from .models import Orders
from .models import Geo
from .models import Exchanges
from .models import Clients


def index(request):
    orders = Orders.objects.all()
    geos = Geo.objects.all()
    exchanges = Exchanges.objects.all()
    clients = Clients.objects.all()
    data = {
        'orders': orders,
        'geos': geos,
        'exchanges': exchanges,
        'clients': clients
    }
    return render(request, 'manager/index.html', data)


def manager_test(request):
    return render(request, 'manager-test/index.html')
