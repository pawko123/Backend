import 'dotenv/config'
import express,{Express,Request,Response} from 'express';
import mongoose from 'mongoose';
import router from "./routes"
import cors from "cors"
import swaggerUi from "swagger-ui-express"
import YAML from "yaml"
import fs from "fs";
const app:Express=express();

//dokumentacja
const yamlfile  = fs.readFileSync('documentation.yaml', 'utf8')
const swaggerDocument = YAML.parse(yamlfile)
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json());
app.use(cors())
app.use('/',router());
app.use(express.static('../Backend'))

app.get('/', (req:Request, res:Response) => {
  res.send('GET request to the homepage')
})

if(typeof process.env.DB==='string'){
    mongoose.connect(process.env.DB).
    then(()=>{
        console.log("Connected to Database");
        app.listen(process.env.PORT,()=> {
            console.log(`Server started on port ${process.env.PORT}`)
            console.log(`Documentation available at http://localhost:${process.env.PORT}/docs`)
        });
    }).catch(
        (err)=>console.error(err)
    )
}