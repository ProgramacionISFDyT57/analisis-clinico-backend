import { Request, Response } from 'express';
import { MongoClient, ObjectId, Db } from 'mongodb';
import {Especialidades} from '../models/especialidades';
import { DeterminacionesController } from './determinaciones-controller';
import { EspecialidadesDto } from '../models/especialidades-dto';
import { Determinaciones } from '../models/determinaciones';
export class EspecialidadesController{
    private conexion:MongoClient;
    private bd:string;
    private coleccion="especialidades";
    constructor(conectar:MongoClient,base:string){
       this.bd=base;
       this.conexion=conectar;
       this.Cargar=this.Cargar.bind(this);
       this.Listarespecialidades=this.Listarespecialidades.bind(this);
       this.Borrar=this.Borrar.bind(this);
       this.Modificar=this.Modificar.bind(this);
    }
    public async Cargar (req:Request,res:Response){
        if(req.body.especialidad&&req.body.determinaciones){
            const especialidades2:Especialidades={
                especialidad:req.body.especialidad,
                determinaciones:req.body.determinaciones,
            }
             const db=this.conexion.db(this.bd);
            let detok=true;
            try{
                for(const determinacion of especialidades2.determinaciones){
                    const iddeterminacion=new ObjectId(determinacion);
                    const resultadodeterminacion= await db.collection("determinaciones").findOne({_id:iddeterminacion});
                    console.log(resultadodeterminacion);
                    if(!resultadodeterminacion){
                        detok=false;
                    }
                 }     
                if(detok){
                    const EspecialidadesController=db.collection(this.coleccion);
                    await EspecialidadesController.insertOne(especialidades2);
                    res.send('se pudo cargar la especialidad')
                }
                else{console.log('no existe la determinacion');
                     res.status(400).send();
                 }
            }   
            catch(err){
                console.error(err);
                res.status(500).json(err);
            }
        }    
        else{ 
            console.log()
            res.status(400).send()
            }
    }    
        
       public async Listarespecialidades (req:Request,res:Response){
        const db=this.conexion.db(this.bd);
        try{
            const especialidadarreglo:EspecialidadesDto[]=[];
             const especialidad=await db.collection(this.coleccion).find().toArray();
             for(const esp of especialidad){
                 const especialidadnueva:EspecialidadesDto={
                     determinaciones:[],
                    especialidad:esp.especialidad
                 }
                 for(const det of esp.determinaciones){
                     const determinacione=new ObjectId(det);
                     const deter=await db.collection('determinaciones').findOne({_id:determinacione})
                     console.log(deter);
                    const nuevadeterminacion:Determinaciones={
                        nombre:deter.nombre,
                        valor:deter.valor,
                        valoresDeReferencia:deter.valoresDeReferencia,
                        unidad:deter.unidad,
                        codigo:deter.codigo,

                    }
                    especialidadnueva.determinaciones.push(nuevadeterminacion);
                 }
                 especialidadarreglo.push(especialidadnueva);
             }
             console.log(especialidadarreglo);
             res.json(especialidadarreglo);
        }
        catch(err){
            console.log(err);
             res.status(500).json(err);
        }}
        public async Borrar(req:Request,res:Response){
            const db=this.conexion.db(this.bd);
            let nom=req.params.Listarespecialidades;
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
       if(req.body.especialidad||req.body.determinaciones){
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


