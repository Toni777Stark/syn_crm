# Generated by Django 4.2.1 on 2023-06-21 13:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('manager', '0022_rename_mail_type1_autosave_mail1_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='autosave',
            name='geo_id1',
        ),
        migrations.AddField(
            model_name='autosave',
            name='geo_id1',
            field=models.ManyToManyField(blank=True, to='manager.geo', verbose_name='Гео'),
        ),
    ]
