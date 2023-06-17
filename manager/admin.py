from django.contrib import admin
from .models import Geo, Exchanges, Clients, Orders, Products, MailType, TypeOfNumber, Emulator


admin.site.register(Geo)
admin.site.register(Exchanges)
admin.site.register(Clients)
admin.site.register(Orders)
admin.site.register(Products)
admin.site.register(MailType)
admin.site.register(TypeOfNumber)
admin.site.register(Emulator)
