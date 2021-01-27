from django.db import models

# Create your models here.

class Ingredient(models.Model):
    ingredient = models.CharField(max_length=80)
    
    def __str__(self) -> str:
        return self.ingredient

class Recipe(models.Model):
    MAIN_ENTREE = 'ME'
    SIDE_DISH = 'SD'
    DESERT_TREAT = 'DT'
    DISH_TYPE_CHOICES = [
        (MAIN_ENTREE,'Main Entree'),
        (SIDE_DISH,'Side Dish'),
        (DESERT_TREAT,'Desert/Treat')
    ]
    OVEN_BAKE = 'OB'
    PAN_FRY = 'PF'
    INSTANT_POT = 'IP'
    SLOW_COOKER = 'SC'
    DEEP_FRY = 'DF'
    COOKING_METHOD_CHOICES = [
        (OVEN_BAKE,'Oven Bake'),
        (PAN_FRY,'Pan Fry'),
        (INSTANT_POT,'Instant Pot'),
        (SLOW_COOKER,'Slow Cooker'),
        (DEEP_FRY,'Deep Fry ')
    ]
    name = models.CharField(max_length=80)
    ingredients = models.ManyToManyField(Ingredient,through='RecipeIngredients',through_fields=('recipe','ingredient'))
    dish_type = models.CharField(max_length=2, choices=DISH_TYPE_CHOICES)
    cooking_method = models.CharField(max_length=2, choices=COOKING_METHOD_CHOICES,blank=True,null=True)
    instructions = models.TextField(blank=True,null=True)
    
    def __str__(self) -> str:
        return self.name

class RecipeIngredients(models.Model):
    recipe = models.ForeignKey(Recipe,on_delete=models.CASCADE)
    ingredient = models.ForeignKey(Ingredient,on_delete=models.CASCADE)
    amount = models.CharField(max_length=50)
    optional = models.BooleanField(default=False)
    alternatives = models.ManyToManyField(Ingredient,related_name="alternatives",blank=True,null=True)
    prep_instructions = models.CharField(max_length=255,null=True,blank=True)
    