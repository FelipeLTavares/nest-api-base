import { DataSource, DataSourceOptions } from "typeorm";
import * as dotenv from 'dotenv';

dotenv.config();

export const dataSourceOptions: DataSourceOptions = {
    type: process.env.DB_DIALECT as any,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: ['dist/**/entities/*.{js,ts}'],
    migrations: ['dist/common/database/migrations/*{.ts,.js}'],
    synchronize: false,
    migrationsRun: true,
}

const AppDataSource = new DataSource(dataSourceOptions);
export default AppDataSource;