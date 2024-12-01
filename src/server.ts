import express from "express"
import colors from "colors"
import cors, {CorsOptions} from 'cors'
import morgan from 'morgan'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec, {swaggerUiOptions} from "./config/swagger"
import router from "./router"
import db from "./config/db"

//Conectar a nuestra base de datos
export async function connectDB(){
    try {
        await db.authenticate()
              db.sync()
        // console.log(colors.blue ('Conexión exitosa a la BD') )
    } catch (error) {
        // console.log(error)
        console.log( colors.red.bold ('Hubo un error al conectar a la base de datos') )
    }
}
connectDB()

// instancia de Express
const server = express()

// Permitir conexiones
const corsOptions : CorsOptions = {
    //origen - quién esta enviando la petición, desde post en local host 
    origin: function(origin, callback) {
        if(origin === process.env.FRONTEND_URL) {
            callback(null, true)
        } else {
            callback(new Error('Error de cors'))
        }
    }
}
//server.use se ejecuta en todas la peticiones, toda vez que se solicitud
server.use(cors(corsOptions))

// Leer datos de formulario
server.use(express.json())

server.use(morgan('dev'))

server.use('/api/products', router)

// Documentación
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions) )

export default server