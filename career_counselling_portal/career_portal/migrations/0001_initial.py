# Generated by Django 5.0.1 on 2024-01-28 10:53

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='ACU',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.TextField()),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('password', models.TextField()),
                ('confirmPassword', models.TextField()),
                ('role', models.CharField(default='U', max_length=1)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Counsellor',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('phone_no', models.TextField()),
                ('gender', models.CharField(default='Male', max_length=6)),
                ('cnic', models.CharField(max_length=15)),
                ('cnic_front_img', models.TextField()),
                ('cninc_back_img', models.TextField()),
                ('field_of_study', models.TextField()),
                ('is_approved', models.BooleanField(default=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('counsellor_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='career_portal.acu')),
            ],
        ),
        migrations.CreateModel(
            name='Qualification',
            fields=[
                ('counsellor_id', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='career_portal.counsellor')),
                ('name', models.TextField()),
                ('transcript_img', models.TextField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Blogs',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.TextField()),
                ('author_name', models.TextField()),
                ('area_of_field', models.TextField()),
                ('description', models.TextField()),
                ('cover_image', models.TextField()),
                ('is_approved', models.BooleanField(default=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('counsellor_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='career_portal.counsellor')),
            ],
        ),
        migrations.CreateModel(
            name='Ratings',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('rating', models.IntegerField()),
                ('review_description', models.TextField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('counsellor_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='career_portal.counsellor')),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='career_portal.acu')),
            ],
        ),
        migrations.CreateModel(
            name='Reviews',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('reviewer_name', models.TextField()),
                ('reviewer_email', models.EmailField(max_length=254, unique=True)),
                ('reviewer_description', models.TextField()),
                ('is_approved', models.BooleanField(default=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='career_portal.acu')),
            ],
        ),
        migrations.CreateModel(
            name='WorkingExperience',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('institute_name', models.TextField()),
                ('starting_date', models.DateTimeField()),
                ('ending_date', models.DateTimeField()),
                ('certificates_image', models.TextField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('counsellor_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='career_portal.counsellor')),
            ],
        ),
    ]
