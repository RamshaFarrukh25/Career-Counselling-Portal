# Generated by Django 5.0.1 on 2024-02-01 02:07

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('career_portal', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='acu',
            name='confirmPassword',
        ),
    ]
