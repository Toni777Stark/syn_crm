from django.urls import path, include
from . import views

urlpatterns = [
    path('orders', views.index, name="home"),
    path('men/info_order/', views.info_order, name="info_order"),
    path('men/save-data/', views.save_data, name="save_data"),
    path('men/edit-client/', views.edit_client, name="edit_client"),
    path('refunds', views.refunds, name="refunds"),
    path('clients', views.clients, name="clients"),
    path('dashboard', views.dashboard, name="dashboard"),
]