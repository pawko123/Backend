import { Router } from 'express';
import {getAutoRepair,createAutoRepair} from "../models/autorepair.model."
export const autorepair = Router();

autorepair.get('/',async (req,res)=>{
   const data = await getAutoRepair();
   res.status(200).send(data);
})


autorepair.post('/', async(req,res) =>{
    try{
        const {name,address,latitude,longitude,google_link}=req.body;
        if(!name || !address || !latitude || !longitude || !google_link){
            res.sendStatus(400);
        }
        const autorepair= await createAutoRepair({
            name,
            address,
            latitude,
            longitude,
            google_link
        })
        return res.status(200).json(autorepair).end()
    }
    catch(err){
        console.log(err)
        return res.sendStatus(400)
    }

});