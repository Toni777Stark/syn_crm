# Generated by Django 4.2.1 on 2023-07-03 11:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('manager', '0024_alter_autosave_geo_id1_remove_autosave_geo_id2_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='ExchangeType',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50, unique=True, verbose_name='Название')),
            ],
            options={
                'verbose_name': 'Тип бирж',
                'verbose_name_plural': 'Тип биржи',
            },
        ),
    ]
