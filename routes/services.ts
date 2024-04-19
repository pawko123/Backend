import { Router } from 'express';
import {createService, getServices} from '../models/service'
export const services = Router();

services.get('/',async (req,res)=>{
   const data = await getServices();
   res.send(data);
})


services.post('/', async(req,res) =>{
    try{
        const {name,address,internet_page,phone_number}=req.body;
        if(!name || !address || !internet_page || !phone_number){
            res.sendStatus(400);
        }
        const service= await createService({
            name,
            address,
            internet_page,
            phone_number
        })
        return res.status(200).json(service).end()
    }
    catch(err){
        console.log(err)
        return res.sendStatus(400)
    }

});