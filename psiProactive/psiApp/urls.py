from django.conf.urls import url
from . import views

urlpatterns = [
	url(r'^api/psiApp', views.ListView.req_valid, name='req_valid'),
	url(r'^customer/psiApp', views.CustomerView.as_view() ),
	url(r'^newInfo/psiApp', views.NewInformation.newInfo, name='newInfo'),
	url(r'^remove/psiApp', views.RemoveInformation.removeInfo, name='removeInfo'),
	url(r'^tasks/psiApp', views.Tasks.unique_tasks, name='unique_tasks'),
	url(r'^filter/psiapp', views.Filter.filter_function, name='filter_function'),
	url(r'^clearfilter/psiapp', views.Clear.clear_function, name='clear_function'),
	url(r'metrics/psiApp', views.Metrics.as_view() )
]
