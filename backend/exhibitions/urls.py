from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    ExhibicionViewSet,
    ExhibicionImageViewSet,
    ExhibicionFactsViewSet,
    ExhibicionDescriptionViewSet,
    ExhibicionButtonsViewSet
)

"""Configuración de URLs para el módulo de exhibiciones.

Este módulo define las rutas para acceder a los diferentes endpoints
relacionados con la gestión de exhibiciones y sus componentes.

Rutas principales:
    - /exhibitions/: Gestión de exhibiciones
    - /exhibitions/{id}/: Detalles de una exhibición específica
    - /exhibitions/{id}/full_details/: Detalles completos de una exhibición
    - /images/: Gestión de imágenes
    - /facts/: Gestión de datos interesantes
    - /descriptions/: Gestión de descripciones
    - /buttons/: Gestión de botones
"""

# Crear el router
router = DefaultRouter()

# Registrar las rutas
router.register(r'exhibitions', ExhibicionViewSet)
router.register(r'images', ExhibicionImageViewSet)
router.register(r'facts', ExhibicionFactsViewSet)
router.register(r'descriptions', ExhibicionDescriptionViewSet)
router.register(r'buttons', ExhibicionButtonsViewSet)

# Definir el patrón de URLs
urlpatterns = [
    path('', include(router.urls)),
]
