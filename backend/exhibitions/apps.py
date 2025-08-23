from django.apps import AppConfig

class ExhibitionsConfig(AppConfig):
    """Configuración de la aplicación de exhibiciones.
    
    Esta clase define la configuración básica de la aplicación de exhibiciones,
    incluyendo su nombre y etiqueta para el panel de administración.
    """
    
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'exhibitions'
    verbose_name = 'Gestión de Exhibiciones'
