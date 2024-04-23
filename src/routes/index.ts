import {services} from './services.route';
import {autorepair} from "./autorepair.route"
import express from 'express';
import { maps } from './maps.route';
import { admins } from './admin.route';

const router = express.Router();

export default (): express.Router =>{
    router.use('/autorepair', autorepair)
    router.use('/services', services)
    router.use('/maps',maps)
    router.use('/admins',admins)
    return router;
}