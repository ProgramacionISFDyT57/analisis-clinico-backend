import{Analisis} from '../models/analasis';
import { Collection,Db, ObjectId } from 'mongodb';
export class AnalisisService {
    private analisis:Collection<any>;
    constructor(db:Db){
        this.analisis=db.collection('analisis')
    }
    public crearanalisis(analisis:Analisis):Promise<void>{
        return new Promise (async(resolve,rejects)=>{
            try{
                await this.analisis.insertOne(analisis)
                resolve();
            }
            catch(err){
                rejects(err);   
            }    
       });
    }
    public listaranalisis():Promise<Analisis[]>{
        return new Promise (async(resolve,reject)=>{
            try{
                const analisis=await this.analisis.find().toArray();
                resolve(analisis);
            }
            catch(err){
                reject(err);
            }
       });
    }
    public borraranalisis (idanalisis:string):Promise<void>{
        return new Promise (async(resolve,rejects)=>{
            try{
                const id=new ObjectId(idanalisis);
                const ana= await this.analisis.deleteOne({_id:id})
                if(ana.result.n===1){
                   resolve(); 
                }
                else{ rejects('no se encontro el analisis');

                }
            }
            catch(err){
                rejects(err);
            }
       })
   }
}