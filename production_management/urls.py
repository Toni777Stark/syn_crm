from . import views
from django.urls import path, include

urlpatterns = [
    path('works', views.index, name="pm_works"),
]
