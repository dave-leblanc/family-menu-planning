from django.db.models.fields import IntegerField
from rest_framework import serializers
from rest_framework.fields import DictField
from .models import RecipeIngredients, Ingredient, Menu, Recipe

class IngredientSerializer(serializers.ModelSerializer):
  class Meta:
    model = Ingredient
    fields = ('id', 'ingredient')

class RecipeSerializer(serializers.ModelSerializer):
  class Meta:
    model = Recipe
    fields = ('id', 'recipe', 'date', 'meal_time', 'created_by', 'modified_by')


class RecipeIngredientsSerializer(serializers.ModelSerializer):
  ingredient = IngredientSerializer()
  recipe = RecipeSerializer()
  class Meta:
    model = RecipeIngredients
    fields = ('id', 'recipe','ingredient','amount','optional','alternatives','prep_instructions')

class MenuSerializer(serializers.ModelSerializer):
  recipe = RecipeSerializer()
class Meta:
    model = Menu
    fields = ('id', 'recipe', 'date', 'meal_time', 'created_by', 'modified_by')