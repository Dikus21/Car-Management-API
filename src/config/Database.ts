import { DataSourceOptions, DataSource } from "typeorm";
import path from "path";
import EnvironmentSettings from "../utils/EnvironmentSettings";

new EnvironmentSettings();

const db: DataSourceOptions = {
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT as string),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: true,
  entities: [path.join(__dirname, "../entities/**")],
  migrations: [path.join(__dirname, "../migrations/**")],
};

const dataSource = new DataSource(db);

export default dataSource;
