import json
from channels.generic.websocket import AsyncWebsocketConsumer
from .models import Reg


class TaskConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.channel_layer.group_add('item_updates', self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard('item_updates', self.channel_name)

    async def receive(self, text_data=None, bytes_data=None):
        pass

    async def item_changed(self, event):
        print(event)
        item_id = event['item_id']
        item_name = event['item_name']
        await self.send(text_data=json.dumps({'item_id': item_id, 'item_name': item_name}))
