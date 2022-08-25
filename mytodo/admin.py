from django.contrib import admin
from .models import TodoItem, Person

class TodoItemAdmin(admin.ModelAdmin):
    list_display = ('title', 'detail', 'todo_date')
    ordering = ('-todo_date',)
    
class PersonAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'email')   
    
     
admin.site.register(TodoItem, TodoItemAdmin)
admin.site.register(Person, PersonAdmin)
# Register your models here.
