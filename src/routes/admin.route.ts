import { Router } from "express";
import { isUserAdmin,Admin, createAdmin } from "../models/admin.model";
export const admins = Router();

admins.get('/:email',async(req,res)=>{
    try{
        const email = req.params.email;
        const data:Admin[]= (await isUserAdmin(email)).map(admin=>admin.toObject())
        if(data.length>0){
            res.status(200).json({isAdmin:true}).end()
        }
        else{
            res.status(200).json({isAdmin:false}).end()
        }
    }catch(err){
        console.log(err)
        return res.sendStatus(400)
    }
})
admins.post('/', async(req,res) =>{
    try{
        const {email}=req.body;
        if(!email){
            res.sendStatus(400);
        }
        const service= await createAdmin({
            email
        })
        return res.status(200).json(service).end()
    }
    catch(err){
        console.log(err)
        return res.sendStatus(400)
    }

});