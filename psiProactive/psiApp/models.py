from django.db import models

# Create your models here.

class Proactive(models.Model):
	Tasks = models.CharField(max_length=200)
	Month = models.CharField(max_length=200)
	Date = models.CharField(max_length=200)
	CheckedBy = models.CharField(max_length=200)
	Status = models.CharField(max_length=200)
	Notes = models.CharField(max_length=200)
	Customer_id = models.CharField(max_length=200)
	created_at = models.DateTimeField(auto_now_add=True)
	auto_increment_id = models.AutoField(primary_key=True)

class CustomersName(models.Model):
	customerName = models.CharField(max_length=300)
	auto_increment_id = models.AutoField(primary_key=True)
	created_at = models.DateTimeField(auto_now_add=True)

class Metrics(models.Model):
	machineName = models.CharField(max_length=300)
	Date = models.CharField(max_length=200)
	metricName = models.CharField(max_length=300)
	percentUtilized = models.CharField(max_length=200)
	used = models.CharField(max_length=200)
	total = models.CharField(max_length=200)
	auto_increment_id = models.AutoField(primary_key=True)