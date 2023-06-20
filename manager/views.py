from django.shortcuts import render
from .models import Orders, Geo, Exchanges, Clients, Products
from .forms import OrdersForm, ClientsForm, ExchangesForm
from django.core.paginator import Paginator
from django.db.utils import IntegrityError
from django.http import JsonResponse
import json
from django.core import serializers


def index(request):
    error = ''
    user = request.user
    if request.method == 'POST':
        if 'form_orders' in request.POST:
            form = OrdersForm(request.POST, user=user)
            if form.is_valid():
                manager = user
                client = form.cleaned_data['client']
                summ = request.POST.get('summ')
                deadline = form.cleaned_data['deadline']
                priority = form.cleaned_data['priority']
                bundle = form.cleaned_data['bundle']
                order = Orders(manager=manager, client=client, summ=summ, deadline=deadline, priority=priority,
                               bundle=bundle, order_type="Дежурному отгрузить со склада")
                order.save()
                for i in range(1, 6):
                    exchange_key = 'exchange{}'.format(i)
                    comment_key = 'comment{}'.format(i)
                    price_key = 'price{}'.format(i)
                    quantity_key = 'quantity{}'.format(i)
                    geo_key = 'geo{}'.format(i)
                    resident_key = 'resident{}'.format(i)
                    mail_type_key = 'mail{}'.format(i)
                    number_key = 'number{}'.format(i)
                    emulator_key = 'emulator{}'.format(i)

                    if form.cleaned_data[exchange_key] is not None:
                        comment = form.cleaned_data[comment_key]
                        exchange = form.cleaned_data[exchange_key]
                        price = form.cleaned_data[price_key]
                        quantity = form.cleaned_data[quantity_key]
                        geo_values = form.cleaned_data.get(geo_key)
                        geo = ', '.join(str(value) for value in geo_values) if geo_values else None
                        resident = form.cleaned_data[resident_key]
                        mail_type = form.cleaned_data[mail_type_key]
                        type_of_number = form.cleaned_data[number_key]
                        emulator = form.cleaned_data[emulator_key]

                        product = Products(
                            order=order,
                            comment=comment,
                            exchange=exchange,
                            price=price,
                            quantity=quantity,
                            geo_id=geo,
                            resident=resident,
                            mail_type=mail_type,
                            type_of_number=type_of_number,
                            emulator=emulator
                        )
                        product.save()
        elif 'form_client' in request.POST:
            form = ClientsForm(request.POST)
            if form.is_valid():
                try:
                    manager = request.user
                    name = form.cleaned_data['name']
                    tg = request.POST.get('tg')
                    status = form.cleaned_data['status']
                    lang = form.cleaned_data['lang']
                    client = Clients(name=name, tg=tg, language=lang, status=status, manager=manager)
                    client.save()
                except IntegrityError:
                    error = 'Клиент с таким TG уже существует.'
        elif 'form_exchanges' in request.POST:
            form = ExchangesForm(request.POST)
            if form.is_valid():
                try:
                    name = form.cleaned_data['name']
                    exchange_type = form.cleaned_data['type']
                    exchange = Exchanges(name=name, exchange_type=exchange_type, on='1')
                    exchange.save()
                except IntegrityError:
                    error = 'Такая биржа уже есть'
    orders = Orders.objects.filter(manager=user).order_by('-id')
    geos = Geo.objects.all()
    exchanges = Exchanges.objects.all()
    clients = Clients.objects.all()
    form = OrdersForm(user=user)
    form_client = ClientsForm()
    form_exchanges = ExchangesForm()
    paginator = Paginator(orders, 20)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    data = {
        'orders': orders,
        'geos': geos,
        'exchanges': exchanges,
        'clients': clients,
        'form': form,
        'form_client': form_client,
        'form_exchanges': form_exchanges,
        'page_obj': page_obj,
        'page_max_page': paginator.num_pages,
        'error': error,
    }
    return render(request, 'manager/index.html', data)


def info_order(request):
    data = json.loads(request.body)
    order_id = data.get('orderId')

    orders = Orders.objects.filter(id=order_id).select_related('client')
    products = Products.objects.filter(order__id=order_id).select_related('exchange')

    orders_data = []
    for order in orders:
        order_data = {
            'id': order.id,
            'date': order.date,
            'deadline': order.deadline,
            'client': order.client.name,  # Используем поле name модели Client
            'summ': order.summ,
            'status': order.status,
        }
        orders_data.append(order_data)

    products_data = []
    for product in products:
        product_data = {
            'id': product.id,
            'order': product.order_id,
            'comment': product.comment,
            'exchange': product.exchange.name,  # Используем поле name модели Exchange
            'price': product.price,
            'quantity': product.quantity,
            'geo_id': product.geo_id,
            'resident': product.resident,
            'mail_type': product.mail_type,
            'type_of_number': product.type_of_number,
            'emulator': product.emulator,
        }
        products_data.append(product_data)

    response = {
        'orders': orders_data,
        'products': products_data
    }

    return JsonResponse(response)


def refusals(request):
    return render(request, 'refusals/index.html')


def refunds(request):
    return render(request, 'refunds/index.html')
