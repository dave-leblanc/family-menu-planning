from django.contrib import admin

# Register your models here.
from .models import Ingredient, Recipe

class IngredientInlineAdmin(admin.TabularInline):
    model = Recipe.ingredients.through
    insert_after = 'cooking_method'

class RecipeAdmin(admin.ModelAdmin):
    fieldsets = (
        (None, {
         'fields': ('name','dish_type','cooking_method')
        }),
        ('Instructions', {
            'fields': ('instructions',)
        }),
    )
    
    inlines = (IngredientInlineAdmin,)
    change_form_template = 'admin/custom/change_form.html'

    class Media:
        css = {
            'all': (
                'css/admin.css',
            )
        }

admin.site.register(Ingredient)
admin.site.register(Recipe,RecipeAdmin)