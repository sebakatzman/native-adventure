# Generated by Django 5.0.1 on 2024-05-20 11:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_alter_excursion_price'),
    ]

    operations = [
        migrations.AlterField(
            model_name='card',
            name='firstTitle',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='card',
            name='secondTitle',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='excursion',
            name='price',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]