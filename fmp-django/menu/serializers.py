from rest_framework import serializers
from .models import Family, Ingredient, Menu, Recipe

class MenuSerializer(serializers.ModelSerializer):
  class Meta:
    model = Menu
    fields = ('id', 'recipe', 'date', 'meal_time')