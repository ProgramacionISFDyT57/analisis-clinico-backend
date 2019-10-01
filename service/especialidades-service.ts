import{Especialidades} from '../models/especialidades';
import { Collection,Db, ObjectId } from 'mongodb';
import { rejects } from 'assert';
export class Especialidadesservice{
    private especialidades:Collection<any>;
    constructor(db:Db){
        this.especialidades=db.collection('especialidades')
    }
    public listarespecialidades():Promise<Especialidades[]>{
        return new Promise (async(resolve,reject)=>{
            try{
                const especialidades=await this.especialidades.find().toArray();
                resolve(especialidades);
            }
            catch(err){
                reject(err);
            }
       });
    }
    public crearespecialidades(especialidades:Especialidades):Promise<void>{
        return new Promise (async(resolve,rejects)=>{
            try{
                await this.especialidades.insertOne(especialidades)
                resolve();
            }
            catch(err){
                rejects(err);   
            }    
       });
    }
    public borrarespecialidades (idespecialidad:string):Promise<void>{
        return new Promise (async(resolve,rejects)=>{
            try{
                const id=new ObjectId(idespecialidad);
                const esp= await this.especialidades.deleteOne({_id:id})
                if(esp.result.n===1){
                   resolve(); 
                }
                else{ rejects('no se encontro la especialidad');

                }
            }
            catch(err){
                rejects(err);
            }
       })
   }
   public modificarespecialidades (idespecialidad:string,valor:any):Promise<void>{
       return new Promise (async(resolve,rejects)=>{
           try{
               const id=new ObjectId(idespecialidad);
               const mod= await this.especialidades.updateOne({_id:id},{$set:valor})
               resolve();
           }
            catch(err){
            rejects(err);
             }
       })
   }
}
