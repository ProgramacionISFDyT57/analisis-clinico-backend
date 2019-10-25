import { Request, Response } from 'express';
import { MongoClient, ObjectId, Db } from 'mongodb';
import { UsuarioService } from '../service/usuario-service';
import bcrypt= require('bcryptjs');
import jwt= require('jsonwebtoken');
import { Token } from '../models/token';
export class AutenticacionController{
    private conexion:MongoClient;
    private usuarioservice:UsuarioService;
    private contraseña='SaaQy%nZa(c8kTl1Oq#z';
    constructor(conectar:MongoClient,base:string){
        this.conexion=conectar;
        const db=this.conexion.db(base);
       this.login= this.login.bind(this);
       this.usuarioservice= new UsuarioService(db);
}
public async login (req:Request,res:Response){
    if(req.body.mail&&req.body.clave){
        try{
        const usuariodb= await this.usuarioservice.buscarusuario(req.body.mail);
            if(usuariodb){
                const resultado= await bcrypt.compare(req.body.clave,usuariodb.clave);
                if(resultado){
                const tokenusuario:Token={
                    mail:req.body.mail,
                    nombre:usuariodb.nombre,
                    fecha:new Date().toISOString(),
                }
                const token= await jwt.sign(tokenusuario,this.contraseña);
                console.log('sesion iniciada');
                res.status(200).send(token);
                }
                else{
                console.log('Contraseña incorrecta');
                res.status(401).send();
                }
            }
            else{
            console.log('el usuario no existe');
            res.status(401).send();
            } 
        }catch(err){
            console.error(err);
            res.status(500).json(err);
        }
     }
    else {
        console.log('faltan parametros');
    }
}
}
