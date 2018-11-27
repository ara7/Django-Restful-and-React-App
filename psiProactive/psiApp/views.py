'''
Class Based Views for the application.
@author: Ara Lena <aralena7@gmail.com>
'''

#from django.shortcuts import render
from psiApp.models import Proactive,CustomersName,Metrics
from django.db.models import Q
from psiApp.serializers import LogSerializer,CustSerializer, TasksSerializer, MetricSerializer
from rest_framework import generics
import datetime
import json
from django.http import JsonResponse


class ListView(generics.ListCreateAPIView):
	def req_valid(request):
		val = request.GET.get('customer_id', None)
		queryset = Proactive.objects.filter(Customer_id=val).values(
			'Tasks','Month','Date','CheckedBy','Status','Notes', 'auto_increment_id'
			).order_by('auto_increment_id')
		return JsonResponse({"returndata": list(queryset)})


class CustomerView(generics.ListCreateAPIView):
	queryset = CustomersName.objects.all()
	serializer_class = CustSerializer


class NewInformation(generics.ListCreateAPIView):
	def newInfo(request):
		add_task = request.GET.get('task', None)
		add_month = request.GET.get('month', None)
		add_date = request.GET.get('date', None)
		add_checked_by = request.GET.get('checkedBy', None)
		add_status = request.GET.get('status', None)
		add_notes = request.GET.get('notes', None)
		add_customer_id = request.GET.get('customer_id')
		added = Proactive.objects.create(
											Tasks=add_task,
											Month=add_month,
											Date=add_date,
											CheckedBy=add_checked_by,
											Status=add_status,
											Notes=add_notes,
											Customer_id=add_customer_id)
		added.save()
		queryset = Proactive.objects.filter(Customer_id=add_customer_id).values('Tasks','Month','Date','CheckedBy','Status','Notes', 'auto_increment_id')
		return JsonResponse({'returndata': list(queryset)})


class RemoveInformation(generics.ListCreateAPIView):
	def removeInfo(request):
		customer_id = request.GET.get('customer_id', None)
		row_id = request.GET.get('row_id', None)
		Proactive.objects.filter(auto_increment_id=row_id).delete()
		queryset = Proactive.objects.filter(Customer_id=customer_id).values('Tasks','Month','Date','CheckedBy','Status','Notes', 'auto_increment_id')
		return JsonResponse({'returndata': list(queryset)})

class Tasks(generics.ListCreateAPIView):
	def unique_tasks(request):
		customer_id = request.GET.get('customer_id', None)
		queryset = list(set(x[0] for x in Proactive.objects.all().values_list('Tasks').distinct()[:]))
		return JsonResponse({'returndata': queryset})


class Filter(generics.ListCreateAPIView):
	def filter_function(request):
		customer_id = request.GET.get('customer_id', None)
		start_month = request.GET.get('start_date', None)
		end_month = request.GET.get('end_date', None)
		task = request.GET.get('task', None)
		start_month_1 = int(start_month)
		end_month_1 = int(end_month)
		start_date_filter = datetime.date(2018, start_month_1, 1)
		end_date_filter = datetime.date(2018, end_month_1, 28)
		queryset = Proactive.objects.filter(
			Q(Tasks=task) & Q(Customer_id=customer_id) & Q(Date__range=(start_date_filter, end_date_filter))
				).values('Tasks','Month','Date','CheckedBy','Status','Notes', 'auto_increment_id')
		return JsonResponse({'returndata': list(queryset)})

class Clear(generics.ListCreateAPIView):
	def clear_function(request):
		customer_id = request.GET.get('customer_id', None)
		queryset = Proactive.objects.filter(Customer_id=customer_id).values('Tasks','Month','Date','CheckedBy','Status','Notes', 'auto_increment_id')
		return JsonResponse({'returndata': list(queryset)})

class Metrics(generics.ListCreateAPIView):
	queryset = Metrics.objects.all()
	serializer_class = MetricSerializer