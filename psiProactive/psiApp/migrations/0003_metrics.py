# -*- coding: utf-8 -*-
# Generated by Django 1.11.11 on 2018-11-27 17:58
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('psiApp', '0002_auto_20181005_1522'),
    ]

    operations = [
        migrations.CreateModel(
            name='Metrics',
            fields=[
                ('machineName', models.CharField(max_length=300)),
                ('Date', models.CharField(max_length=200)),
                ('metricName', models.CharField(max_length=300)),
                ('percentUtilized', models.CharField(max_length=200)),
                ('used', models.CharField(max_length=200)),
                ('total', models.CharField(max_length=200)),
                ('auto_increment_id', models.AutoField(primary_key=True, serialize=False)),
            ],
        ),
    ]
