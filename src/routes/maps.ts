import { Router } from 'express';
import { createMap, getUsersMap } from '../models/map';
import upload from '../config/mapmulterconfig';
import { Coordinates, extractgpxdata, gpxData } from '../scripts/gpxparse';
export const maps = Router();

maps.get('/:email',async(req,res)=>{
    try{
        const email = req.params.email;
        const data = await getUsersMap(email)
        res.status(200).json(data).end()
    }catch(err){
        console.log(err)
        return res.sendStatus(400)
    }
})


maps.post('/',upload.fields([{name:'plikGPX'},{name:'pictures',maxCount:5}]) ,async(req,res) =>{
    try{
        //@ts-ignore
        const data:gpxData=extractgpxdata(req.files['plikGPX'][0].path)
        //@ts-ignore
        const picturesPaths = req.files['pictures'].map((file: any) => file.path);
        const map = await createMap({
            TrackName: req.body.TrackName,
            Creator: req.body.Creator,
            Pictures: picturesPaths,
            RoutePoints: data.coordinates.map(coordinate => [coordinate.latitude, coordinate.longitude]),
            Distance:data.distance,
            negElevation:data.negElevation,
            posElevation:data.posElevation
         });
        return res.status(200).json(map).end()
    }
    catch(err){
        console.log(err)
        return res.sendStatus(400)
    }

});