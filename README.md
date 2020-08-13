# analisis-clinico-backend 
#**SISTEMA PARA LABORATORIO DE ANÁLISIS CLÍNICO**
<br>Este sistema busca brindar una plataforma para aumentar la eficiencia de la tarea administrativa acortando los tiempos un 40% en los que
se registra cada paciente y sus determinaciones correspondientes. Optimizar un 50% la entrega de los resultados, y la búsqueda de información. Almacenando la información de manera digital, se va lograr un 80% de espacio físico.<br>Dentro de los objetivos y alcances de este sistema encontrarán:

<br>-El sistema contará con un registro de pacientes, determinaciones, médicos y laboratorios externos.
<br>-Los pacientes se podrán clasificar por: Pacientes internados, pacientes ambulatorios y pacientes de urgencia.
<br>-Los médicos podrán solicitar un historial de análisis del paciente.
<br>-Mayor fluidez con las determinaciones que se realizan en los laboratorios externos.
<br>-Los informes van a ser digitalizados, donde se va a reducir el margen de error humano.
<br>-Almacenando la información de manera digital, se va a lograr más espacio físico.
<br>-Almacenando la información en la nube, se va a lograr que la misma este mas segura.

**RUTA** https://localhost:4000

**Autenticación**
<br>Todas las rutas (excepto /login) deben recibir el siguiente header.
<br>**Header**<br>
{ 
<br>"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9" <br>
}<br>
<br>**LOGIN**<br>
<br>**POST/LOGIN**<br>
<br>Devuelve token de autenticación requerido para el resto de los Requests.
<br>
<br>**Request body**
<br>{
	<br>"email": "usuario@hotmail.com",
	<br>"clave": "5050"
<br>}
<br>
<br>**Formato de respuesta**
<br>{
<br>"mensaje":"sesión iniciada",
<br>"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
<br>}



