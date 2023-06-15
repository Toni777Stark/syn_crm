from django.shortcuts import render
from .models import Orders
from .models import Geo
from .models import Exchanges
from .models import Clients
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
            # order.save()
            # order_id = order.pk
            comment1 = form.cleaned_data['comment1']
            exchange1 = form.cleaned_data['exchange1']
            price1 = form.cleaned_data['price1']
            quantity1 = form.cleaned_data['quantity1']
            geo1 = form.cleaned_data['geo1']
            resident1 = form.cleaned_data['resident1']
            mail_type1 = form.cleaned_data['mail_type1']
            type_of_number1 = form.cleaned_data['type_of_number1']
            emulator1 = form.cleaned_data['emulator1']
            print(manager, client, comment1)
        else:
            error = 'Не верно заполнил'

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
