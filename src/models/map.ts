import mongoose from "mongoose";
const mapschema =new mongoose.Schema({
    TrackName:{type: String,required: true},
    Creator:{type:String,required:true},
    Pictures:{type:[String],required:false},
    TrackData:{type:String,required:true}
});

export const Map = mongoose.model("Map",mapschema);
export const getMap = () => Map.find(); 
export const createMap = (values:Record<string,any>) => new Map(values).save().then((map)=>map.toObject())