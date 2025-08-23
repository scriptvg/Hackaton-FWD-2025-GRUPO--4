from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import DocumentoViewSet, HistorialDocumentoViewSet

# Crear el router para los ViewSets
router = DefaultRouter()

# Registrar las rutas para documentos e historial
router.register(r'documentos', DocumentoViewSet)
router.register(r'historial', HistorialDocumentoViewSet)

# URLs de la aplicación de documentos
urlpatterns = [
    # Incluir las URLs generadas por el router
    path('', include(router.urls)),
]