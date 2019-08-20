import { MongoClient, ObjectId } from 'mongodb';
const conexión = new MongoClient('mongodb://localhost:27017', {useNewUrlParser: true});
import { Request, Response } from 'express';
import * as express from 'express';
import * as bodyparser from 'body-parser';
import{Paciente} from './models/paciente';
const app = express();
app.use(bodyparser.json());
const port = 4000;
app.get('/',async(req:Request,res:Response)=>{
    res.send('funcionando laboratorio clinico backend')
});
const bd='analisis-clinicos';
const coleccion='pacientes';
async function crear (req:Request,res:Response){
    if(req.body.nombre&&req.body.apellido&&req.body.dni&&req.body.telefono){
        const paciente2:Paciente={
            nombre:req.body.nombre,
            apellido:req.body.apellido,
            dni:req.body.dni,
            telefono:req.body.telefono,
        }
        const db=conexión.db(bd);
        const pacientecoleccion=db.collection(coleccion);
        try{
            await pacientecoleccion.insertOne(paciente2);
            res.send('se pudo cargar el paciente')
        }catch(err){
            console.error(err);
            res.status(500).json(err);
        }
    }
    else{ 
        console.log()
        res.status(400).send()}
}
async function listarpacientes (req:Request,res:Response){
    const db=conexión.db(bd);
    try{
        const pacientes=await db.collection(coleccion).find().toArray();
        console.log(pacientes);
        res.json(pacientes);
    }
    catch(err){
        console.log(err);
        res.status(500).json(err);
    }}
async function borrar(req:Request,res:Response){
        const db=conexión.db(bd);
        let nom=req.params.listarpacientes;
        try{const id=new ObjectId(req.params._id);
            const del=await db.collection(coleccion).deleteOne({"_id":id})
        console.log('se borraron'+del.result.n);
        console.log('se borro correctamente');
        res.send()  
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
    };
app.delete('/borrar/:_id',borrar);
app.post('/crear',crear);        
app.get('/listarpacientes',listarpacientes);



conexión.connect().then(async()=>{
    app.listen(port, () => {
        console.log(`Servidor de ejemplo escuchando en puerto ${port}!`);
    });
})