from django.urls import path
from .views import SectionsViewSet, Habitats_ViewSet, InfrastructureListAPIView

"""URLs para la gestión de infraestructura del zoológico.

Este módulo define las rutas para gestionar las secciones y hábitats del zoológico,
permitiendo operaciones CRUD sobre estos recursos y acceso a información general.

Rutas principales:
    - /summary/: Resumen general de la infraestructura
    - /sections/: Gestión de secciones del zoológico
    - /habitats/: Gestión de hábitats y sus relaciones con secciones
"""

urlpatterns = [
    # Ruta para resumen general
    path('summary/', InfrastructureListAPIView.as_view(), name='infrastructure-summary'),
    # Rutas para Secciones
    path('sections/', 
         SectionsViewSet.as_view({
             'get': 'list',
             'post': 'create'
         }), 
         name='sections-list-create'),

    path('sections/<int:pk>/', 
         SectionsViewSet.as_view({
             'get': 'retrieve',
             'put': 'update',
             'delete': 'destroy'
         }), 
         name='sections-detail'),

    # Rutas para Hábitats
    path('habitats/', 
         Habitats_ViewSet.as_view({
             'get': 'list',
             'post': 'create'
         }), 
         name='habitats-list-create'),

    path('habitats/<int:pk>/', 
         Habitats_ViewSet.as_view({
             'get': 'retrieve',
             'put': 'update',
             'delete': 'destroy'
         }), 
         name='habitats-detail'),
]
