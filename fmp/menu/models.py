from django.db import models
from django_currentuser.db.models import CurrentUserField
from .lang import *
from time import strftime
# Create your models here.
from django.contrib.auth import get_user_model
class Family(models.Model):
    name = models.CharField(max_length=255)
    owner = CurrentUserField(related_name="family_creator")
    members = models.ManyToManyField(get_user_model(),through='FamilyMembers')

    def __str__(self) -> str:
        return self.name
    class Meta:
        verbose_name_plural="Families"

class FamilyMembers(models.Model):
    family = models.ForeignKey(Family,on_delete=models.CASCADE)
    user = models.ForeignKey(get_user_model(),on_delete=models.CASCADE)
    family_admin = models.BooleanField(default=False)

    class Meta:
        verbose_name_plural="Family Members"

class Ingredient(models.Model):
    ingredient = models.CharField(max_length=80)
    
    def __str__(self) -> str:
        return self.ingredient

class Recipe(models.Model):
    name = models.CharField(max_length=80)
    ingredients = models.ManyToManyField(Ingredient,through='RecipeIngredients',through_fields=('recipe','ingredient'))
    dish_type = models.CharField(max_length=2, choices=DISH_TYPE_CHOICES,default=MAIN_ENTREE)
    cooking_method = models.CharField(max_length=2, choices=COOKING_METHOD_CHOICES,blank=True,null=True)
    instructions = models.TextField(blank=True,null=True)
    created_by = CurrentUserField(related_name="recipe_created_by")
    modified_by = CurrentUserField(related_name="recipe_modified_by",on_update=True)
    
    def __str__(self) -> str:
        return self.name

class RecipeIngredients(models.Model):
    recipe = models.ForeignKey(Recipe,on_delete=models.CASCADE)
    ingredient = models.ForeignKey(Ingredient,on_delete=models.CASCADE)
    amount = models.CharField(max_length=50)
    optional = models.BooleanField(default=False)
    alternatives = models.ManyToManyField(Ingredient,related_name="alternatives",blank=True,null=True)
    prep_instructions = models.CharField(max_length=255,null=True,blank=True)

    def __str__(self) -> str:
        return ''

    class Meta:
        verbose_name_plural="Recipe Ingredients "
    
class Menu(models.Model):
    recipe = models.ForeignKey(Recipe,on_delete=models.CASCADE)
    date = models.DateField()
    meal_time = models.CharField(max_length=2,choices=MEAL_TIME_OPTIONS,default=SUPPER)
    family = models.ForeignKey(Family,on_delete=models.CASCADE,null=True)
    created_by = CurrentUserField(related_name="menu_created_by")
    modified_by = CurrentUserField(related_name="menu_modified_by",on_update=True)

    def __str__(self) -> str:
        return "%s %s" % (self.recipe,self.date.strftime("%a %B %d")) 