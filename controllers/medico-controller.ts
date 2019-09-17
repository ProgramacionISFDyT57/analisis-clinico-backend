import { Request, Response } from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import {Medico} from '../models/medico';
export class MedicoController{
    private conexion:MongoClient;
    private bd:string;
    private coleccion="medico";
    constructor(conectar:MongoClient,base:string){
        this.bd=base;
       this.conexion=conectar;
       this.Cargar=this.Cargar.bind(this);
       this.Listarmedicos=this.Listarmedicos.bind(this);
       this.Borrar=this.Borrar.bind(this);
    }
    public async Cargar (req:Request,res:Response){
        if(req.body.nombre&&req.body.apellido){
            const medico2:Medico={
                nombre:req.body.nombre,
                apellido:req.body.apellido,
            }
        const db=this.conexion.db(this.bd);
            const MedicoController=db.collection(this.coleccion);
            try{
                await MedicoController.insertOne(medico2);
                res.send('se pudo cargar el medico')
            }catch(err){
                console.error(err);
                res.status(500).json(err);
            }
        }
        else{ 
            console.log()
            res.status(400).send()
        }  
    }
    public async Listarmedicos (req:Request,res:Response){
        const db=this.conexion.db(this.bd);
        try{
             const medico=await db.collection(this.coleccion).find().toArray();
             console.log(medico);
             res.json(medico);
        }
        catch(err){
            console.log(err);
             res.status(500).json(err);
        }}
    public async Borrar(req:Request,res:Response){
            const db=this.conexion.db(this.bd);
            let nom=req.params.listarmedicos;
            try{const id=new ObjectId(req.params._id);
                const del=await db.collection(this.coleccion).deleteOne({"_id":id})
            console.log('se borraron'+del.result.n);
            console.log('se borro correctamente');
            res.send()  
        }catch(err){
            console.log(err);
            res.status(500).json(err);
        }
    }
}
