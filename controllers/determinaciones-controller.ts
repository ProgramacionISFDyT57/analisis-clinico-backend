import { Request, Response } from 'express';
import { MongoClient, ObjectId, Db } from 'mongodb';
import {Determinaciones} from '../models/determinaciones';
import { RSA_NO_PADDING } from 'constants';
import{Determinacionesservice} from '../service/determinaciones-service'
export class DeterminacionesController{
    private conexion:MongoClient;
    private bd:string;
    private coleccion="determinaciones";
    private determinacionesservice: Determinacionesservice;
    constructor(conectar:MongoClient,base:string){
       this.bd=base;
       this.conexion=conectar;
       this.Cargar=this.Cargar.bind(this);
       this.Listardeterminaciones=this.Listardeterminaciones.bind(this);
       this.Borrar=this.Borrar.bind(this);
       this.Modificar=this.Modificar.bind(this);
       const db=this.conexion.db(this.bd);
       this.determinacionesservice= new Determinacionesservice(db);
       this.Buscardeterminacion=this.Buscardeterminacion.bind(this);
       
    }
    public async Cargar (req:Request,res:Response){
        if(req.body.nombre&&req.body.valor&&req.body.valoresDeReferencia&&req.body.unidad&&req.body.codigo){
            const determinaciones2:Determinaciones={
                nombre:req.body.nombre,
                valor:req.body.valor,
                valoresDeReferencia:req.body.valoresDeReferencia,
                unidad:req.body.unidad,
                codigo:req.body.codigo,
            }
        const db=this.conexion.db(this.bd);
            const DeterminacionesController=db.collection(this.coleccion);
            try{
                await this.determinacionesservice.creardeterminaciones(determinaciones2);
                res.send('se pudo cargar la determinacion')
            }catch(err){
                console.error(err);
                res.status(500).json(err);
            }
        }
        else{ 
            console.log()
            res.status(400).send('falta algun campo para cargar una derminacion')
        }  
    }
    public async Listardeterminaciones (req:Request,res:Response){
        const db=this.conexion.db(this.bd);
        try{
            const determinacion=await this.determinacionesservice.listardeterminaciones();
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
            try{
                const borrarespecialidad= await this.determinacionesservice.borrardeterminaciones(req.params._id);
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
       if(req.body.valor||req.body.valoresDeReferencia||req.body.unidad){
          try{
              await this.determinacionesservice.modificardeterminaciones(req.params._id,req.body);
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
   public async Buscardeterminacion(req:Request,res:Response){
    try{
        const Buscardeterminacion= await this.determinacionesservice.buscardeterminacion(req.query);
        res.send(Buscardeterminacion);
    }catch (err){
        console.log(err);
    res.status(500).json(err);
    }
}
}

