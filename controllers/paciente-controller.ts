import { Request, Response } from 'express';
import { MongoClient, ObjectId, Db } from 'mongodb';
import{Paciente} from '../models/paciente';
import{PacienteService} from '../service/paciente-service';
import jwt= require('jsonwebtoken');
export class PacienteController{
    private conexion:MongoClient;
    private bd:string;
    private coleccion="pacientes";
    private pacienteservice:PacienteService;
    private contraseña='SaaQy%nZa(c8kTl1Oq#z';
    constructor(conectar:MongoClient,base:string){
        this.bd=base;
       this.conexion=conectar;
       this.Crear=this.Crear.bind(this);
       this.Listarpacientes=this.Listarpacientes.bind(this);
       this.Borrar=this.Borrar.bind(this);
       this.Buscarpaciente=this.Buscarpaciente.bind(this);  
       this.Buscadorpaciente=this.Buscadorpaciente.bind(this);
       const db=this.conexion.db(this.bd);
       this.pacienteservice= new PacienteService(db);
       
    }


   public async Crear (req:Request,res:Response){
        if(req.body.nombre&&req.body.apellido&&req.body.dni&&req.body.telefono){
            const paciente2:Paciente={
                nombre:req.body.nombre,
                apellido:req.body.apellido,
                dni:req.body.dni,
                telefono:req.body.telefono,
            }
            try{
                await this.pacienteservice.crearpaciente(paciente2);
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
             const pacientes=await this.pacienteservice.listarpaciente();
             console.log(pacientes);
             console.log(res.locals);
             res.json(pacientes);
        } catch(err){
            console.log(err);
            res.status(500).json(err);
        }
    }
   public async Borrar(req:Request,res:Response){
            const db=this.conexion.db(this.bd);
            let nom=req.params.listarpacientes;
            try{
                const borrarpaciente= await this.pacienteservice.borrarpaciente(req.params._id);
            console.log('se borro correctamente');
            res.send()  
        }catch(err){
            console.log(err);
            res.status(500).json(err);
        }
   };
    public async Buscarpaciente(req:Request,res:Response){
        const db=this.conexion.db(this.bd);
        let nom=req.params.Buscarpaciente;
        try{
            const Buscarpaciente= await this.pacienteservice.buscarpaciente(req.params._id);
            console.log('paciente encontrado');
            res.send()
        }catch (err){
            console.log(err);
            res.status(500).json(err);
        }
    }
    public async Buscadorpaciente(req:Request,res:Response){
        const db=this.conexion.db(this.bd);
      
        try{
            const Buscadorpaciente= await this.pacienteservice.buscadorpaciente(req.query);
            res.send(Buscadorpaciente);
        }catch (err){
            console.log(err);
        res.status(500).json(err);
    }
        
    }
}
