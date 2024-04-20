import mongoose from "mongoose";
const autorepairschema =new mongoose.Schema({
    name:{type: String,required: true},
    address:{type:String,required:true},
    latitude:{type:String,required:true},
    longitude:{type:String,required:true},
    google_link:{type:String,required:true}
});

export const AutoRepair = mongoose.model("AutoRepair",autorepairschema);

export const getAutoRepair = () => AutoRepair.find(); 
export const createAutoRepair = (values:Record<string,any>) => new AutoRepair(values).save().then((autorepair)=>autorepair.toObject())
