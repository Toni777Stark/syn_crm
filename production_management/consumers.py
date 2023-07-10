from channels.generic.websocket import AsyncJsonWebsocketConsumer


class YourConsumer(AsyncJsonWebsocketConsumer):
    async def connect(self):
        await self.accept()
        await self.channel_layer.group_add(
            "group_name",  # Change this to a relevant name.
            self.channel_name
        )

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            "group_name",  # Change this to a relevant name.
            self.channel_name
        )

    async def receive_json(self, content):
        # Handle your message here.
        pass

    async def send_data(self, event):
        # This is called when data is sent via self.channel_layer.group_send()
        await self.send_json(event["text"])
