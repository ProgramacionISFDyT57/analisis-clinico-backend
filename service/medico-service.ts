import{Medico} from '../models/medico';
import { Collection,Db, ObjectId } from 'mongodb';
export class MedicoService {
    private medico:Collection<any>;
    constructor(db:Db){
        this.medico=db.collection('medico')
    }
    public listarmedico():Promise<Medico[]>{
        return new Promise (async(resolve,reject)=>{
            try{
                const medico=await this.medico.find().toArray();
                resolve(medico);
            }
            catch(err){
                reject(err);
            }
       });
    }
    public cargarmedico(medico:Medico):Promise<void>{
        return new Promise (async(resolve,rejects)=>{
            try{
                await this.medico.insertOne(medico)
                resolve();
            }
            catch(err){
                rejects(err);   
            }    
       });
    }
    public borrarmedico(idmedico:string):Promise<void>{
        return new Promise (async(resolve,rejects)=>{
            try{
                const id=new ObjectId(idmedico);
                const me= await this.medico.deleteOne({_id:id})
                if(me.result.n===1){
                   resolve(); 
                }
                else{ rejects('no se encontro el medico');

                }
            }
            catch(err){
                rejects(err);
            }
       })
   }
   public buscarmedico (busqueda:any):Promise<Medico[]>{
        return new Promise (async(resolve,rejects)=>{
            try{
             const me=await this.medico.find(busqueda).toArray();
                resolve(me);
            }
            catch(err){
            rejects(err);
            }
        })
    }
}
