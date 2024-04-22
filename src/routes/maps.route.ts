import { Router,Request,Response,NextFunction } from 'express';
import { createMap, getMapbyName, getUsersMap } from '../models/map.model';
import upload from '../config/mapmulterconfig';
import { extractgpxdata, gpxData } from '../scripts/gpxparse';
import fs from 'fs'
export const maps = Router();

async function isTrackNamevalid(req:Request,res:Response,next:NextFunction) {
    console.log(req.body.TrackName)
    const tracks=await getMapbyName(req.body.TrackName)
    if(tracks.length!==0){
        return res.send({message:"Mapa o danej nazwie już istnieje"})
    }else{
        next()
    }
}


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


maps.post('/',isTrackNamevalid,upload.fields([{name:"plikGPX"},{name:'pictures',maxCount:5}]),async(req,res) =>{
    try{
        //@ts-ignore
        const data:gpxData=extractgpxdata(req.files['plikGPX'][0].path)
        //@ts-ignore
        fs.unlink(req.files['plikGPX'][0].path, (err) => {
            if (err) {
              console.error('Błąd podczas usuwania pliku:', err);
              return;
            }
            console.log('Plik został pomyślnie usunięty');
          });
        var picturesPaths:String[]=[]
          //@ts-ignore
        if(typeof req.files['pictures'] !== 'undefined'){
            //@ts-ignore
            picturesPaths = req.files['pictures'].map((file: any) => file.path);
        }
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