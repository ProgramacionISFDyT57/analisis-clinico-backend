import { Request, Response } from 'express';
import { MongoClient, ObjectId, Db } from 'mongodb';
import {Determinaciones} from '../models/determinaciones';
import { RSA_NO_PADDING } from 'constants';
export class DeterminacionesController{
    private conexion:MongoClient;
    private bd:string;
    private coleccion="pacientes";
    constructor(conectar:MongoClient,base:string){
       this.bd=base;
       this.conexion=conectar;
       this.Cargar=this.Cargar.bind(this);
       this.Listardeterminaciones=this.Listardeterminaciones.bind(this);
       this.Borrar=this.Borrar.bind(this);
       this.Modificar=this.Modificar.bind(this);
    }
    public async Cargar (req:Request,res:Response){
        if(req.body.nombre&&req.body.valor&&req.body.valoresDeReferencia&&req.body.codigo){
            const determinaciones2:Determinaciones={
                nombre:req.body.nombre,
                valor:req.body.valor,
                valoresDeReferencia:req.body.valoresDeReferencia,
                codigo:req.body.codigo,
            }
        const db=this.conexion.db(this.bd);
            const DeterminacionesController=db.collection(this.coleccion);
            try{
                await DeterminacionesController.insertOne(determinaciones2);
                res.send('se pudo cargar la determinacion')
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
    public async Listardeterminaciones (req:Request,res:Response){
        const db=this.conexion.db(this.bd);
        try{
             const determinacion=await db.collection(this.coleccion).find().toArray();
             console.log(determinacion);
             res.json(determinacion);
        }
        catch(err){
            console.log(err);
             res.status(500).json(err);
        }}
        public async Borrar(req:Request,res:Response){
            const db=this.conexion.db(this.bd);
            let nom=req.params.Listardeterminaciones;
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
    public async Modificar (req:Request,res:Response){
        const db=this.conexion.db(this.bd);
        const id=new ObjectId(req.params._id);
       if(req.body.valor||req.body.valoresDeReferencia){
          try{
              const del=await db.collection(this.coleccion).updateOne({_id:id},
          {$set:req.body})
         console.log('Se modifico correctamente');
          res.send()
        }catch(err){
            console.log(err);
            res.status(500).json(err);
        }}
        else{
            (console.log('No se modifico ningun parametro'));
        res.status(400).send()
      }
   }
}

