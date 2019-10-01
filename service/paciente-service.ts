import{Paciente} from '../models/paciente';
import { Collection,Db, ObjectId } from 'mongodb';
export class PacienteService {
    private paciente:Collection<any>;
    constructor(db:Db){
        this.paciente=db.collection('pacientes')
    }
    public listarpaciente():Promise<Paciente[]>{
        return new Promise (async(resolve,reject)=>{
            try{
                const pacientes=await this.paciente.find().toArray();
                resolve(pacientes);
            }
            catch(err){
                reject(err);
            }
       });
    }
    public crearpaciente(paciente:Paciente):Promise<void>{
        return new Promise (async(resolve,rejects)=>{
            try{
                await this.paciente.insertOne(paciente)
                resolve();
            }
            catch(err){
                rejects(err);   
            }    
       });
    }
    public borrarpaciente (idpaciente:string):Promise<void>{
        return new Promise (async(resolve,rejects)=>{
            try{
                const id=new ObjectId(idpaciente);
                const pa= await this.paciente.deleteOne({_id:id})
                if(pa.result.n===1){
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
}
