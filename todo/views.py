from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import TaskSerializer
from .models import Task

# Views
@api_view(['GET'])
def home(request):
  shortcuts = {
    'Fuck me': 'Harder',
    'My Balls': 'Are hairy',
    'My Dick': 'Is Hard'
  }

  return Response(shortcuts)

@api_view(['GET'])
def taskList(request):
  tasks = Task.objects.all()
  serializer = TaskSerializer(tasks, many=True)

  return Response(serializer.data)

@api_view(['GET'])
def task(request, id):
  task = Task.objects.get(id = id)
  serializer = TaskSerializer(task, many=False)

  return Response(serializer.data)

@api_view(['POST'])
def new_task(request):
  serializer = TaskSerializer(data=request.data)

  if serializer.is_valid():
    serializer.save()

  return Response({ 'task': serializer.data, 'status': 200 })

@api_view(['PUT'])
def edit_task(request, id):
  task = Task.objects.get(id = id)
  serializer = TaskSerializer(instance=task, data=request.data)

  if serializer.is_valid():
    serializer.save()

  return Response(serializer.data)

@api_view(['DELETE'])
def delete_task(request, id):
  task = Task.objects.filter(id = id) 
  task.delete()

  return Response({ 'status': 200 })