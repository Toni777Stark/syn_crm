from django.shortcuts import render

def index(request):
    data = {
        'user_id': 1,
        'user_nickname': "Лука", #{% firstof user.get_short_name user.get_username %}
        'user_status': "Воркер+",
        'user_orders': 14,
        'user_completed_orders': 10,
    }
    return render(request, 'user_profile/index.html', data)
