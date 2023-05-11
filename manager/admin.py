from django.contrib import admin
from .models import Geo
from .models import Exchanges
from .models import Clients
from .models import Orders
from .models import Products


admin.site.register(Geo)
admin.site.register(Exchanges)
admin.site.register(Clients)
admin.site.register(Orders)
admin.site.register(Products)
