import 'dotenv/config'
import express,{Express,Request,Response} from 'express';
import mongoose from 'mongoose';
import router from "../routes/"

const app:Express=express();
app.use(express.json());
app.use('/',router());

app.get('/', (req:Request, res:Response) => {
  res.send('GET request to the homepage')
})

if(typeof process.env.DB==='string'){
    mongoose.connect(process.env.DB).
    then(()=>{
        console.log("Connected to Database");
        app.listen(process.env.PORT,()=> console.log(`Server started on port ${process.env.PORT}`));
    }).catch(
        (err)=>console.error(err)
    )
}