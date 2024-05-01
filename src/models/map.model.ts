import mongoose from "mongoose";
export interface MapType {
    TrackName: string;
    Creator: string;
    Pictures?: string[];
    RoutePoints: number[][]; // 2D array of numbers
    Distance: number;
    negElevation: number;
    posElevation: number;
    verified: boolean;
    instresting: boolean;
}
const mapschema =new mongoose.Schema({
    TrackName:{type: String,required: true},
    Creator:{type:String,required:true},
    Pictures:{type:[String],required:false},
    RoutePoints:{type:[[{type:Number,required:true}]]
        ,required:true},
    Distance:{type:Number,required:true},
    negElevation:{type:Number,required:true},
    posElevation:{type:Number,required:true},
    verified:{type:Boolean,required:true,default:false},
    instresting:{type:Boolean,required:true,default:false}
});

export const Map = mongoose.model("Map",mapschema);
export const getMap = () => Map.find(); 
export const getMapbyName = (name:String) => Map.find({TrackName:name})
export const getUsersMap = (email:String) => Map.find({Creator:email})
export const getMapbyId = (id:string) => Map.findById(id)
export const getVerifiedMaps = () => Map.find({verified:true})
export const getVerfiedMapsPage = (page:number) => Map.find({verified:true}).skip((page-1)*8).limit(8)
export const getUnverifiedMaps = () => Map.find({verified:false})
export const getInterestingMaps = () => Map.find({instresting:true})
export const getInterestingMapsPage = (page:number) => Map.find({instresting:true}).skip((page-1)*8).limit(8)
export const createMap = (values:Record<string,any>) => new Map(values).save().then((map)=>map.toObject())
export const verifyMap = (id:string) => Map.findByIdAndUpdate(id,{verified:true})
export const deleteMapbyId = (id:string) => Map.findByIdAndDelete(id)