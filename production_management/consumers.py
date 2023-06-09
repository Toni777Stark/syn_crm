import json
from channels.generic.websocket import AsyncWebsocketConsumer
from .models import Reg, Directions
from asgiref.sync import sync_to_async


class TaskConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.channel_layer.group_add('reg_updates', self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard('reg_updates', self.channel_name)

    async def receive(self, text_data=None, bytes_data=None):
        # Получение JSON-строки от клиента
        json_data = json.loads(text_data)

        # Извлечение данных из JSON-строки
        type_upd = json_data.get("type_upd")
        region_id = json_data.get("region_id")
        manager_id = json_data.get("manager_id")
        if type_upd == "reg_upd":
            await self.update_reg_direction(region_id, manager_id)

    @sync_to_async
    def update_reg_direction(self, region_id, manager_id):
        direction = Directions.objects.get(id_name=region_id)
        reg = Reg.objects.get(pk=manager_id)
        reg.direction = direction
        reg.save()


    async def reg_upd(self, event):
        print(event)
        type_upd = event['type']
        reg_id = event['reg_id']
        direction_mane = event['direction_mane']
        action = event['action']
        await self.send(text_data=json.dumps({'type_upd': type_upd, 'reg_id': reg_id, 'direction_mane': direction_mane,
                                              'action': action}))
