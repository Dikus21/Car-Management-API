import {DataSourceOptions, DataSource} from "typeorm";
import dotenv from 'dotenv'

dotenv.config();

const db: DataSourceOptions = {
    type:'postgres',
    host:process.env.DB_HOST,
    port:parseInt(process.env.DB_PORT as string),
    username:process.env.DB_USERNAME,
    password:process.env.DB_PASS,
    database:process.env.DB_NAME,
    synchronize:true,
    entities:['src/entities/**/*.ts'],
    migrations:['src/migrations/**/*.ts']
};

const dataSource = new DataSource(db);

export default dataSource;