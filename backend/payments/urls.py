from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    PagoViewSet, PagoInscripcionViewSet, DonacionViewSet, MetodosPagoView,
    AdminPagoViewSet, AdminPagoInscripcionViewSet, AdminDonacionViewSet
)

# Router para vistas regulares
router = DefaultRouter()
router.register(r'pagos', PagoViewSet)
router.register(r'pagos-inscripcion', PagoInscripcionViewSet)
router.register(r'donaciones', DonacionViewSet)

# Router para vistas administrativas
admin_router = DefaultRouter()
admin_router.register(r'admin/pagos', AdminPagoViewSet)
admin_router.register(r'admin/pagos-inscripcion', AdminPagoInscripcionViewSet)
admin_router.register(r'admin/donaciones', AdminDonacionViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('', include(admin_router.urls)),
    path('metodos-pago/', MetodosPagoView.as_view(), name='metodos-pago'),
]
