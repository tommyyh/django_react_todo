from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import TodoSerializer
from .models import Todo

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
  tasks = Todo.objects.all()
  serializer = TodoSerializer(tasks, many=True)

  return Response(serializer.data)

@api_view(['GET'])
def task(request, id):
  task = Todo.objects.get(id = id)
  serializer = TodoSerializer(task, many=False)

  return Response(serializer.data)

@api_view(['POST'])
def new_task(request):
  serializer = TodoSerializer(data=request.data)

  if serializer.is_valid():
    serializer.save()

  return Response(serializer.data)

@api_view(['PUT'])
def edit_task(request, id):
  task = Todo.objects.get(id = id)
  serializer = TodoSerializer(instance=task, data=request.data)

  if serializer.is_valid():
    serializer.save()

  return Response(serializer.data)

@api_view(['DELETE'])
def delete_task(request, id):
  task = Todo.objects.filter(id = id) 
  task.delete()

  return Response('Successfully deleted')