import fs from 'fs'
import GpxParser from 'gpxparser';

export interface Coordinates {
    latitude: number;
    longitude: number;
}

export interface gpxData{
    coordinates: Coordinates[];
    distance: number;
    negElevation: number;
    posElevation: number;
}

export function extractgpxdata(filepath: string): gpxData {
    const xmldata = fs.readFileSync(filepath, 'utf8');
    const parser = new GpxParser();
    parser.parse(xmldata)
    const coordinates: Coordinates[] = [];

    for (let i = 0; i < parser.tracks[0].points.length; i++) {
        const latitude = parser.tracks[0].points[i].lat;
        const longitude = parser.tracks[0].points[i].lon;
        coordinates.push({ latitude, longitude });
    }
    
    const data:gpxData={
        coordinates,
        distance : parser.tracks[0].distance.total,
        negElevation : parser.tracks[0].elevation.neg,
        posElevation : parser.tracks[0].elevation.pos
    }

    return data;
}