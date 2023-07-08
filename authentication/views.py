from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login
from django.shortcuts import render, redirect


def login_view(request):
    if request.method == 'POST':
        url_home = ''
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            if request.user.groups.filter(name='Менеджеры').exists():
                return redirect('/manager/orders')  # Перенаправляем пользователя на главную страницу после успешной аутентификации
            elif request.user.groups.filter(name='Руководитель производства').exists():
                return redirect('/pm/works')  # Перенаправляем пользователя на главную страницу после успешной аутентификации
            else:
                error_message = 'Доступ закрыт'
        else:
            error_message = 'Неправильное имя пользователя или пароль'
    else:
        error_message = ''
    return render(request, 'login.html', {'error_message': error_message})
