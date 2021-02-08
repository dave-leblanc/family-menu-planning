from django.shortcuts import render
from rest_framework import viewsets
from .serializers import MenuSerializer, RecipeSerializer, IngredientSerializer
from .models import Menu, Family, Recipe, Ingredient
from datetime import date
from datetime import datetime, timedelta
from django.utils import timezone
import calendar

class BaseMenuView(viewsets.ModelViewSet):
    serializer_class = MenuSerializer

    def get_serializer_context(self):
        return {'request': self.request}
    
class MenuView(BaseMenuView):
    def get_queryset(self):
        family = Family.objects.filter(members=self.request.user)
        return Menu.objects.filter(family__in=family)
    
class MenuTodayView(BaseMenuView):
    def get_queryset(self):
        family = Family.objects.filter(members=self.request.user)  
        return Menu.objects.filter(family__in=family,date=timezone.now())
    
class MenuThisWeekView(BaseMenuView):
    def get_queryset(self):
        day = timezone.now()
        
        start = day - timedelta(days=day.weekday())
        end = start + timedelta(days=6)
        family = Family.objects.filter(members=self.request.user)  
        
        return Menu.objects.filter(family__in=family,date__gte=start,date__lte=end)
    
class MenuThisMonthView(BaseMenuView):
    def get_queryset(self):
        day=date.today()
        _, num_days = calendar.monthrange(day.year, day.month)
        first_day = date(day.year, day.month, 1)
        last_day = date(day.year, day.month, num_days)
        family = Family.objects.filter(members=self.request.user)  
        return Menu.objects.filter(family__in=family,date__gte=first_day,date__lte=last_day)
    
class BaseRecipeView(viewsets.ModelViewSet):
    serializer_class = RecipeSerializer

    def get_serializer_context(self):
        return {'request': self.request}
    
class RecipeView(BaseRecipeView):
    queryset=Recipe.objects.all()
    
class BaseIngredientView(viewsets.ModelViewSet):
    serializer_class = IngredientSerializer

    def get_serializer_context(self):
        return {'request': self.request}
    
class IngredientView(BaseIngredientView):
    queryset=Ingredient.objects.all()