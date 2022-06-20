import 'dotenv/config'

import {DataSource} from "typeorm";
import {Price, Station} from "./model/model";

import {is_production} from "./isproduction";

export const dataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: process.env.DB_PASSWORD,
    database: "postgres",
    synchronize: !is_production,
    logging: false,
    entities: [Station, Price],
    subscribers: [],
    migrations: ['./migrations/*.js'],
})
