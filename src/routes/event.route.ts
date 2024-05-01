import { Router } from "express";
import { createevent, geteventsbynewest } from "../models/event.model";
import { eventupload } from "../config/mapmulterconfig";
import fs from 'fs'

export const events = Router();

events.get("/", async (req, res) => {
    try {
        const data = (await geteventsbynewest()).map((event) => event.toObject());
        res.status(200).json(data).end();
    } catch (err) {
        console.log(err);
        return res.sendStatus(400);
    }
})

events.post("/",eventupload.fields([{name:'picture',maxCount:1}]), async (req, res) => {
    try {
        await createevent({
            title: req.body.title,
            description: req.body.description,
            eventdate: req.body.eventdate,
            eventtime: req.body.eventtime,
            location: req.body.location,
            // @ts-ignore
            image: req.files['picture'][0].filename,
            organizer: req.body.organizer
        });
        res.status(200).json({message:'Event poprawnie stworzony'}).end();
    } catch (err) {
        // @ts-ignore
        fs.unlink(req.files['picture'][0].path,()=>{})
        console.log(err);
        return res.sendStatus(400);
    }
})