"""Sistema de notificaciones por email para pagos y facturación"""

import logging
from typing import Dict, List, Optional

from django.conf import settings
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags

logger = logging.getLogger(__name__)

class PaymentNotifier:
    """Manejador de notificaciones por email para pagos
    
    Esta clase se encarga de enviar notificaciones por email relacionadas
    con pagos, incluyendo confirmaciones, facturas y reembolsos.
    
    Attributes:
        from_email (str): Dirección de email del remitente
        reply_to (list): Lista de direcciones para respuestas
    """
    
    def __init__(self):
        """Inicializa el notificador con la configuración desde settings"""
        self.from_email = settings.DEFAULT_FROM_EMAIL
        self.reply_to = settings.EMAIL_REPLY_TO
    
    def send_payment_confirmation(self, payment_data: Dict, to_email: str) -> None:
        """Envía confirmación de pago exitoso
        
        Args:
            payment_data: Datos del pago realizado
            to_email: Email del destinatario
            
        Raises:
            EmailError: Si hay un error al enviar el email
        """
        try:
            context = {
                'payment': payment_data,
                'site_name': settings.SITE_NAME,
                'contact_email': settings.CONTACT_EMAIL
            }
            
            self._send_email(
                subject='Confirmación de Pago',
                template_name='payments/email/payment_confirmation.html',
                context=context,
                to_email=to_email
            )
            
            logger.info(f'Email de confirmación enviado a {to_email}')
            
        except Exception as e:
            logger.error(f'Error al enviar confirmación de pago: {str(e)}')
            raise EmailError('Error al enviar confirmación de pago')
    
    def send_payment_failed(self, payment_data: Dict, to_email: str) -> None:
        """Envía notificación de pago fallido
        
        Args:
            payment_data: Datos del intento de pago
            to_email: Email del destinatario
            
        Raises:
            EmailError: Si hay un error al enviar el email
        """
        try:
            context = {
                'payment': payment_data,
                'site_name': settings.SITE_NAME,
                'contact_email': settings.CONTACT_EMAIL,
                'support_phone': settings.SUPPORT_PHONE
            }
            
            self._send_email(
                subject='Pago No Procesado',
                template_name='payments/email/payment_failed.html',
                context=context,
                to_email=to_email
            )
            
            logger.info(f'Email de pago fallido enviado a {to_email}')
            
        except Exception as e:
            logger.error(f'Error al enviar notificación de pago fallido: {str(e)}')
            raise EmailError('Error al enviar notificación de pago fallido')
    
    def send_invoice(self, invoice_data: Dict, to_email: str, pdf_path: Optional[str] = None) -> None:
        """Envía factura electrónica
        
        Args:
            invoice_data: Datos de la factura
            to_email: Email del destinatario
            pdf_path: Ruta opcional al PDF de la factura
            
        Raises:
            EmailError: Si hay un error al enviar el email
        """
        try:
            context = {
                'invoice': invoice_data,
                'site_name': settings.SITE_NAME,
                'contact_email': settings.CONTACT_EMAIL
            }
            
            email = self._create_email(
                subject='Factura Electrónica',
                template_name='payments/email/invoice.html',
                context=context,
                to_email=to_email
            )
            
            # Adjuntar PDF si existe
            if pdf_path:
                email.attach_file(pdf_path)
            
            email.send()
            logger.info(f'Factura enviada a {to_email}')
            
        except Exception as e:
            logger.error(f'Error al enviar factura: {str(e)}')
            raise EmailError('Error al enviar factura')
    
    def send_refund_confirmation(self, refund_data: Dict, to_email: str) -> None:
        """Envía confirmación de reembolso
        
        Args:
            refund_data: Datos del reembolso
            to_email: Email del destinatario
            
        Raises:
            EmailError: Si hay un error al enviar el email
        """
        try:
            context = {
                'refund': refund_data,
                'site_name': settings.SITE_NAME,
                'contact_email': settings.CONTACT_EMAIL
            }
            
            self._send_email(
                subject='Confirmación de Reembolso',
                template_name='payments/email/refund_confirmation.html',
                context=context,
                to_email=to_email
            )
            
            logger.info(f'Confirmación de reembolso enviada a {to_email}')
            
        except Exception as e:
            logger.error(f'Error al enviar confirmación de reembolso: {str(e)}')
            raise EmailError('Error al enviar confirmación de reembolso')
    
    def _create_email(self, subject: str, template_name: str, 
                      context: Dict, to_email: str) -> EmailMultiAlternatives:
        """Crea un objeto de email con contenido HTML y texto plano"""
        # Renderizar templates
        html_content = render_to_string(template_name, context)
        text_content = strip_tags(html_content)
        
        # Crear email
        email = EmailMultiAlternatives(
            subject=subject,
            body=text_content,
            from_email=self.from_email,
            to=[to_email],
            reply_to=self.reply_to
        )
        
        email.attach_alternative(html_content, 'text/html')
        return email
    
    def _send_email(self, subject: str, template_name: str, 
                    context: Dict, to_email: str) -> None:
        """Crea y envía un email"""
        email = self._create_email(subject, template_name, context, to_email)
        email.send()

class EmailError(Exception):
    """Excepción personalizada para errores de email
    
    Esta excepción se utiliza para manejar errores específicos del envío
    de emails y proporcionar mensajes claros.
    """
    pass
