from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.template import loader
from django.urls import reverse
import datetime
from mytodo.models import TodoItem
from django.db.models import Q

# Create your views here.
def home(request):
    q = request.GET.get('q') if request.GET.get('q') != None else ''
    
    
    todo = TodoItem.objects.filter(Q(title__icontains=q) | Q(detail__icontains=q))
    context = {'todo': todo}
    return render(request, 'index.html', context)

# def add(request):
#     return render(request, 'add_todo.html')

# Initial single page search view 
# def search_item(request):
#     errors = []   
#     if 'q' in request.GET:
#         q = request.GET['q']
#         if not q:
#             error = True
#             errors.append('Enter a search keyword.')
#         else:
#             items = TodoItem.objects.filter(title__icontains=q)
#             if items:
#                 return render(request, 'index.html', {'items':items})
#             else:
#                 errors.append("No match found!")
#                 return render(request, 'index.html', {'errors': errors})
#     # print(errors)
#     return render(request, 'index.html', {'errors': errors})

def add_item(request):
    errors = []
    if request.method == 'POST':
        x = request.POST['t']
        y = request.POST['d']
        z = request.POST['da']
        if not x:
            error = True
            errors.append("Please enter a title")
        elif not y:
            error = True
            errors.append("Please enter a task")
        elif not z:
            error = True
            errors.append("Please enter the date")
        else:
            todo = TodoItem(title=x, detail=y, todo_date=z)
            todo.save()
            return HttpResponseRedirect(reverse('home'))
    return render(request, 'add_todo.html', {'errors': errors})
    
# def update(request, id):
#     myTodo = TodoItem.objects.get(id=id)
#     return render(request, 'update_item.html', {'myTodo': myTodo})

def update_item(request, id):
    errors = []
    if request.POST:
        title = request.POST['ti']
        detail = request.POST['det']
        date = request.POST['dat']
        if not title:
            error = True
            errors.append("Please kindly enter a title")
        elif not detail:
            error = True
            errors.append("Please kindly enter a task")
        elif not date:
            error = True
            errors.append("Please kindly enter a date")
        else:
            item = TodoItem.objects.get(id=id)
            item.title = title
            item.detail = detail
            item.date = date
            item.save()
            return HttpResponseRedirect(reverse('home'))
    
    myTodo = TodoItem.objects.get(id=id)
    Context = {
        'myTodo': myTodo,
        'errors': errors
    }
    return render(request, 'update_item.html', Context)

def delete_item(request, id):
    item = TodoItem.objects.get(id=id)
    item.delete()
    return HttpResponseRedirect(reverse('home'))


