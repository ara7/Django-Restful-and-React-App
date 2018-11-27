import requests
import datetime

login_url = "http://trw712.psiindy.local/SASLogon"
#http://trw712.psiindy.local/SASStoredProcess/do?_username=sasinstall&_password=dHJ3NzEy&_action=form,properties,execute,nobanner,newwindow&_program=%2FFAK%2FDataMacro

service = "http://trw712.psiindy.local/SASStoredProcess/do"
username="sasinstall"
password="dHJ3NzEy"

s = requests.session()
r = s.post(login_url, data={'username': username, 'password': password})

#r = s.post(service+_action=form,properties,execute,nobanner,newwindow&_program=%2FFAK%2FDataMacro)