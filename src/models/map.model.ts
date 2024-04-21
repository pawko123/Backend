import mongoose from "mongoose";

const mapschema =new mongoose.Schema({
    TrackName:{type: String,required: true},
    Creator:{type:String,required:true},
    Pictures:{type:[String],required:false},
    RoutePoints:{type:[[{type:Number,required:true}]]
        ,required:true},
    Distance:{type:Number,required:true},
    negElevation:{type:Number,required:true},
    posElevation:{type:Number,required:true}
});

export const Map = mongoose.model("Map",mapschema);
export const getMap = () => Map.find(); 
export const getMapbyName = (name:String) => Map.find({TrackName:name})
export const getUsersMap = (email:String) => Map.find({Creator:email})
export const createMap = (values:Record<string,any>) => new Map(values).save().then((map)=>map.toObject())
