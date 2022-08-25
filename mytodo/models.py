from django.db import models

class TodoItem(models.Model):
    title = models.CharField(max_length=100)
    detail = models.CharField(max_length=255)
    todo_date = models.DateField()
    
    def __str__(self):
        return self.title
    class Meta:
        ordering = ['todo_date']
        
        
class Person(models.Model):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=40)
    email = models.EmailField(verbose_name ='e-mail')
    address = models.CharField(blank=True, max_length=70)
    date_of_birth = models.DateField(blank=True)
    phone = models.IntegerField()
    todos = models.ManyToManyField(TodoItem, blank=True)
    
    def __str__(self):
        return u'%s %s' % (self.first_name, self.last_name)
    

# Create your models here.
