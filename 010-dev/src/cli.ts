
import "reflect-metadata"
import 'dotenv/config'

import axios from 'axios';

import {Price, Station} from "./model/model";

/*
 * npm run typeorm schema:log --  --dataSource src/datasource.ts
 */

import {dataSource} from "./datasource";
import {is_production} from "./isproduction";

const latitude = process.env.LATITUDE;
const longitude = process.env.LONGITUDE;
const radius = process.env.RADIUS;
const apiKey : string = process.env.APIKEY || '';

const URL = 'https://creativecommons.tankerkoenig.de/json/list.php';
const params = new URLSearchParams([['lat', `${latitude}`], ['lng', `${longitude}`], ['rad', `${radius}`], ['sort', 'dist'], ['type', 'all'], ['apikey', `${apiKey}`]]);

const createdat = new Date();

function station_from_request(req_station : any) : Station {
    const postCodeNum = req_station.postCode as number;
    const postCode = String(postCodeNum).padStart(5, '0');
    const id = req_station.id as string;
    const name = req_station.name as string;
    const brand = req_station.brand as string;
    const street = req_station.street as string;
    const houseNumber = req_station.houseNumber as string;
    const city = req_station.place as string;
    const distance = req_station.dist as number;

    return new Station(id, createdat, name, brand, street, houseNumber, postCode, city, distance);
}

function price_from_request(req_station : any) : Price {
    const id = req_station.id as string;
    const isOpen = req_station.isOpen as boolean;
    const diesel = req_station.diesel || null as number | null;
    const e5 = req_station.e5 || null  as number | null;
    const e10 = req_station.e10 || null  as number | null;

    return new Price(id, createdat, isOpen, diesel, e5, e10);
}

const start = async () : Promise<void> => {
    try {
        await dataSource.initialize();
        const headers = {
            'Content-Type': 'application/json'
        }
        const res = await axios.get(URL, { params, headers });

        const stations = res.data.stations;

        // alle Tankstellen nacheinander auswerten
        for(const station of stations) {
            const s = station_from_request(station);
            if(!is_production)
                console.log('Going to insert or update Station: ' + JSON.stringify(s));
            await dataSource.manager.save(s);
        }

        for(const station of stations) {
            const p = price_from_request(station);
            if(!is_production)
                console.log('Going to insert Price: ' + JSON.stringify(p));
            await dataSource.manager.save(p);
        }
    } catch(error) {
        console.log(error);
    }

}

start();
