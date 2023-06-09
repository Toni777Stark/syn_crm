# Generated by Django 4.2.1 on 2023-06-21 13:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('manager', '0023_remove_autosave_geo_id1_autosave_geo_id1'),
    ]

    operations = [
        migrations.AlterField(
            model_name='autosave',
            name='geo_id1',
            field=models.ManyToManyField(blank=True, related_name='autosave_geo1', to='manager.geo', verbose_name='Гео'),
        ),
        migrations.RemoveField(
            model_name='autosave',
            name='geo_id2',
        ),
        migrations.RemoveField(
            model_name='autosave',
            name='geo_id3',
        ),
        migrations.RemoveField(
            model_name='autosave',
            name='geo_id4',
        ),
        migrations.RemoveField(
            model_name='autosave',
            name='geo_id5',
        ),
        migrations.RemoveField(
            model_name='products',
            name='geo_id',
        ),
        migrations.AddField(
            model_name='autosave',
            name='geo_id2',
            field=models.ManyToManyField(blank=True, related_name='autosave_geo2', to='manager.geo', verbose_name='Гео'),
        ),
        migrations.AddField(
            model_name='autosave',
            name='geo_id3',
            field=models.ManyToManyField(blank=True, related_name='autosave_geo3', to='manager.geo', verbose_name='Гео'),
        ),
        migrations.AddField(
            model_name='autosave',
            name='geo_id4',
            field=models.ManyToManyField(blank=True, related_name='autosave_geo4', to='manager.geo', verbose_name='Гео'),
        ),
        migrations.AddField(
            model_name='autosave',
            name='geo_id5',
            field=models.ManyToManyField(blank=True, related_name='autosave_geo5', to='manager.geo', verbose_name='Гео'),
        ),
        migrations.AddField(
            model_name='products',
            name='geo_id',
            field=models.ManyToManyField(blank=True, to='manager.geo', verbose_name='Гео'),
        ),
    ]
