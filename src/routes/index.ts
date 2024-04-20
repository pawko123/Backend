import {services} from './services';
import {autorepair} from "./autorepairs"
import express from 'express';
import { maps } from './maps';

const router = express.Router();

export default (): express.Router =>{
    router.use('/autorepair', autorepair)
    router.use('/services', services)
    router.use('/maps',maps)
    return router;
}