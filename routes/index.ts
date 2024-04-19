import {services} from './services';
import express from 'express';

const router = express.Router();

export default (): express.Router =>{
    router.use('/services', services)
    return router;
}