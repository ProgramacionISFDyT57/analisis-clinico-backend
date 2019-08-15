import { MongoClient, ObjectId } from 'mongodb';
const conexión = new MongoClient('mongodb://localhost:27017', {useNewUrlParser: true});
import { Request, Response } from 'express';
import * as express from 'express';
import * as bodyparser from 'body-parser';
const app = express();
app.use(bodyparser.json());
const port = 3000;
app.get('/',async(req:Request,res:Response)=>{
    res.send('funcionando laboratorio clinico backend')
});


conexión.connect().then(async()=>{
    app.listen(port, () => {
        console.log(`Servidor de ejemplo escuchando en puerto ${port}!`);
    });
})