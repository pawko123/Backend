import {services} from './services.route';
import {autorepair} from "./autorepair.route"
import express from 'express';
import { maps } from './maps.route';

const router = express.Router();

export default (): express.Router =>{
    router.use('/autorepair', autorepair)
    router.use('/services', services)
    router.use('/maps',maps)
    return router;
}