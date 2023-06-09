from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.index, name="home"),
    path('refusals', views.refusals, name="refusals"),
    path('refunds', views.refunds, name="refunds"),
]