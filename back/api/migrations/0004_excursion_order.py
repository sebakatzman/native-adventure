# Generated by Django 5.0.1 on 2024-01-31 03:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_section_order'),
    ]

    operations = [
        migrations.AddField(
            model_name='excursion',
            name='order',
            field=models.PositiveIntegerField(null=True),
        ),
    ]
