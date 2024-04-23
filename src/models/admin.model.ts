import mongoose from "mongoose";

export interface Admin{
    email:string
}

const adminschema =new mongoose.Schema({
    email: {type:String,required:true}
});
export const Admin = mongoose.model("Admin",adminschema);
export const isUserAdmin = (mail:String) => Admin.find({email:mail})
export const createAdmin = (values:Record<string,any>) => new Admin(values).save().then((admin)=>admin.toObject())