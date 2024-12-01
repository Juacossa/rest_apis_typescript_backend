import request from  'supertest'
import server from '../../server'

describe('POST /api/products', () => {
    it('should display validation errors', async () => {
        const response = await request(server).post('/api/products').send({})
        
        //validamos que mande el error esperado cuando no se envia nada en el body
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(4) //son cuatro mensajes de error en un solo arreglo

        //contraparte que se asegura que se esperen los errores
        expect(response.status).not.toBe(404)
        expect(response.body.errors).not.toHaveLength(2)
    })

    it('should validate that the price is greater than 0', async () => {
        const response = await request(server).post('/api/products').send({
            name: 'Monito Curvo',
            price: 0
        })
        
        
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1) //son cautro mensajes de error

        //contraparte que se asegura que se esperen los errores
        expect(response.status).not.toBe(404)
        expect(response.body.errors).not.toHaveLength(2)
    })
    
    it('should validate that the price is a number and greater than 0', async () => {
        const response = await request(server).post('/api/products').send({
            name: 'Monito Curvo',
            price: 'hola'
        })

        // Cuando se envia una palabra en el precio
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(2) //son cautro mensajes de error

        //contraparte que se asegura que se esperen los errores
        expect(response.status).not.toBe(404)
        expect(response.body.errors).not.toHaveLength(4)
    })

    it('should create a new product', async () => {
        const response = await request(server).post('/api/products').send({
            name : "Mouse - Testing",
            price : 50
          })

          expect(response.status).toEqual(201)
          expect(response.body).toHaveProperty('data')

          expect(response.status).not.toBe(404)
          expect(response.status).not.toBe(200)
          expect(response.body).not.toHaveProperty('error')
    })


})

describe('GET /api/products', () => {
    it('should check if /api/products url exist or 404', async () => {
        const response = await request(server).get('/api/products')

        expect(response.status).not.toBe(404)
    })

    it('Get a JSON response with products', async () => {
        const response = await request(server).get('/api/products')

        expect(response.status).toBe(200)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body).toHaveProperty('data')
        expect(response.body.data).toHaveLength(1)
    
        expect(response.body).not.toHaveProperty('errors')
    })
})

describe('GET /api/products/:id', () => {
    it('Should return a 404 response for a non-existent product', async () => {
        const prodcutId = 2000
        const response = await request(server).get(`/api/products/${prodcutId}`)

        //todo esto es para ccomprobar cuando hay error cuando no hay producto existente
        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toBe('Producto no encontrado')
    })

    //para comprobar cuando hay un string y mande error
    it('should cheack a valid ID in the URL', async () => {
        const response = await request(server).get('/api/products/not-valid-url')

        //esto es lo que esperamos al mandar una palabra a la url
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)
        expect(response.body.errors[0].msg).toBe('ID no válido')
    })

    it('GET a JSON response for asingle product', async () => {
        const response = await request(server).get('/api/products/1')

        // para validar lo correcto
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')
    })
})

describe('PUT /api/products/:id', () => {
    it('should cheack a valid ID in the URL', async () => {
        const response = await request(server)
                                .put('/api/products/not-valid-url')
                                .send({
                                    name: "Monitor Nuevo - Actualizado",
                                    price: 300,
                                    availability:true
                                  })
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)
        expect(response.body.errors[0].msg).toBe('ID no válido')
    })
    
    it('should display validation error messages when updating a product', async () => {
        const response = await request(server).put('/api/products/1').send({})//vacio de esa forma recibimos los mensajes de valiacion
        
        //validación al no mandar nada al body
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toBeTruthy()
        expect(response.body.errors).toHaveLength(5)

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
    })

        it('should validate that the price is greater than 0', async () => {
            const response = await request(server)
                                    .put('/api/products/1')
                                    .send({
                                        name: "Monitor Nuevo - Actualizado",
                                        price: 0,
                                        availability:true
                                      })
            
            //validación al no mandar nada al body
            expect(response.status).toBe(400)
            expect(response.body).toHaveProperty('errors')
            expect(response.body.errors).toBeTruthy()
            expect(response.body.errors).toHaveLength(1)
            expect(response.body.errors[0].msg).toBe("Precio no valido")
    
            expect(response.status).not.toBe(200)
            expect(response.body).not.toHaveProperty('data')
    })

    it('should return a 404 response for a non-existent product', async () => {
        const porductId = 2000
        const response = await request(server)
                                .put(`/api/products/${porductId}`)
                                .send({
                                    name: "Monitor Nuevo - Actualizado",
                                    price: 300,
                                    availability:true
                                  })
        
        //validación al no mandar nada al body
        expect(response.status).toBe(404)
        expect(response.body.error).toBe('Producto no encontrado')


        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
    })

    it('should update an existing product with valid data ', async () => {
        const response = await request(server)
                                .put(`/api/products/1`)
                                .send({
                                    name: "Monitor Nuevo - Actualizado",
                                    price: 300,
                                    availability:true
                                  })
        
        //validación al no mandar nada al body
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')


        expect(response.status).not.toBe(400)
        expect(response.body).not.toHaveProperty('errors')
    })
})

describe('PATCH /api/products/:id', () => {
    it('should return a 404 reponse for a non-existing product',async () => {
        const productId = 2000
        const response = await request(server).patch(`/api/products/${productId}`)
        expect(response.status).toBe(404)
        expect(response.body.error).toBe('Producto no encontrado')
        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
    })

    it('should update the product availability', async () => {
        const response = await request(server).patch(`/api/products/1`)
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')
        expect(response.body.data.availability).toBe(false)

        expect(response.body).not.toBe(404)
        expect(response.body).not.toBe(400)
        expect(response.body).not.toHaveProperty('error')
    })
})

describe('DELETE /api/products/:id', () => {
    it('should check a valid ID', async () => {
        const response = await  request(server).delete('/api/products/not-valid')
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors[0].msg).toBe('ID no válido')
    })

    it('should return a 404 response for a non-existent product', async () => {
        const productId = 2000
        const response = await request(server).delete(`/api/products/${productId}`)
        expect(response.status).toBe(404)
        expect(response.body.error).toBe('Producto no encontrado')
        expect(response.status).not.toBe(200)
    })

    it('should delete a product', async () => {
        const response = await request(server).delete('/api/products/1')
        expect(response.status).toBe(200)
        expect(response.body.data).toBe('Producto eliminado')

        expect(response.status).not.toBe(404)
        expect(response.status).not.toBe(400)
    })
})