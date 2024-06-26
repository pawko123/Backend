import fs from 'fs'
import util from 'util'
import multer from 'multer';
import path from 'path';
const mkdir = util.promisify(fs.mkdir);

async function createDir(dir: any) {
    try {
        await mkdir(dir, { recursive: true });
    } catch (err:any) {
        if (err.code !== 'EXIST') throw err;
    }
}

const trackstorage = multer.diskStorage({
    destination: async function(req, file, cb) {
        const trackName = req.body.TrackName;
        const baseDir = `trackpictures/${trackName}`;
        await createDir(baseDir);
        cb(null, baseDir);
    },
    filename: function(req, file, cb) {
        cb(null, path.basename(file.originalname) + Date.now() + path.extname(file.originalname));
    }
});

const eventstorage = multer.diskStorage({
    destination: async function(req, file, cb) {
        const baseDir = `eventpictures/`;
        await createDir(baseDir);
        cb(null, baseDir);
    },
    filename: function(req, file, cb) {
        cb(null, path.basename(file.originalname) + Date.now() + path.extname(file.originalname));
    }
});

export const trackupload = multer({ storage: trackstorage });
export const eventupload = multer({ storage: eventstorage });
