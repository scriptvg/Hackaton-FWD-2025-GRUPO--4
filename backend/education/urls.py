from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    InstructorViewSet, ProgramaViewSet, HorarioViewSet, InscripcionViewSet,
    ServiciosEducativosViewSet, ServiciosEducativosImageViewSet,
    ServiciosEducativosFactsViewSet, ServiciosEducativosDescriptionViewSet,
    ServiciosEducativosButtonsViewSet, ProgramaEducativoViewSet, ProgramaItemViewSet
)

# Crear el router para los ViewSets
router = DefaultRouter()

# Registrar las rutas para cada ViewSet
router.register(r'instructores', InstructorViewSet)
router.register(r'programas', ProgramaViewSet)
router.register(r'horarios', HorarioViewSet)
router.register(r'inscripciones', InscripcionViewSet)

# Rutas para Servicios Educativos
router.register(r'servicios', ServiciosEducativosViewSet)
router.register(r'servicios-imagenes', ServiciosEducativosImageViewSet)
router.register(r'servicios-facts', ServiciosEducativosFactsViewSet)
router.register(r'servicios-descripciones', ServiciosEducativosDescriptionViewSet)
router.register(r'servicios-botones', ServiciosEducativosButtonsViewSet)

# Rutas para Programas Educativos
router.register(r'programas-educativos', ProgramaEducativoViewSet)
router.register(r'programas-items', ProgramaItemViewSet)

# Patrones de URL de la aplicación
urlpatterns = [
    # Incluir todas las rutas del router
    path('', include(router.urls)),
]
