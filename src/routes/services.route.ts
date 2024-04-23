import { Router } from 'express';
import {createService, getServices} from '../models/service.model'
export const services = Router();

services.get('/',async (req,res)=>{
   const data = await getServices();
   res.status(200).send(data);
})


services.post('/', async(req,res) =>{
    try{
        const {name,address,internet_page,phone_number,latitude,longitude,google_link}=req.body;
        if(!name || !address || !phone_number || !latitude || !longitude || !google_link){
            res.sendStatus(400);
        }
        const service= await createService({
            name,
            address,
            internet_page,
            phone_number,
            latitude,
            longitude,
            google_link
        })
        return res.status(200).json(service).end()
    }
    catch(err){
        console.log(err)
        return res.sendStatus(400)
    }

});