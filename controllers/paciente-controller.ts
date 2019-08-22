import { Request, Response } from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import{Paciente} from '../models/paciente';
export class PacienteController{
    private conexion:MongoClient;
    private bd:string;
    private coleccion="pacientes";
    constructor(conectar:MongoClient,base:string){
        this.bd=base;
       this.conexion=conectar;
       this.Crear=this.Crear.bind(this);
       this.Listarpacientes=this.Listarpacientes.bind(this);
       this.Borrar=this.Borrar.bind(this);
    }
    
   public async Crear (req:Request,res:Response){
        if(req.body.nombre&&req.body.apellido&&req.body.dni&&req.body.telefono){
            const paciente2:Paciente={
                nombre:req.body.nombre,
                apellido:req.body.apellido,
                dni:req.body.dni,
                telefono:req.body.telefono,
            }
            const db=this.conexion.db(this.bd);
            const pacientecoleccion=db.collection(this.coleccion);
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
    public async Listarpacientes (req:Request,res:Response){
        const db=this.conexion.db(this.bd);
        try{
            const pacientes=await db.collection(this.coleccion).find().toArray();
            console.log(pacientes);
            res.json(pacientes);
        }
        catch(err){
            console.log(err);
            res.status(500).json(err);
        }}
   public async Borrar(req:Request,res:Response){
            const db=this.conexion.db(this.bd);
            let nom=req.params.listarpacientes;
            try{const id=new ObjectId(req.params._id);
                const del=await db.collection(this.coleccion).deleteOne({"_id":id})
            console.log('se borraron'+del.result.n);
            console.log('se borro correctamente');
            res.send()  
        }catch(err){
            console.log(err);
            res.status(500).json(err);
        }
        };
}