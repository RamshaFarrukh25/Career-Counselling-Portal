# Generated by Django 5.0.1 on 2024-02-01 13:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('career_portal', '0008_alter_counsellor_profile_pic'),
    ]

    operations = [
        migrations.AlterField(
            model_name='counsellor',
            name='profile_pic',
            field=models.TextField(default='Laiba'),
        ),
    ]
