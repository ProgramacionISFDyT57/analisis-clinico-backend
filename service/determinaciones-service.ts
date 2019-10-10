import{Determinaciones} from '../models/determinaciones';
import { Collection,Db, ObjectId } from 'mongodb';
import { rejects } from 'assert';
export class Determinacionesservice{
    private determinaciones:Collection<any>;
    constructor(db:Db){
        this.determinaciones=db.collection('determinaciones')
    }
    public listardeterminaciones():Promise<Determinaciones[]>{
        return new Promise (async(resolve,reject)=>{
            try{
                const determinaciones=await this.determinaciones.find().toArray();
                resolve(determinaciones);
            }
            catch(err){
                reject(err);
            }
       });
    }
    public creardeterminaciones(determinaciones:Determinaciones):Promise<void>{
        return new Promise (async(resolve,rejects)=>{
            try{
                await this.determinaciones.insertOne(determinaciones)
                resolve();
            }
            catch(err){
                rejects(err);   
            }    
       });
    }
    public borrardeterminaciones (iddeterminacion:string):Promise<void>{
        return new Promise (async(resolve,rejects)=>{
            try{
                const id=new ObjectId(iddeterminacion);
                const det= await this.determinaciones.deleteOne({_id:id})
                if(det.result.n===1){
                   resolve(); 
                }
                else{ rejects('no se encontro la determinacion');

                }
            }
            catch(err){
                rejects(err);
            }
       })
   }
   public modificardeterminaciones (iddeterminacion:string,valor:any):Promise<void>{
       return new Promise (async(resolve,rejects)=>{
           try{
               const id=new ObjectId(iddeterminacion);
               const mod= await this.determinaciones.updateOne({_id:id},{$set:valor})
               resolve();
           }
            catch(err){
            rejects(err);
             }
       })
   }
}

