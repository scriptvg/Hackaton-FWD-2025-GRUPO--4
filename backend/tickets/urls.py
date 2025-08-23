from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TicketViewSet, VisitViewSet

# Crear router para ViewSets
router = DefaultRouter()
router.register(r'tickets', TicketViewSet)
router.register(r'visits', VisitViewSet)

# URLs de la aplicación tickets
urlpatterns = [
    # Incluir URLs del router
    path('', include(router.urls)),
]
