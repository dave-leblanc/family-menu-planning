from django.db.models.fields import IntegerField
from rest_framework import serializers
from rest_framework.fields import DictField
from .models import RecipeIngredients, Ingredient, Menu, Recipe


class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = ('pk', 'ingredient')


class RecipeIngredientsSerializer(serializers.ModelSerializer):
    ingredient_name = serializers.ReadOnlyField(source='ingredient.name')

    class Meta:
        model = RecipeIngredients
        fields = ( 'ingredient_name', 'amount', 'optional',
                  'alternatives', 'prep_instructions')


class RecipeSerializer(serializers.ModelSerializer):
    ingredients = RecipeIngredientsSerializer(source='recipeingredients_set',many=True)

    class Meta:
        model = Recipe
        fields = ('id', 'name', 'description', 'ingredients', 'dish_type',
                  'cooking_method', 'instructions', 'created_by', 'modified_by')


class MenuSerializer(serializers.ModelSerializer):
    recipe = RecipeSerializer()

    class Meta:
        model = Menu
        fields = ('id', 'recipe', 'date', 'meal_time',
                  'created_by', 'modified_by')
