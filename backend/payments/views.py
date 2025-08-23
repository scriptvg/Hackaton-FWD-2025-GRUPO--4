# Importaciones de Django Rest Framework para vistas y utilidades
from rest_framework import viewsets, status
from rest_framework.decorators import action  # Para definir acciones personalizadas
from rest_framework.response import Response
from rest_framework.views import APIView

# Importaciones para manejo de permisos
from rest_framework.permissions import IsAuthenticated, IsAdminUser

# Importaciones para filtrado y ordenamiento
from rest_framework.filters import SearchFilter, OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend

# Importaciones locales de modelos y serializadores
from .models import Pago, PagoInscripcion, Donacion
from .serializers import PagoSerializer, PagoInscripcionSerializer, DonacionSerializer

class PagoViewSet(viewsets.ModelViewSet):
    """ViewSet para gestionar pagos generales
    
    Este ViewSet proporciona los siguientes endpoints:
    - GET /pagos/ - Lista todos los pagos (filtrado por usuario)
    - POST /pagos/ - Crea un nuevo pago
    - GET /pagos/{id}/ - Obtiene un pago específico
    - PUT /pagos/{id}/ - Actualiza un pago (solo admin)
    - DELETE /pagos/{id}/ - Elimina un pago (solo admin)
    
    Permisos:
    - Listar y ver: Usuario autenticado
    - Crear: Usuario autenticado
    - Actualizar/Eliminar: Solo administradores
    
    Ejemplo de uso:
    ```python
    # Listar pagos (como usuario normal)
    GET /api/pagos/
    
    # Crear nuevo pago
    POST /api/pagos/
    {
        "monto": 50000,
        "moneda": "CRC",
        "metodo_pago": "TARJETA"
    }
    ```
    """
    queryset = Pago.objects.all()
    serializer_class = PagoSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """Filtra los pagos según el tipo de usuario"""
        if self.request.user.is_staff:
            return Pago.objects.all()
        return Pago.objects.filter(inscripcion__usuario=self.request.user)

    def get_permissions(self):
        """Define permisos según la acción"""
        if self.action in ['update', 'partial_update', 'destroy']:
            self.permission_classes = [IsAdminUser]
        return super().get_permissions()

class PagoInscripcionViewSet(viewsets.ModelViewSet):
    """ViewSet para gestionar pagos de inscripciones a programas educativos
    
    Endpoints disponibles:
    - GET /pagos-inscripcion/ - Lista pagos de inscripción
    - POST /pagos-inscripcion/ - Crea pago de inscripción
    - GET /pagos-inscripcion/{id}/ - Obtiene detalles de un pago
    - PUT /pagos-inscripcion/{id}/ - Actualiza pago (admin)
    - DELETE /pagos-inscripcion/{id}/ - Elimina pago (admin)
    - POST /pagos-inscripcion/{id}/procesar_pago/ - Procesa el pago
    
    Funcionalidades especiales:
    - Validación automática del monto contra el precio del programa
    - Actualización del estado de la inscripción al procesar el pago
    - Filtrado de pagos por usuario actual
    
    Ejemplo de uso:
    ```python
    # Crear pago de inscripción
    POST /api/pagos-inscripcion/
    {
        "inscripcion": 1,
        "monto": 75000,
        "moneda": "CRC",
        "metodo_pago": "TARJETA"
    }
    
    # Procesar pago
    POST /api/pagos-inscripcion/1/procesar_pago/
    ```
    """
    queryset = PagoInscripcion.objects.all()
    serializer_class = PagoInscripcionSerializer
    permission_classes = [IsAuthenticated]

    # Vista administrativa para Pagos
class AdminPagoViewSet(viewsets.ModelViewSet):
    """Vista administrativa para gestionar pagos a través de la API.
    
    Proporciona funcionalidades CRUD completas con filtrado, búsqueda y ordenamiento.
    """
    queryset = Pago.objects.all()
    serializer_class = PagoSerializer
    permission_classes = [IsAdminUser]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['estado', 'metodo_pago', 'moneda']
    search_fields = ['referencia_transaccion']
    ordering_fields = ['fecha_pago', 'monto']
    ordering = ['-fecha_pago']

# Vista administrativa para Pagos de Inscripción
class AdminPagoInscripcionViewSet(viewsets.ModelViewSet):
    """Vista administrativa para gestionar pagos de inscripción a través de la API.
    
    Proporciona funcionalidades CRUD completas con filtrado, búsqueda y ordenamiento.
    """
    queryset = PagoInscripcion.objects.all()
    serializer_class = PagoInscripcionSerializer
    permission_classes = [IsAdminUser]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['estado', 'metodo_pago', 'moneda']
    search_fields = ['referencia_transaccion', 'inscripcion__usuario__email']
    ordering_fields = ['fecha_pago', 'monto']
    ordering = ['-fecha_pago']

# Vista administrativa para Donaciones
class AdminDonacionViewSet(viewsets.ModelViewSet):
    """Vista administrativa para gestionar donaciones a través de la API.
    
    Proporciona funcionalidades CRUD completas con filtrado, búsqueda y ordenamiento.
    """
    queryset = Donacion.objects.all()
    serializer_class = DonacionSerializer
    permission_classes = [IsAdminUser]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['estado', 'metodo_pago', 'moneda']
    search_fields = ['nombre_donante', 'email_donante', 'referencia_transaccion']
    ordering_fields = ['fecha_creacion', 'monto']
    ordering = ['-fecha_creacion']

    def get_queryset(self):
        """Filtra los pagos según el tipo de usuario"""
        if self.request.user.is_staff:
            return PagoInscripcion.objects.all()
        return PagoInscripcion.objects.filter(inscripcion__usuario=self.request.user)

    def get_permissions(self):
        """Define permisos según la acción"""
        if self.action in ['update', 'partial_update', 'destroy']:
            self.permission_classes = [IsAdminUser]
        return super().get_permissions()

    @action(detail=True, methods=['post'])
    def procesar_pago(self, request, pk=None):
        """Procesa el pago de una inscripción
        
        Actualiza el estado del pago y la inscripción según el resultado
        del procesamiento.
        """
        pago = self.get_object()
        
        # Aquí iría la lógica de procesamiento del pago con el gateway de pagos
        # Por ahora, simulamos un proceso exitoso
        try:
            pago.estado = 'SUCCESS'
            pago.save()
            return Response({
                'message': 'Pago procesado exitosamente'
            }, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({
                'error': str(e)
            }, status=status.HTTP_400_BAD_REQUEST)

class DonacionViewSet(viewsets.ModelViewSet):
    """ViewSet para gestionar donaciones al parque
    
    Endpoints principales:
    - GET /donaciones/ - Lista donaciones (filtradas por usuario)
    - POST /donaciones/ - Registra nueva donación (público)
    - GET /donaciones/{id}/ - Ver detalles de donación
    - PUT /donaciones/{id}/ - Actualizar donación (admin)
    - DELETE /donaciones/{id}/ - Eliminar donación (admin)
    - POST /donaciones/{id}/procesar_donacion/ - Procesa la donación
    
    Características especiales:
    - Creación de donaciones sin autenticación
    - Conversión automática de montos entre CRC y USD
    - Seguimiento por email del donante
    
    Ejemplo de uso:
    ```python
    # Registrar donación
    POST /api/donaciones/
    {
        "monto": 100,
        "moneda": "USD",
        "nombre_donante": "Juan Pérez",
        "email_donante": "juan@ejemplo.com",
        "metodo_pago": "TARJETA"
    }
    
    # Procesar donación (admin)
    POST /api/donaciones/1/procesar_donacion/
    ```
    """
    queryset = Donacion.objects.all()
    serializer_class = DonacionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """Filtra las donaciones según el tipo de usuario"""
        if self.request.user.is_staff:
            return Donacion.objects.all()
        return Donacion.objects.filter(
            email_donante=self.request.user.email
        )

    def get_permissions(self):
        """Define permisos según la acción"""
        if self.action == 'create':
            self.permission_classes = []
        elif self.action in ['update', 'partial_update', 'destroy']:
            self.permission_classes = [IsAdminUser]
        return super().get_permissions()

    @action(detail=True, methods=['post'])
    def procesar_donacion(self, request, pk=None):
        """Procesa una donación
        
        Actualiza el estado de la donación según el resultado del procesamiento.
        """
        donacion = self.get_object()
        
        # Aquí iría la lógica de procesamiento de la donación
        # Por ahora, simulamos un proceso exitoso
        try:
            donacion.estado = 'SUCCESS'
            donacion.save()
            return Response({
                'message': 'Donación procesada exitosamente'
            }, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({
                'error': str(e)
            }, status=status.HTTP_400_BAD_REQUEST)

class MetodosPagoView(APIView):
    """Vista para obtener los métodos de pago disponibles
    
    Endpoint:
    - GET /metodos-pago/ - Obtiene lista de métodos de pago
    
    Retorna:
    Lista de diccionarios con:
    - id: Identificador del método de pago
    - nombre: Nombre descriptivo del método
    
    Métodos disponibles:
    - Tarjeta de Crédito/Débito (CARD)
    - PayPal (PAYPAL)
    - Efectivo/SINPE (CASH)
    - Transferencia Bancaria (TRANSFER)
    
    Ejemplo de uso:
    ```python
    # Obtener métodos de pago
    GET /api/metodos-pago/
    
    # Respuesta
    [
        {"id": "CARD", "nombre": "Tarjeta de Crédito/Débito"},
        {"id": "PAYPAL", "nombre": "PayPal"},
        ...
    ]
    ```
    """
    def get(self, request):
        """Retorna la lista de métodos de pago disponibles"""
        metodos = [
            {'id': 'CARD', 'nombre': 'Tarjeta de Crédito/Débito'},
            {'id': 'PAYPAL', 'nombre': 'PayPal'},
            {'id': 'CASH', 'nombre': 'Efectivo/SINPE'},
            {'id': 'TRANSFER', 'nombre': 'Transferencia Bancaria'}
        ]
        return Response(metodos)
