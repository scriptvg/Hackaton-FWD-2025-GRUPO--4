# tests/test_paypal.py

import pytest
from unittest.mock import patch, MagicMock
from django.test import TestCase
from decimal import Decimal
from payments.integrations.paypal import PayPalClient, PayPalError

class TestPayPalClient(TestCase):
    """Pruebas para la integración con PayPal
    
    Verifica la creación, ejecución y reembolso de pagos a través
    de la API de PayPal.
    """
    
    def setUp(self):
        """Configuración inicial para las pruebas"""
        self.client = PayPalClient(
            client_id='test_client_id',
            client_secret='test_client_secret',
            is_sandbox=True
        )
        
        self.payment_data = {
            'amount': Decimal('100.00'),
            'currency': 'USD',
            'description': 'Curso de Programación',
            'return_url': 'http://example.com/success',
            'cancel_url': 'http://example.com/cancel'
        }

    @patch('paypalrestsdk.Payment')
    def test_crear_pago(self, mock_payment):
        """Prueba la creación de un pago en PayPal"""
        # Simula respuesta exitosa de PayPal
        mock_payment_instance = MagicMock()
        mock_payment_instance.create.return_value = True
        mock_payment_instance.id = 'PAY-TEST123'
        mock_payment_instance.links = [
            {'rel': 'approval_url', 'href': 'https://paypal.com/approve'}
        ]
        mock_payment.return_value = mock_payment_instance

        response = self.client.create_payment(self.payment_data)
        
        self.assertEqual(response['payment_id'], 'PAY-TEST123')
        self.assertEqual(
            response['approval_url'],
            'https://paypal.com/approve'
        )

    @patch('paypalrestsdk.Payment')
    def test_error_crear_pago(self, mock_payment):
        """Prueba el manejo de errores al crear un pago"""
        # Simula error de PayPal
        mock_payment_instance = MagicMock()
        mock_payment_instance.create.return_value = False
        mock_payment_instance.error = {'message': 'Invalid request'}
        mock_payment.return_value = mock_payment_instance

        with self.assertRaises(PayPalError):
            self.client.create_payment(self.payment_data)

    @patch('paypalrestsdk.Payment')
    def test_ejecutar_pago(self, mock_payment):
        """Prueba la ejecución de un pago aprobado"""
        # Simula pago existente
        mock_payment_instance = MagicMock()
        mock_payment_instance.execute.return_value = True
        mock_payment.find.return_value = mock_payment_instance

        result = self.client.execute_payment(
            payment_id='PAY-TEST123',
            payer_id='PAYER123'
        )
        
        self.assertTrue(result['success'])

    @patch('paypalrestsdk.Payment')
    def test_error_ejecutar_pago(self, mock_payment):
        """Prueba el manejo de errores al ejecutar un pago"""
        # Simula error en la ejecución
        mock_payment_instance = MagicMock()
        mock_payment_instance.execute.return_value = False
        mock_payment_instance.error = {'message': 'Insufficient funds'}
        mock_payment.find.return_value = mock_payment_instance

        with self.assertRaises(PayPalError):
            self.client.execute_payment(
                payment_id='PAY-TEST123',
                payer_id='PAYER123'
            )

    @patch('paypalrestsdk.Payment')
    def test_reembolso_pago(self, mock_payment):
        """Prueba el reembolso de un pago"""
        # Simula pago y reembolso exitoso
        mock_sale = MagicMock()
        mock_sale.refund.return_value = True
        
        mock_payment_instance = MagicMock()
        mock_payment_instance.transactions = [{
            'related_resources': [{'sale': mock_sale}]
        }]
        mock_payment.find.return_value = mock_payment_instance

        result = self.client.refund_payment(
            payment_id='PAY-TEST123',
            amount=Decimal('100.00')
        )
        
        self.assertTrue(result['success'])

    def test_validacion_montos(self):
        """Prueba la validación de montos"""
        invalid_data = self.payment_data.copy()
        invalid_data['amount'] = Decimal('-100.00')

        with self.assertRaises(ValueError):
            self.client.create_payment(invalid_data)

    def test_validacion_urls(self):
        """Prueba la validación de URLs de retorno"""
        invalid_data = self.payment_data.copy()
        invalid_data['return_url'] = 'invalid-url'

        with self.assertRaises(ValueError):
            self.client.create_payment(invalid_data)

    @patch('paypalrestsdk.Payment')
    def test_obtener_detalles_pago(self, mock_payment):
        """Prueba la obtención de detalles de un pago"""
        # Simula respuesta con detalles del pago
        mock_payment_instance = MagicMock()
        mock_payment_instance.to_dict.return_value = {
            'id': 'PAY-TEST123',
            'state': 'approved',
            'transactions': [{
                'amount': {'total': '100.00', 'currency': 'USD'}
            }]
        }
        mock_payment.find.return_value = mock_payment_instance

        details = self.client.get_payment_details('PAY-TEST123')
        
        self.assertEqual(details['payment_id'], 'PAY-TEST123')
        self.assertEqual(details['state'], 'approved')

    @patch('paypalrestsdk.Payment')
    def test_verificar_estado_pago(self, mock_payment):
        """Prueba la verificación del estado de un pago"""
        # Simula diferentes estados de pago
        mock_payment_instance = MagicMock()
        mock_payment_instance.state = 'approved'
        mock_payment.find.return_value = mock_payment_instance

        status = self.client.verify_payment_status('PAY-TEST123')
        self.assertEqual(status, 'approved')

    def test_manejo_timeout(self):
        """Prueba el manejo de timeouts en las llamadas a la API"""
        with patch('paypalrestsdk.Payment.find') as mock_find:
            mock_find.side_effect = Exception('Timeout')
            
            with self.assertRaises(PayPalError):
                self.client.get_payment_details('PAY-TEST123')
