
import "reflect-metadata"
import 'dotenv/config'

import axios from 'axios';

import {Price, Station} from "./model/model";

import {dataSource} from "./datasource";
import {is_production} from "./isproduction";

const latitude = process.env.LATITUDE;
const longitude = process.env.LONGITUDE;
const radius = process.env.RADIUS;
const apiKey : string = process.env.APIKEY || '';

const URL = 'https://creativecommons.tankerkoenig.de/json/list.php';
const params = new URLSearchParams([['lat', `${latitude}`], ['lng', `${longitude}`], ['rad', `${radius}`], ['sort', 'dist'], ['type', 'all'], ['apikey', `${apiKey}`]]);

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

const createdat = new Date();
let l = 0;

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
            if((p.diesel == null) || (p.e5 == null) || (p.e10 == null)) {
                console.log('Skipping, because there are null values in Price: ' + JSON.stringify(p));
                const s = station_from_request(station);
                console.log('Station: ' + JSON.stringify(s));
                continue;
            }
            await dataSource.manager.save(p);
            l++;
        }
    } catch(error) {
        console.log(error);
    }

}

start().then(() => {
    const enddate = new Date();
    const duration : number = (enddate.valueOf() - createdat.valueOf()) / 1000.0;
    console.log(`${enddate} successfully created ${l} price entries. Started at ${createdat}, finished at ${enddate} in ${duration}s`);
})

