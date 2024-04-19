import mongoose from "mongoose";
const serviceSchema =new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    address:{
        type:String,
        required:true
    },
    internet_page:{
        type:String,
        required:false
    },
    phone_number:{
        type:String,
        required:false
    },
    latitude:{
        type:String,
        required:true
    },
    longitude:{
        type:String,
        required:true
    },
    google_link:{
        type:String,
        required:true
    }
});

export const Service = mongoose.model("Service",serviceSchema);

export const getServices = () => Service.find(); 
export const createService = (values:Record<string,any>) =>new Service(values).save().then((service)=>service.toObject())
