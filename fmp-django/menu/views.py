from django.shortcuts import render
from rest_framework import viewsets
from .serializers import MenuSerializer
from .models import Menu, Family


class MenuView(viewsets.ModelViewSet):
    serializer_class = MenuSerializer
    
    
    def get_queryset(self):
        family = Family.objects.filter(members=self.request.user)  
        return Menu.objects.filter(family__in=family)

    def get_serializer_context(self):
        return {'request': self.request}
