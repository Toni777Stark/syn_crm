from django.shortcuts import render
from django.contrib.auth.models import Group, User
from .models import Directions, Task
from manager.models import ExchangeType, Orders, Products
from django.contrib.auth.decorators import user_passes_test


def group_check(user):
    return user.groups.filter(name='Руководитель производства').exists()


def new_registrators():
    group_name = 'Регистраторы'
    group = Group.objects.get(name=group_name)
    group_users = group.user_set.all()
    registrators = group_users.exclude(reg_prog__isnull=False)
    return registrators


@user_passes_test(group_check, login_url='/')
def index(request):
    directions = Directions.objects.all()
    users = User.objects.all()
    tasks = Task.objects.order_by('position')
    exchange_types = ExchangeType.objects.all()
    products = Products.objects.exclude(order__status='Отгружен регистратором')

    processed_orders = []
    for product in products:
        remainder = product.quantity
        tasks_prod = product.tasks.all()
        for task_prod in tasks_prod:
            remainder -= task_prod.quantity
        if remainder > 0:
            product.remainder = remainder
            processed_orders.append(product)
    data = {
        'reg_new': new_registrators,
        'directions': directions,
        'users': users,
        'tasks': tasks,
        'exchange_types': exchange_types,
        'processed_orders': processed_orders
    }
    return render(request, 'production/index.html', data)
