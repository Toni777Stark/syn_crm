# Generated by Django 4.2.1 on 2023-05-31 12:48

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('manager', '0010_products_emulator'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='orders',
            name='comment',
        ),
        migrations.RemoveField(
            model_name='orders',
            name='payment_type',
        ),
        migrations.RemoveField(
            model_name='orders',
            name='proof',
        ),
    ]
