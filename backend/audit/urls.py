from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AuditLogViewSet

# Crear el router y registrar los viewsets
router = DefaultRouter()
router.register(r'logs', AuditLogViewSet)

# URLs de la aplicación de auditoría
urlpatterns = [
    # Incluir las URLs generadas por el router
    path('', include(router.urls)),
]