Coffee-Shop
## Grupo
### Integrantes
* 47896 - Bonanno, Juan Cruz
* 52977 - Bentancour, Felipe
* 47817 - Fernandez, Felipe M 

### Repositorios
* [frontend app](http://hyperlinkToGihubOrGitlab)
* [backend app](http://hyperlinkToGihubOrGitlab)

## Tema
### Descripción
Coffe-Shop es una plataforma en línea dedicada a la venta de café de alta calidad y productos relacionados. Ofrecemos granos de café de origen único, accesorios para café y productos gourmet. Nuestro objetivo es proporcionar a los amantes del café una experiencia de compra única y satisfactoria, brindando buenos productos y de calidad superior.

## Alcance Funcional 

### Alcance Mínimo

*Nota*: el siguiente es un ejemplo para un grupo de 3 integrantes para un sistema de hotel. El 

Regularidad:
|Req|Detalle|
|:-|:-|
|CRUD simple|1. CRUD Tipo producto<br>2. CRUD Pedido<br>3. CRUD Cliente|
|CRUD dependiente|1. CRUD Habitación {depende de} CRUD Tipo Habitacion<br>2. CRUD Cliente {depende de} CRUD Localidad|
|Listado<br>+<br>detalle| 1. Listado de habitaciones filtrado por tipo de habitación, muestra nro y tipo de habitación => detalle CRUD Habitacion<br> 2. Listado de reservas filtrado por rango de fecha, muestra nro de habitación, fecha inicio y fin estadía, estado y nombre del cliente => detalle muestra datos completos de la reserva y del cliente|
|CUU/Epic|1. Reservar una habitación para la estadía<br>2. Realizar el check-in de una reserva|
