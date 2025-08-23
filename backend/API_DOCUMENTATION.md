# Documentación de la API del Backend

## Índice
1. [Autenticación](#autenticación)
2. [Usuarios y Perfiles](#usuarios-y-perfiles)
3. [Documentos](#documentos)
4. [Infraestructura](#infraestructura)
5. [Vida Silvestre](#vida-silvestre)
6. [Educación](#educación)
7. [Exhibiciones](#exhibiciones)
8. [Visitas](#visitas)
9. [Órdenes de Compra](#órdenes-de-compra)
10. [Pagos](#pagos)

## Autenticación

### Endpoints

- `POST /api/auth/login/`: Iniciar sesión
  - Entrada:
    ```json
    {
      "username": "string",
      "password": "string"
    }
    ```
  - Salida:
    ```json
    {
      "token": "string",
      "user": {
        "id": "integer",
        "username": "string",
        "email": "string"
      }
    }
    ```

- `POST /api/auth/register/`: Registrar nuevo usuario
  - Entrada:
    ```json
    {
      "username": "string",
      "email": "string",
      "password": "string",
      "password2": "string"
    }
    ```

## Usuarios y Perfiles

### Endpoints

- `GET /api/users/`: Listar usuarios (requiere autenticación)
- `GET /api/users/{id}/`: Obtener usuario específico
- `PUT /api/users/{id}/`: Actualizar usuario
- `DELETE /api/users/{id}/`: Eliminar usuario

### Estructura de Datos

```json
{
  "id": "integer",
  "username": "string",
  "email": "string",
  "user_profile": {
    "phone": "string",
    "address": "string",
    "birth_date": "date",
    "profile_picture": "string (URL)"
  }
}
```

## Documentos

### Endpoints

- `GET /api/documents/`: Listar documentos
- `POST /api/documents/`: Subir nuevo documento
- `GET /api/documents/{id}/`: Obtener documento específico
- `PUT /api/documents/{id}/`: Actualizar documento
- `DELETE /api/documents/{id}/`: Eliminar documento
- `GET /api/documents/{id}/document_content/`: Obtener contenido del documento

### Estructura de Datos

```json
{
  "id": "integer",
  "titulo": "string",
  "description": "string",
  "fecha": "date",
  "file_type": "string",
  "file_size": "string",
  "document": "string (URL)"
}
```

## Infraestructura

### Endpoints

- `GET /api/infrastructure/sections/`: Listar secciones
- `GET /api/infrastructure/habitats/`: Listar hábitats
- `GET /api/infrastructure/summary/`: Obtener resumen de infraestructura

### Estructura de Datos

#### Sección
```json
{
  "id": "integer",
  "name": "string",
  "num_habitats": "integer"
}
```

#### Hábitat
```json
{
  "id": "integer",
  "name": "string",
  "nums_animals": "integer",
  "description": "string",
  "section": "integer (ID)"
}
```

## Vida Silvestre

### Endpoints

- `GET /api/wildlife/species/`: Listar especies
- `GET /api/wildlife/species/{id}/`: Obtener especie específica
- `GET /api/wildlife/species/{id}/animals/`: Listar animales de una especie
- `GET /api/wildlife/conservation-status/`: Listar estados de conservación

### Estructura de Datos

#### Especie
```json
{
  "id": "integer",
  "name": "string",
  "scientific_name": "string",
  "description": "string",
  "image": "string (URL)",
  "conservation_status": {
    "id": "integer",
    "name": "string"
  }
}
```

#### Animal
```json
{
  "id": "integer",
  "name": "string",
  "age": "integer",
  "species": "integer (ID)",
  "conservation_status": "integer (ID)",
  "habitat": "integer (ID)"
}
```

## Educación

### Endpoints

- `GET /api/education/programs/`: Listar programas educativos
- `GET /api/education/instructors/`: Listar instructores
- `GET /api/education/services/`: Listar servicios educativos

### Estructura de Datos

#### Programa Educativo
```json
{
  "id": "integer",
  "title": "string",
  "description": "string",
  "image": "string (URL)",
  "items": [
    {
      "id": "integer",
      "text": "string"
    }
  ]
}
```

#### Instructor
```json
{
  "id": "integer",
  "user": "integer (ID)",
  "especialidad": "string",
  "experiencia_years": "integer",
  "bio": "string",
  "activo": "boolean"
}
```

## Exhibiciones

### Endpoints

- `GET /api/exhibitions/`: Listar exhibiciones
- `GET /api/exhibitions/{id}/`: Obtener exhibición específica
- `GET /api/exhibitions/{id}/images/`: Obtener imágenes de exhibición

### Estructura de Datos

```json
{
  "id": "integer",
  "title": "string",
  "description": "string",
  "images": [
    {
      "id": "integer",
      "image": "string (URL)"
    }
  ],
  "facts": [
    {
      "id": "integer",
      "text": "string"
    }
  ]
}
```

## Visitas

### Endpoints

- `GET /api/visits/`: Listar días de visita
- `POST /api/visits/`: Crear nuevo día de visita
- `GET /api/visits/{id}/`: Obtener día específico

### Estructura de Datos

```json
{
  "id": "integer",
  "day": "date",
  "total_slots": "integer",
  "occupied_slots": "integer"
}
```

## Órdenes de Compra

### Endpoints

- `GET /api/purchase-orders/`: Listar órdenes
- `POST /api/purchase-orders/`: Crear nueva orden
- `GET /api/purchase-orders/{id}/`: Obtener orden específica

### Estructura de Datos

```json
{
  "id": "integer",
  "order_date": "date",
  "purchase_date": "date",
  "total_price": "decimal",
  "total_crc": "decimal",
  "total_usd": "decimal",
  "email": "string",
  "qr_image": "string (URL)",
  "status": "string (PENDING|PAID|CANCELLED|FAILED)",
  "visit": "integer (ID)",
  "user": "integer (ID)"
}
```

## Pagos

### Endpoints

- `GET /api/payments/methods/`: Obtener métodos de pago disponibles
- `POST /api/payments/process/`: Procesar un pago
- `GET /api/payments/{id}/status/`: Verificar estado de un pago

### Estructura de Datos

#### Método de Pago
```json
{
  "id": "string",
  "nombre": "string"
}
```

#### Pago
```json
{
  "id": "integer",
  "amount": "decimal",
  "currency": "string",
  "payment_method": "string",
  "status": "string",
  "created_at": "datetime",
  "updated_at": "datetime"
}
```

## Notas Importantes

1. Autenticación:
   - La mayoría de los endpoints requieren autenticación mediante token JWT
   - Incluir el token en el header: `Authorization: Bearer <token>`

2. Permisos:
   - Algunos endpoints requieren roles específicos (admin, staff)
   - Los permisos se verifican a través de `IsAuthenticatedAndRole`

3. Formatos:
   - Las fechas se envían en formato ISO 8601: `YYYY-MM-DD`
   - Los archivos se suben mediante `multipart/form-data`
   - Las respuestas son en formato JSON

4. Paginación:
   - Las listas están paginadas por defecto
   - Usar parámetros `page` y `page_size` para navegar

5. Filtros:
   - Muchos endpoints soportan filtrado por campos específicos
   - Usar parámetros en la URL para filtrar

6. Errores:
   - Los errores siguen el formato estándar HTTP
   - Incluyen mensaje descriptivo en español