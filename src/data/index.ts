import { exit } from 'node:process'
import db from '../config/db'

const clearDB = async () => {
    try {
        await db.sync({force: true})
        console.log('Datos eliminados correctamente ')
        exit()
    } catch (error) {
        console.log(error)
        exit(1) // con 1 finaliza con errores, con 0 finaliza bien
    }
}
if(process.argv[2] === '--clear') { //process.argv se ejecuta desdde el node y el [2] la posición(desde el Ciline)
    clearDB()
}
console.log(process.argv)