import { Sequelize } from "sequelize-typescript";
import dotenv from 'dotenv'
dotenv.config()

//con la variable de entrono lo ocultamos
const db = new Sequelize(process.env.DATABASE_URL!, {
    models: [__dirname + '/../models/**/*'],
    logging: false
})

export default db