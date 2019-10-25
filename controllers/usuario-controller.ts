import { Request, Response } from 'express';
import { MongoClient, ObjectId, Db } from 'mongodb';
import {Usuario} from '../models/usuario';
import { UsuarioService } from '../service/usuario-service';
import bcrypt= require('bcryptjs');
export class UsuarioController{
    private conexion:MongoClient;
    private bd:string;
    private coleccion="usuario";
    private usuarioservice:UsuarioService;
    constructor(conectar:MongoClient,base:string){
        this.bd=base;
       this.conexion=conectar;
       this.Cargar=this.Cargar.bind(this);
       this.Listarusuarios=this.Listarusuarios.bind(this);
       this.Modificar=this.Modificar.bind(this);
       this.Borrar=this.Borrar.bind(this);
       const db=this.conexion.db(this.bd);
       this.usuarioservice= new UsuarioService(db);
    }
    public async Cargar (req:Request,res:Response){
        if(req.body.nombre&&req.body.mail&&req.body.clave){
            try{
                const hash= await bcrypt.hash(req.body.clave,5)
                const usuario2:Usuario={
                nombre:req.body.nombre,
                mail:req.body.mail,
                clave:hash,
                }
               await this.usuarioservice.cargarusuario(usuario2);
                res.send('se pudo cargar el usuario');
            }catch(err){
                console.error(err);
                res.status(500).json(err);
            }
        }
        else{ 
            console.log()
            res.status(400).send();
        }  
    }
    public async Listarusuarios (req:Request,res:Response){
        const db=this.conexion.db(this.bd);
        try{
            const listadousuario=await this.usuarioservice.listarusuario();
             console.log(listadousuario);
             res.json(listadousuario);
        }
        catch(err){
            console.log(err);
             res.status(500).json(err);
        }}
    public async Borrar(req:Request,res:Response){
        const db=this.conexion.db(this.bd);
        let nom=req.params.listarusuario;
        try{
            const borrarusuario= await this.usuarioservice.borrarusuario(req.params._id);
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
   if(req.body.nombre||req.body.mail||req.body.clave){
      try{
          await this.usuarioservice.modificarusuario(req.params._id,req.body);
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
  public async Buscarusuario(req:Request,res:Response){
    try{
        const Buscarusuario= await this.usuarioservice.buscarusuario(req.query);
        res.send(Buscarusuario);
    }catch (err){
        console.log(err);
    res.status(500).json(err);
    }
}
}