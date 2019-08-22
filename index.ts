import { MongoClient, ObjectId } from 'mongodb';
const conexion = new MongoClient('mongodb://localhost:27017', {useNewUrlParser: true});
import { Request, Response } from 'express';
import * as express from 'express';
import * as bodyparser from 'body-parser';
import{Paciente} from './models/paciente';
import { PacienteController } from './controllers/paciente-controller';
const app = express();
app.use(bodyparser.json());
const port = 4000;
app.get('/',async(req:Request,res:Response)=>{
    res.send('funcionando laboratorio clinico backend')
});
const bd='analisis-clinicos';
const coleccion='pacientes';
const pacientesController=new PacienteController(conexion,bd);
   
app.delete('/pacientes/:_id',pacientesController.Borrar);
app.post('/pacientes',pacientesController.Crear);        
app.get('/pacientes',pacientesController.Listarpacientes);



conexión.connect().then(async()=>{
    app.listen(port, () => {
        console.log(`Servidor de ejemplo escuchando en puerto ${port}!`);
    });
})