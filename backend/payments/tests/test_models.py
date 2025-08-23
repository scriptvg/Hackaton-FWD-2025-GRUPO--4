# tests/test_models.py

import pytest
from django.test import TestCase
from django.core.exceptions import ValidationError
from decimal import Decimal
from payments.models import Pago, PagoInscripcion, Donacion
from education.models import Inscripcion, Programa
from django.contrib.auth import get_user_model

User = get_user_model()

@pytest.mark.django_db
class TestPagoModel(TestCase):
    """Pruebas para el modelo Pago
    
    Esta clase contiene pruebas unitarias para verificar el funcionamiento
    correcto del modelo Pago, incluyendo validaciones, conversiones de moneda
    y estados de pago.
    """
    
    def setUp(self):
        """Configuración inicial para las pruebas
        
        Crea instancias necesarias para las pruebas, incluyendo un pago básico
        con valores predeterminados.
        """
        self.pago = Pago.objects.create(
            monto=Decimal('100.00'),
            moneda='USD',
            metodo_pago='TARJETA',
            referencia_transaccion='TEST-REF-001',
            estado='PENDIENTE'
        )

    def test_crear_pago(self):
        """Prueba la creación básica de un pago"""
        self.assertEqual(self.pago.monto, Decimal('100.00'))
        self.assertEqual(self.pago.moneda, 'USD')
        self.assertEqual(self.pago.estado, 'PENDIENTE')

    def test_conversion_moneda(self):
        """Prueba la conversión automática de monedas"""
        # La conversión exacta dependerá del tipo de cambio actual
        self.assertIsNotNone(self.pago.monto_crc)
        self.assertIsNotNone(self.pago.monto_usd)

    def test_validacion_monto_negativo(self):
        """Prueba que no se permitan montos negativos"""
        with self.assertRaises(ValidationError):
            pago = Pago(
                monto=Decimal('-100.00'),
                moneda='USD',
                metodo_pago='TARJETA',
                referencia_transaccion='TEST-REF-002'
            )
            pago.full_clean()

    def test_validacion_referencia_unica(self):
        """Prueba que la referencia de transacción sea única"""
        with self.assertRaises(ValidationError):
            pago = Pago(
                monto=Decimal('100.00'),
                moneda='USD',
                metodo_pago='TARJETA',
                referencia_transaccion='TEST-REF-001'  # Referencia duplicada
            )
            pago.full_clean()

@pytest.mark.django_db
class TestPagoInscripcionModel(TestCase):
    """Pruebas para el modelo PagoInscripcion
    
    Verifica la funcionalidad específica de los pagos asociados a inscripciones
    en programas educativos.
    """
    
    def setUp(self):
        """Configuración inicial para las pruebas de PagoInscripcion"""
        self.user = User.objects.create_user(
            username='testuser',
            email='test@example.com',
            password='testpass123'
        )
        
        self.programa = Programa.objects.create(
            nombre='Programa Test',
            precio=Decimal('500.00')
        )
        
        self.inscripcion = Inscripcion.objects.create(
            estudiante=self.user,
            programa=self.programa,
            estado='PENDIENTE'
        )

    def test_crear_pago_inscripcion(self):
        """Prueba la creación de un pago de inscripción"""
        pago = PagoInscripcion.objects.create(
            inscripcion=self.inscripcion,
            monto=Decimal('500.00'),
            moneda='USD',
            metodo_pago='TARJETA',
            referencia_transaccion='TEST-INSC-001',
            estado='COMPLETADO'
        )
        
        self.assertEqual(pago.monto, self.programa.precio)
        self.assertEqual(self.inscripcion.estado, 'COMPLETADO')

    def test_validacion_monto_programa(self):
        """Prueba que el monto del pago coincida con el precio del programa"""
        with self.assertRaises(ValidationError):
            pago = PagoInscripcion(
                inscripcion=self.inscripcion,
                monto=Decimal('100.00'),  # Monto incorrecto
                moneda='USD',
                metodo_pago='TARJETA',
                referencia_transaccion='TEST-INSC-002'
            )
            pago.full_clean()

@pytest.mark.django_db
class TestDonacionModel(TestCase):
    """Pruebas para el modelo Donacion
    
    Verifica la funcionalidad específica de las donaciones, incluyendo
    validaciones de datos del donante y conversiones de moneda.
    """
    
    def setUp(self):
        """Configuración inicial para las pruebas de Donacion"""
        self.donacion = Donacion.objects.create(
            monto=Decimal('50.00'),
            moneda='USD',
            nombre_donante='Juan Pérez',
            email_donante='juan@example.com',
            metodo_pago='TRANSFERENCIA',
            referencia_transaccion='TEST-DON-001',
            estado='COMPLETADO'
        )

    def test_crear_donacion(self):
        """Prueba la creación básica de una donación"""
        self.assertEqual(self.donacion.monto, Decimal('50.00'))
        self.assertEqual(self.donacion.nombre_donante, 'Juan Pérez')
        self.assertEqual(self.donacion.estado, 'COMPLETADO')

    def test_validacion_email_donante(self):
        """Prueba la validación del formato del email del donante"""
        with self.assertRaises(ValidationError):
            donacion = Donacion(
                monto=Decimal('50.00'),
                moneda='USD',
                nombre_donante='María López',
                email_donante='email_invalido',  # Email inválido
                metodo_pago='TRANSFERENCIA',
                referencia_transaccion='TEST-DON-002'
            )
            donacion.full_clean()

    def test_conversion_moneda_donacion(self):
        """Prueba la conversión automática de monedas en donaciones"""
        self.assertIsNotNone(self.donacion.monto_crc)
        self.assertIsNotNone(self.donacion.monto_usd)

    def test_validacion_datos_donante(self):
        """Prueba que se requieran ambos campos de donante si uno está presente"""
        with self.assertRaises(ValidationError):
            donacion = Donacion(
                monto=Decimal('50.00'),
                moneda='USD',
                nombre_donante='Ana Gómez',  # Solo nombre sin email
                metodo_pago='TRANSFERENCIA',
                referencia_transaccion='TEST-DON-003'
            )
            donacion.full_clean()
