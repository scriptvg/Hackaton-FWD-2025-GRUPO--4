from django.urls import path, include
from rest_framework import routers
from .views import (
    ConservationStatusViewSet,
    SpecieViewSet,
    AnimalViewSet,
    HabitatViewSet
)

# Creamos un router que registra automáticamente las URLs para nuestros ViewSets
router = routers.DefaultRouter()

# Registramos cada ViewSet con su prefijo de URL correspondiente
router.register(r'conservation-status', ConservationStatusViewSet)
router.register(r'species', SpecieViewSet)
router.register(r'animals', AnimalViewSet)
router.register(r'habitats', HabitatViewSet)

# Las URLs se generan automáticamente basadas en los ViewSets registrados
urlpatterns = [
    path('', include(router.urls)),
]