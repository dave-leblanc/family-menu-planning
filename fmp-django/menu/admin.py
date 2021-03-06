import re

from django.contrib import admin
from django.contrib.auth import get_user_model

# Register your models here.
from .models import Family, Ingredient, Menu, Recipe


class CreatedModifiedAdmin(admin.ModelAdmin):
    readonly_fields = ['created_by', 'modified_by']


class OwnerAdmin(admin.ModelAdmin):
    readonly_fields = ['owner']


class IngredientInlineAdmin(admin.TabularInline):
    model = Recipe.ingredients.through
    insert_after = 'cooking_method'

    def has_add_permission(self, request, obj):
        if obj and obj.created_by != request.user:
            return False
        return super().has_add_permission(request, obj)


class RecipeAdmin(CreatedModifiedAdmin):
    save_as = True
    fieldsets = (
        (None, {
         'fields': ('name', 'dish_type', 'cooking_method')
         }),
        ('Instructions', {
            'fields': ('instructions',)
        }),
    )

    inlines = (IngredientInlineAdmin,)
    change_form_template = 'admin/custom/change_form.html'

    readonly_fields = ('recipeingredients',)

    class Media:
        css = {
            'all': (
                'css/admin.css',
            )
        }


class MenuAdmin(CreatedModifiedAdmin):
    save_as = True
    date_hierarchy = 'date'

    def get_queryset(self, request):
        if request.user.is_superuser:
            queryset = Menu.objects.all()
        else:
            try:
                queryset = Menu.objects.filter(
                    family__members__in=[request.user])
            except:
                queryset = Menu.objects.none()
        return queryset


class FamilyMembersInlineAdmin(admin.TabularInline):
    model = Family.members.through
    insert_after = 'name'


class FamilyAdmin(OwnerAdmin):
    inlines = (FamilyMembersInlineAdmin,)
    change_form_template = 'admin/custom/change_form.html'

    class Media:
        css = {
            'all': (
                'css/admin.css',
            )
        }


admin.site.register(Ingredient)
admin.site.register(Menu, MenuAdmin)
admin.site.register(Recipe, RecipeAdmin)
admin.site.register(Family, FamilyAdmin)
