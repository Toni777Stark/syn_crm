# Generated by Django 4.2.1 on 2023-06-21 12:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('manager', '0019_alter_autosave_client_alter_autosave_deadline_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='autosave',
            name='bundle',
            field=models.BooleanField(default=False, verbose_name='Связка'),
        ),
    ]
