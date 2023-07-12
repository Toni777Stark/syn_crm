from django.db.models.signals import post_save
from django.dispatch import receiver
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from .models import Reg


@receiver(post_save, sender=Reg, weak=False)
def item_saved(sender, instance, created, **kwargs):
    print(f"Signal received for model {sender.__name__}. Instance: {instance}")
    # channel_layer = get_channel_layer()
    # if created:
    #     action = 'created'
    # else:
    #     action = 'updated'
    # async_to_sync(channel_layer.group_send)('item_updates', {
    #     'type': 'item_changed',
    #     'item_id': instance.pk,
    #     'item_name': instance.name,
    #     'action': action
    # })
