# Generated by Django 5.0.1 on 2024-01-31 03:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_excursion_order'),
    ]

    operations = [
        migrations.AlterField(
            model_name='excursion',
            name='price',
            field=models.IntegerField(null=True),
        ),
    ]
