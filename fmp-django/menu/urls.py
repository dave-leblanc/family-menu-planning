from django.urls import path

from .views import MenuTodayView, MenuThisWeekView, MenuThisMonthView, RecipeView, MenuView, IngredientView


urlpatterns = [
    path('ingredients/', IngredientView.as_view({'get': 'list'}), name='ingredients'),
    path('ingredients/<int:pk>/', IngredientView.as_view({'get': 'retrieve'}), name='ingredient_by_id'),
    path('menus/<int:pk>/', MenuView.as_view({'get': 'retrieve'}), name='menu_by_id'),
    path('menus/today/', MenuTodayView.as_view({'get': 'list'}), name='menu_today'),
    path('menus/this_week/', MenuThisWeekView.as_view({'get': 'list'}), name='menu_this_week'),
    path('menus/this_month/', MenuThisMonthView.as_view({'get': 'list'}), name='menu_this_month'),
    path('recipes/', RecipeView.as_view({'get': 'list'}), name='recipes'),
    path('recipes/<int:pk>/', RecipeView.as_view({'get': 'retrieve'}), name='recipe_by_id'),
    
]
