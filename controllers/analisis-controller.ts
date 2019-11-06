import { Request, Response } from 'express';
import { MongoClient, ObjectId, Db } from 'mongodb';
import {Analisis} from '../models/analasis';
import{AnalisisService} from '../service/analisis-service';
import { RSA_NO_PADDING } from 'constants';
import { PacienteService } from '../service/paciente-service';
import { Determinacionesservice } from '../service/determinaciones-service';
import{Especialidadesservice} from '../service/especialidades-service';
export class Analisiscontroller{
    private conexion:MongoClient;
    private bd:string;
    private coleccion="analisis";
    private analisisservice: AnalisisService;
    private pacienteservice: PacienteService;
    private especialidadesservice: Especialidadesservice;
    constructor(conectar:MongoClient,base:string){
       this.bd=base;
       this.conexion=conectar;
       this.Cargar=this.Cargar.bind(this);
       this.Listaranalisis=this.Listaranalisis.bind(this);
       const db=this.conexion.db(this.bd);
       this.analisisservice= new AnalisisService(db);
       this.pacienteservice= new PacienteService(db);
       this.especialidadesservice= new Especialidadesservice(db);
       this.Buscaranalisis=this.Buscaranalisis.bind(this);
       this.Modificar=this.Modificar.bind(this);
    }
    public async Cargar(req:Request,res:Response){
        if(req.body.pacienteid&&req.body.medico&&req.body.codigo&&req.body.especialidades){
            const analisis2:Analisis={
                pacienteid:req.body.pacienteid,
                fecha:new Date().toISOString(),
                medico:req.body.medico,
                codigo:req.body.codigo,
                especialidades:req.body.especialidades
            }
            const db=this.conexion.db(this.bd);
            const coleccionanalisis=db.collection(this.coleccion);
            try{
                const pacientedb= await this.pacienteservice.buscarpaciente(req.body.pacienteid);
                console.log(pacientedb);
                if(pacientedb){
                    let v=true;
                    for(const idespecialidad of req.body.especialidades){
                        const espedb=await this.especialidadesservice.buscarespecialidad(idespecialidad);
                        if(!espedb){
                             v=false;
                        } 
                    }
                    if(v){
                        await this.analisisservice.crearanalisis(analisis2);
                        res.send('analisis cargado exitosamente')

                    } else{
                        console.log()
                        res.status(400).send('no se encuentra la especialidad')
                        }
                } else{
                    console.log()
                    res.status(400).send('no se encuentra el paciente')
                 }
            }catch(err){
                console.error(err);
                res.status(500).json(err);
            }
        }
        else{ 
            console.log()
            res.status(400).send('falta algun campo para cargar el analisis')
        }  
    }
    public async Listaranalisis (req:Request,res:Response){
        try{
            const listadodeanalisis=await this.analisisservice.listaranalisis;
            res.json(listadodeanalisis);
        }
        catch(err){
            console.log(err);
            res.status(500).json(err);
        }}
    public async Buscaranalisis(req:Request,res:Response){
         const db=this.conexion.db(this.bd);
          
         try{
            const Buscaranalisis= await this.analisisservice.buscaranalisis(req.query);
            if(Buscaranalisis.length===0){
                res.send('no se encuentra el analisis')
            }
            else{
            res.json(Buscaranalisis);
            }
        }catch (err){
            console.log(err);
            res.status(500).json(err);
        }
        }
        public async Modificar (req:Request,res:Response){
            const db=this.conexion.db(this.bd);
            const id=new ObjectId(req.params._id);
           if(req.body.pacienteid||req.body.fecha||req.body.medico||req.body.codigo||req.body.especialidades){
              try{
                await this.analisisservice.modificaranalisis(req.params._id,req.body);
                  console.log('Se modifico correctamente');
                    res.send()
            }catch(err){
                console.log(err);
                res.status(500).json(err);
            }}
            else{
                (console.log('No se modifico ningun parametro'));
            res.status(400).send()
          }}
    }
    
    


    