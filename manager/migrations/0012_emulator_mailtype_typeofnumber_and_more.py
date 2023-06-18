# Generated by Django 4.2.1 on 2023-06-17 15:07

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('manager', '0011_remove_orders_comment_remove_orders_payment_type_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Emulator',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=250, verbose_name='Эмулятор')),
            ],
            options={
                'verbose_name': 'Эмулятор',
                'verbose_name_plural': 'Эмуляторы',
            },
        ),
        migrations.CreateModel(
            name='MailType',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=250, verbose_name='Тип почты')),
            ],
            options={
                'verbose_name': 'Тип почты',
                'verbose_name_plural': 'Тип почт',
            },
        ),
        migrations.CreateModel(
            name='TypeOfNumber',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=250, verbose_name='Тип номера')),
            ],
            options={
                'verbose_name': 'Тип номера',
                'verbose_name_plural': 'Тип номеров',
            },
        ),
        migrations.RemoveField(
            model_name='products',
            name='emulator',
        ),
        migrations.RemoveField(
            model_name='products',
            name='geo',
        ),
        migrations.AddField(
            model_name='products',
            name='geo_id',
            field=models.CharField(default=1, max_length=250, verbose_name='Гео'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='products',
            name='exchange',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='manager.exchanges', verbose_name='Биржа'),
        ),
    ]
