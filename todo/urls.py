from django.urls import path
from . import views

urlpatterns = [
  path('', views.home, name='todo-home'),
  path('tasks/', views.taskList, name='todo-list'),
  path('task/<int:id>/', views.task, name='todo-task'),
  path('edit-task/<int:id>/', views.edit_task, name='todo-edit-task'),
  path('delete-task/<int:id>/', views.delete_task, name='todo-delete-task'),
  path('new-task/', views.new_task, name='todo-new-task'),
]