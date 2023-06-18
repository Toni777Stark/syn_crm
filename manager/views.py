from django.shortcuts import render
from .models import Orders, Geo, Exchanges, Clients, Products
from .forms import OrdersForm
from django.core.paginator import Paginator


def index(request):
    error = ''
    if request.method == 'POST':
        form = OrdersForm(request.POST)
        if form.is_valid():
            manager = request.user
            client = form.cleaned_data['client']
            summ = request.POST.get('summ')
            deadline = form.cleaned_data['deadline']
            priority = form.cleaned_data['priority']
            bundle = form.cleaned_data['bundle']
            order = Orders(manager=manager, client=client, summ=summ, deadline=deadline, priority=priority,
                           bundle=bundle, order_type="Дежурному отгрузить со склада")
            order.save()
            order_id = order.pk
            if form.cleaned_data['exchange1'] is not None:
                comment1 = form.cleaned_data['comment1']
                exchange1 = form.cleaned_data['exchange1']
                price1 = form.cleaned_data['price1']
                quantity1 = form.cleaned_data['quantity1']
                geo1 = form.cleaned_data['geo1']
                resident1 = form.cleaned_data['resident1']
                mail_type1 = form.cleaned_data['mail1']
                type_of_number1 = form.cleaned_data['number1']
                emulator1 = form.cleaned_data['emulator1']
                for value in geo1:
                    print(value)
                # product1 = Products(order=order, comment=comment1, exchange=exchange1, price=price1, quantity=quantity1,
                #                     geo_id=geo1, resident=resident1, mail_type=mail_type1, type_of_number=type_of_number1,
                #                     emulator=emulator1)
                # product1.save()
                print(manager, client, comment1, geo1, resident1)
        else:
            error = 'Не верно заполнил'
            print(error)
            for field, errors in form.errors.items():
                for error in errors:
                    print(f"Ошибка в поле '{field}': {error}")

    orders = Orders.objects.all()
    geos = Geo.objects.all()
    exchanges = Exchanges.objects.all()
    clients = Clients.objects.all()
    form = OrdersForm()

    paginator = Paginator(clients, 6)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    data = {
        'orders': orders,
        'geos': geos,
        'exchanges': exchanges,
        'clients': clients,
        'form': form,
        'page_obj': page_obj,
        'page_max_page': paginator.num_pages,

        'error': error,
    }
    return render(request, 'manager/index.html', data)


def refusals(request):
    return render(request, 'refusals/index.html')


def refunds(request):
    return render(request, 'refunds/index.html')
