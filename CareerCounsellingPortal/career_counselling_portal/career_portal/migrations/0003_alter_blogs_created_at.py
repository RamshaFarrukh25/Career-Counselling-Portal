# Generated by Django 5.0.1 on 2024-02-02 04:30

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("career_portal", "0002_remove_acu_confirmpassword"),
    ]

    operations = [
        migrations.AlterField(
            model_name="blogs",
            name="created_at",
            field=models.DateField(auto_now_add=True),
        ),
    ]
