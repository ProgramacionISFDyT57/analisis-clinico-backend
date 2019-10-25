import{Usuario} from '../models/usuario';
import { Collection,Db, ObjectId } from 'mongodb';
export class UsuarioService {
    private usuario:Collection<any>;
    constructor(db:Db){
        this.usuario=db.collection('usuario')
    }
    public cargarusuario(usuario:Usuario):Promise<void>{
        return new Promise (async(resolve,rejects)=>{
            try{
                await this.usuario.insertOne(usuario)
                resolve();
            }
            catch(err){
                rejects(err);   
            }    
       });
    }
    public listarusuario():Promise<Usuario[]>{
        return new Promise (async(resolve,reject)=>{
            try{
                const usuario=await this.usuario.find().toArray();
                resolve(usuario);
            }
            catch(err){
                reject(err);
            }
       });
    }
    public borrarusuario(idusuario:string):Promise<void>{
        return new Promise (async(resolve,rejects)=>{
            try{
                const id=new ObjectId(idusuario);
                const me= await this.usuario.deleteOne({_id:id})
                if(me.result.n===1){
                   resolve(); 
                }
                else{ rejects('no se encontro el usuario');

                }
            }
            catch(err){
                rejects(err);
            }
       })
   }
   public modificarusuario (idusuario:string,valor:any):Promise<void>{
    return new Promise (async(resolve,rejects)=>{
        try{
            const id=new ObjectId(idusuario);
            const mod= await this.usuario.updateOne({_id:id},{$set:valor})
            resolve();
        }
         catch(err){
         rejects(err);
          }
    })
}
public buscarusuario (mail:string):Promise<Usuario>{
    return new Promise (async(resolve,rejects)=>{
        try{
         const de=await this.usuario.findOne({mail:mail});
            resolve(de);
        }
        catch(err){
        rejects(err);
        }
    })
}
    }