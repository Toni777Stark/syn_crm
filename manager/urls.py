from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.index, name="home"),
    path('info_order/', views.info_order, name="info_order"),
    path('save-data/', views.save_data, name="save_data"),
    path('refusals', views.refusals, name="refusals"),
    path('refunds', views.refunds, name="refunds"),
]