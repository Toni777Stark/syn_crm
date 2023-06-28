from django.forms import model_to_dict
from django.shortcuts import render, get_object_or_404
from .models import Orders, Geo, Exchanges, Clients, Products, AutoSave
from .forms import OrdersForm, ClientsForm, ExchangesForm
from django.core.paginator import Paginator
from django.db.utils import IntegrityError
from django.http import JsonResponse
import json


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
                        print(1)
                        comment = form.cleaned_data[comment_key]
                        exchange = form.cleaned_data[exchange_key]
                        price = form.cleaned_data[price_key]
                        quantity = form.cleaned_data[quantity_key]
                        geo_values = form.cleaned_data.get(geo_key)
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
                            resident=resident,
                            mail_type=mail_type,
                            type_of_number=type_of_number,
                            emulator=emulator
                        )
                        product.save()
                        if geo_values:
                            product.geo_id.set(geo_values)
                AutoSave.objects.filter(manager=user).delete()
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
                    print(client)
                    client.save()
                except IntegrityError:
                    error = 'Клиент с таким TG уже существует.'
        elif 'form_edit_client' in request.POST:
            form = ClientsForm(request.POST)
            if form.is_valid():
                name = form.cleaned_data['name']
                client = get_object_or_404(Clients, name=name)
                client.tg = request.POST.get('tg')
                client.status = form.cleaned_data['status']
                client.language = form.cleaned_data['lang']
                client.save()
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
    # print(order_id)
    orders = Orders.objects.filter(id=order_id).select_related('client')
    products = Products.objects.filter(order__id=order_id).select_related('exchange')

    orders_data = []
    for order in orders:
        bundle_text = 'Связка' if order.bundle == 1 else 'Не связка'
        order_data = {
            'id': order.id,
            'date': order.date,
            'deadline': order.deadline,
            'client': order.client.name,  # Используем поле name модели Client
            'summ': order.summ,
            'status': order.status,
            'bundle': bundle_text,
            'order_type': order.order_type,
        }
        orders_data.append(order_data)

    products_data = []
    for product in products:
        geo_ids = []  # Создаем пустой список для geo_ids
        geos = product.geo_id.all()
        for geo in geos:
            geo_ids.append(geo.name)  # Добавляем название страны в список geo_ids
        geo_ids_str = ', '.join(geo_ids)  # Преобразуем список в строку, объединяя значения через запятую и пробел

        product_data = {
            'id': product.id,
            'order': product.order_id,
            'comment': product.comment,
            'exchange': product.exchange.name,  # Используем поле name модели Exchange
            'price': product.price,
            'quantity': product.quantity,
            'geo_id': geo_ids_str,
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


def save_data(request):
    data = json.loads(request.body)
    # Получение данных из POST-запроса
    field_id = data.get('fieldId')
    field_value = data.get('fieldValue')
    # print(field_id, field_value)
    # Проверка, существует ли запись AutoSave для данного manager
    manager_id = request.user.id
    autosave, created = AutoSave.objects.get_or_create(manager_id=manager_id)
    if not field_value:
        setattr(autosave, field_id, None)
    else:
        # Обновление значения поля в AutoSave
        if field_id == 'client':
            client_instance = Clients.objects.get(id=field_value)
            setattr(autosave, field_id, client_instance)
        elif field_id == 'exchange1':
            exchange1 = Exchanges.objects.get(id=field_value)
            setattr(autosave, field_id, exchange1)
        elif field_id == 'exchange2':
            exchange1 = Exchanges.objects.get(id=field_value)
            setattr(autosave, field_id, exchange1)
        elif field_id == 'exchange3':
            exchange1 = Exchanges.objects.get(id=field_value)
            setattr(autosave, field_id, exchange1)
        elif field_id == 'exchange4':
            exchange1 = Exchanges.objects.get(id=field_value)
            setattr(autosave, field_id, exchange1)
        elif field_id == 'exchange5':
            exchange1 = Exchanges.objects.get(id=field_value)
            setattr(autosave, field_id, exchange1)
        elif field_id == 'geo1':
            geo_instances = Geo.objects.filter(id__in=field_value)
            autosave.geo_id1.set(geo_instances)
        elif field_id == 'geo2':
            geo_instances = Geo.objects.filter(id__in=field_value)
            autosave.geo_id2.set(geo_instances)
        elif field_id == 'geo3':
            geo_instances = Geo.objects.filter(id__in=field_value)
            autosave.geo_id3.set(geo_instances)
        elif field_id == 'geo4':
            geo_instances = Geo.objects.filter(id__in=field_value)
            autosave.geo_id4.set(geo_instances)
        elif field_id == 'geo5':
            geo_instances = Geo.objects.filter(id__in=field_value)
            autosave.geo_id5.set(geo_instances)
        elif field_id == 'bundle':
            pass
        else:
            setattr(autosave, field_id, field_value)
    autosave.save()

    # Возвращение ответа
    return JsonResponse({'success': True})


def edit_client(request):
    data = json.loads(request.body)
    client_id = data.get('client')
    client = get_object_or_404(Clients, id=client_id)
    initial_data = {
        'name': client.name,
        'tg': client.tg,
        'status': client.status,
        'lang': client.language,
    }

    return JsonResponse({'success': True, 'formData': initial_data})


def refusals(request):
    return render(request, 'refusals/index.html')


def refunds(request):
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
                        print(product)
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
    return render(request, 'refunds/index.html', data)


def clients(request):
    return render(request, 'clients/index.html')

def dashboard(request):
    return render(request, 'dashboard/index.html')