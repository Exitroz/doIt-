from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    # path('add', views.add, name='add'),
    path('add_item/', views.add_item, name='add_item'),
    # path('update/<int:id>', views.update, name='update'),
    path('update_item/<int:id>', views.update_item, name='update_item'),   
    path('delete_item/<int:id>', views.delete_item, name='delete_item'),
    # path('search_item/', views.search_item, name='search_item'),
]