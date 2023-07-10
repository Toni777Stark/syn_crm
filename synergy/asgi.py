import os
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
import production_management.routing

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'synergy.settings')

application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": AuthMiddlewareStack(
        URLRouter(
            production_management.routing.websocket_urlpatterns
        )
    ),
})
