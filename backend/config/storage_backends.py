from storages.backends.s3boto3 import S3Boto3Storage
from django.core.exceptions import ValidationError
import os

class StaticStorage(S3Boto3Storage):
    """
    Configuración para archivos estáticos en S3
    - Ubicación: carpeta 'static/' en el bucket
    """
    location = 'static'
    default_acl = None  # ⚠ ACL deshabilitada


class MediaStorage(S3Boto3Storage):
    """
    Configuración para archivos media en S3
    - Ubicación: carpeta 'media/' en el bucket
    - Tipos permitidos: PDF e imágenes
    """
    location = 'media'
    default_acl = None  # ⚠ ACL deshabilitada
    file_overwrite = False

    def _save(self, name, content):
        """
        Validación de tipos de archivo permitidos
        """
        # Extensiones permitidas
        ALLOWED_EXTENSIONS = ['.pdf', '.jpg', '.jpeg', '.png', '.gif', '.doc', '.docx', '.xls', '.xlsx', '.csv']
        
        ext = os.path.splitext(name)[1].lower()
        if ext not in ALLOWED_EXTENSIONS:
            raise ValidationError(f'Tipo de archivo no permitido. Use: {", ".join(ALLOWED_EXTENSIONS)}')
        
        return super()._save(name, content)
