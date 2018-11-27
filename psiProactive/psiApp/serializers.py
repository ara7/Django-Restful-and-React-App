from rest_framework import serializers
from psiApp.models import Proactive,CustomersName,Metrics

class LogSerializer(serializers.ModelSerializer):
	class Meta:
		model = Proactive
		fields = (
			'Customer_id',
			'Tasks',
			'Month',
			'Date',
			'CheckedBy',
			'Status',
			'Notes'
		)

class CustSerializer(serializers.ModelSerializer):
	class Meta:
		model = CustomersName
		fields = '__all__'

class TasksSerializer(serializers.ModelSerializer):
	class Meta:
		model = Proactive
		fields = '__all__'

class MetricSerializer(serializers.ModelSerializer):
	class Meta:
		model = Metrics
		fields = '__all__'
