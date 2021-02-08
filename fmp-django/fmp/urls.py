import debug_toolbar
from django.contrib import admin
from django.urls import include, path, re_path
from rest_framework import routers
import notifications.urls
import menu.urls

api_urlpatterns = [
    path('notifications/', include('notifications_rest.urls')),
    path('accounts/', include('rest_registration.api.urls')),
]
urlpatterns = [
    path('__debug__/', include(debug_toolbar.urls)),
    path('admin/', admin.site.urls),
    path('api/', include('authentication.urls')),
    path('api/', include(api_urlpatterns)),
    path('api/', include(menu.urls)),
    path('inbox/notifications/', include(notifications.urls, namespace='notifications'))
]
