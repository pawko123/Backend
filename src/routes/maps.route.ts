import { Router,Request,Response,NextFunction } from 'express';
import { MapType, createMap, getMapbyName, getUsersMap } from '../models/map.model';
import upload from '../config/mapmulterconfig';
import { extractgpxdata, gpxData } from '../scripts/gpxparse';
import fs from 'fs'
import 'dotenv/config'

export const maps = Router();

async function isTrackNamevalid(trackname:String):Promise<boolean> {
    const tracks=await getMapbyName(trackname)
    if(tracks.length!==0){
        return false
    }else{
        return true
    }
}


maps.get('/:email',async(req,res)=>{
    try{
        const email = req.params.email;
        const data:MapType[]= (await getUsersMap(email)).map(map=>map.toObject())
        res.status(200).json(data).end()
    }catch(err){
        console.log(err)
        return res.sendStatus(400)
    }
})

maps.post('/',upload.fields([{name:"plikGPX"},{name:'pictures',maxCount:5}]),async(req:Request,res:Response) =>{
    const isnamevalid=await isTrackNamevalid(req.body.TrackName)
    if(isnamevalid){
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
                posElevation:data.posElevation,
                verified:false,
                intresting:false
            });
            return res.status(200).json(map).end()
        }
        catch(err){
            console.log(err)
            return res.sendStatus(400)
        }
    }else{
        try{
            //@ts-ignore
            fs.unlink(req.files['plikGPX'][0].path, (err) => {
                if (err) {
                console.error('Błąd podczas usuwania pliku:', err);
                return;
                }
                console.log('Plik został pomyślnie usunięty');
            })
            //@ts-ignore
            if(typeof req.files['pictures'] !== 'undefined'){
                //@ts-ignore
                const pictures = req.files['pictures'].map((file: any) => file);
                //@ts-ignore
                pictures.forEach(picture => {
                    //@ts-ignore
                    fs.unlink(picture.path, (err) => {
                    if (err) {
                    console.error('Błąd podczas usuwania pliku:', err);
                    return;
                    }
                    console.log('Plik został pomyślnie usunięty');
                });
                });
            }
            return res.send({message:"Trasa o podanej nazwie juz istnieje"})
        }catch(err){
            console.log(err)
            return res.sendStatus(400)
        }
    } 
}
);