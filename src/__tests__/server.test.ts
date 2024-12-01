import { connectDB } from '../server'
import db from '../config/db'


// tecnica para las pruebas para simular el comportamiento de ciertas funciones u objetos}
// en este entorno- conectandose a la base de datos
jest.mock('../config/db')
// el mock simula la conexión a la base de datos y espia en el para mandar el error
describe('connectDB', () => {
    it('should handle database connection error', async () => {
        jest.spyOn(db,'authenticate')
            .mockRejectedValueOnce(new Error('Hubo un error al conectar a la base de datos'))
            const consoleSpy = jest.spyOn(console, 'log')
            // configuramos los espias y adonde quieren entrar

            await connectDB() //mandamos a llamar la base de datos 

            //aqui abajo ya entran los espias
            expect(consoleSpy).toHaveBeenCalledWith(
                expect.stringContaining('Hubo un error al conectar a la base de datos')
            )
    })
})
// spyon - crea una funcion en el ambiente y le pasamos la base de datos (simulado), y le pasamos a cual debe 
// observar el comportamiento (spyOn(db,'authenticate'))


// describe('Nuestro primer test', () => {
//     it('Debe revisar 1 + 1 sean 2', () => {
//         expect(1 + 1).toBe(2)
//     })
//     it('Debe revisar 1 + 1 no sean 3', () => {
//         expect(1 + 1).not.toBe(3)
//     })
// }) // Describe agrupa, it las pruebas
// expect espera el valor 
// ToBe el valor a comparar
//