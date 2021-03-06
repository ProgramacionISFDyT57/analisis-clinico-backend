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
<br>**PACIENTES**<br>
<br>**GET/pacientes**
<br>Devuelve el listado de todos los pacientes<br>
<br>**Requiere rol de acceso**<br>
-Técnicos y bioquimicos<br>
<br>**Formato de respuesta**<br>
<br>[
   <br>{
        "_id": "1",<br>
        "nombre": "",<br>
        "apellido": "",<br>
        "dni": "",<br>
        "telefono":"" <br>
    }<br>
]<br>
<br>**POST/pacientes**<br>
<br>Crea un paciente<br>
<br>**Requiere rol de acceso**<br>
-Técnicos y bioquímicos<br>
<br>**Request body**<br>
<br>[<br>
<br>{<br>
nombre:"";<br>
apellido:"";<br>
dni:"";<br>
telefono:"";<br>
<br>}<br>
]<br>
<br>**Formato de respuesta**
<br>{<br>
<br>"mensaje":"Se pudo cargar el paciente"<br>
<br>}
<br><br>**MEDICO**
<br><br>**POST/Medico**
<br>Carga un medico
<br><br>**Request body**
<br>[
<br>{
<br>"nombre":" ",
<br>"apellido":" "
<br>}
<br>]
<br>**Formato de respuesta**
<br>{
<br>Mensaje:"se pudo cargar el medico"
<br>}
<br><br>**GET/Medico**
<br>Devuelve el listado de los medicos
<br><br> **Formato de respuesta**
<br>[
    <br>{
        <br>"_id": "",
        <br>"nombre": "",
        <br>"apellido": ""
    <br>}
<br>]
<br><br>**DETERMINACIONES**
<br><br>**POST/determinaciones**
<br>Crea una determinacion
<br>**Request body**
<br>[
<br>{
    <br>nombre:" ",
    <br>valor:" ",
    <br>valoresDeReferencia:" ",
    <br>unidad:"",
    <br>codigo:" "
<br>}
<br>]
<br>**Formato de respuesta**
<br>{
<br>"mensaje":"se pudo cargar la determinación"
<br>}
<br>**GET/determinaciones**
<br>Devuelve el listado de las determinaciones
<br>**Formato de respuesta**
<br>[
<br>{
        <br>"_id": "",
        <br>"nombre": "",
        <br>"valor": "",
        <br>"valoresDeReferencia":"",
        <br>"unidad": "",
        <br>"codigo": 
    <br>}
    <br>]
 <br><br>**ESPECIALIDAD**
 <br>**POST/especialidad**
 <br>Crea una especialidad
 <br>**Request body**
 <br>[
 <br>{
<br>especialidad:"",
<br>determinaciones:string[]
<br>}
<br>**Formato de respuesta**
<br>{
<br>"mensaje":"se pudo cargar la especialidad"
<br>}**GET/especialidad**
<br>Devuelve el listado de las especialidades
<br>**Formato de respuesta**
<br>[
<br>{
        <br>"id": "1",
        <br>"determinaciones": [],
        <br>"especialidad": ""
    <br>}
    <br>]
 <br><br>**ANALISIS**
 <br>**POST/analisis**
 <br>Crea un analisis
 <br>**Request body**
 <br>[
 <br>{
    <br>pacienteid:" ",
    <br>fecha:" ",
    <br>medico:" ",
    <br>codigo:" ",
   <br>especialidades:string[];
<br>}
<br>]
<br><br>**GET/analisis**
<br>Devuelve el listado de todos los analisis
<br>**Formato de respuesta**
<br>
<br><br>**USUARIO**
<br><br>**POST/usuario**
<br>Carga un usuario
<br>**Request body**
<br>[
<br>{
<br> nombre:"",
    <br>mail:"",
    <br>clave:""
<br>}
<br>]
<br>**Formato de respuesta**
<br>{
"mensaje":"se pudo cargar el usuario"
<br>}
<br>**GET/usuario**
<br>Devuelve el listado de todos los usuarios
<br>**Formato de respuesta**
<br>[
<br>{
<br>"id":" ",
<br>"nombre":" ",
<br>"mail":" ",
<br>"clave":" "
<br>}
<br>]


