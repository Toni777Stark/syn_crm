# Generated by Django 4.2.1 on 2023-07-03 13:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('production_management', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='task',
            name='position',
            field=models.IntegerField(default=1, verbose_name='Позиция'),
            preserve_default=False,
        ),
    ]
