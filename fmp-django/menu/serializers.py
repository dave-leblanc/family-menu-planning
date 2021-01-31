from rest_framework import serializers
from .models import Family, Ingredient, Menu, Recipe

class MenuSerializer(serializers.ModelSerializer):
  recipe_name = serializers.CharField(source='recipe.name')
  class Meta:
    model = Menu
    fields = ('id', 'recipe_name', 'date', 'meal_time')