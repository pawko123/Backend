import { Router } from 'express';
import { createMap } from '../models/map';
import multer from 'multer';
export const maps = Router();
const upload = multer({dest:"uploads"})

maps.post('/',upload.fields([{name:'plikGPX'},{name:'pictures',maxCount:5}]) ,async(req,res,next) =>{
    try{
        if (!req.files) {
            return res.status(400).json({ message: 'Brak przesłanych plików' });
        }
        //@ts-ignore
        const picturesPaths = req.files['pictures'].map((file: any) => file.path);
        const map = await createMap({
            TrackName: req.body.TrackName,
            Creator: req.body.Creator,
            Pictures: picturesPaths,
            //@ts-ignore
            TrackData: req.files['plikGPX'][0].path // Przyjmując, że jest tylko jeden plik GPX
        });
        return res.status(200).json(map).end()
    }
    catch(err){
        console.log(err)
        return res.sendStatus(400)
    }

});