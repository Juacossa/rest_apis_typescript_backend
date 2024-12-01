import { Router } from "express"
//instancia del router
import { createProduct, deleteProduct, getProductById, getProducts, updateAvailability, updateProduct } from "./handlers/product"
import { body, param } from "express-validator"
import  handleInputErrors  from "./middleware"



const router = Router()
/**
 * @swagger
 * components:
 *  schemas:
 *      Product: 
 *          type: object
 *          properties: 
 *              id: 
 *                  type: integer
 *                  description: The Product ID
 *                  example: 1
 *              name: 
 *                  type: string
 *                  description: The Product name
 *                  example: Monitor curvo de 49 pulgadas
 *              price: 
 *                  type: number
 *                  description: The Product price
 *                  example: 300
 *              availability: 
 *                  type: boolean
 *                  description: The Product availabilty
 *                  example: true
 */
/**
 * @swagger
 * /api/products:
 *      get:
 *          summary: Get a list of products
 *          tags:
 *              - Products
 *          description: Return a list of products
 *          responses:
 *              200:
 *                  description: Succesful response
 *                  content:
 *                      aplication/json:
 *                          schema: 
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Product'
 */

// Routing
//request  es lo que tu envias, y response- lo que obtienes al visitar
// send enviar datos a la pantalla,  igual json
// EL LOCAL solo de cógio HTTP soporta get y post, los demas con axios

//Endpoints
router.get('/', getProducts)

/**
 * @swagger
 * /api/products/{id}:
 *  get:
 *      summary: Get a product by ID
 *      tags:
 *          - Products
 *      description: Return a product based on its unique ID
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the product to retrievve
 *          required: true
 *          schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: Succesful response
 *              content:    
 *                  aplication/json:
 *                      schema:         
 *                          $ref: '#/components/schemas/Product'
 *          404:
 *              description: Not found
 *          400:
 *              description: Bad Request - Invalid ID
 * 
 * 
 * 
 */
router.get('/:id', 
    param('id').isInt().withMessage('ID no válido'),
    handleInputErrors,
    getProductById)

/**
 * @swagger
 * /api/products:
 *  post:
 *      summary: Creates a new product
 *      tags: 
 *          - Products
 *      description: Returns a new record in the database
 *      requestBody: 
 *          required: true
 *          content:
 *              aplication/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name: 
 *                              type: string
 *                              example: "Monitor Curvo de 49 pulgadas"
 *                          price:
 *                              type: number
 *                              example: 399
 *      responses:
 *              201:
 *                  description: Succesful response
 *                  content:
 *                      aplication/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Product'
 *              400:
 *                  description: Bad Request - Invalid Input Data 
 * 
 */
router.post('/', 
    // Validación 
    body("name")
        .notEmpty().withMessage('EL nombre del Producto no puede ir vacio'),

    body("price")
        .isNumeric().withMessage('Valor no válido')
        .notEmpty().withMessage('EL precio del Producto no puede ir vacio')
        .custom( value => value > 0).withMessage('Precio no valido'),
        handleInputErrors,
    
    createProduct
)

/**
 * @swagger
 * /api/products/{id}:
 *  put:
 *      summary: Updates a product with user input
 *      tags:
 *          - Products
 *      description: Returns the updated product
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the product to retrieve
 *          required: true
 *          schema:
 *              type: integer
 *      requestBody:
 *          required: true
 *          content:
 *              aplication/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name: 
 *                              type: string
 *                              example: "Monitor Curvo de 49 pulgadas"
 *                          price:
 *                              type: number
 *                              example: 399
 *                          availability:
 *                              type: boolean
 *                              example: true
 *      responses:
 *          200:
 *              description: Succesful response
 *              content:
 *                  aplication/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad Request - Invalid ID or Invalid Input Data
 *          404:
 *              description: Product Not Found
 */

router.put('/:id', //put actualiza todos los parámetros - reemplaza el elemento con lo que le envies
    param('id').isInt().withMessage('ID no válido'), 
        body("name")
        .notEmpty().withMessage('EL nombre del Producto no puede ir vacio'),

    body("price")
        .isNumeric().withMessage('Valor no válido')
        .notEmpty().withMessage('EL precio del Producto no puede ir vacio')
        .custom( value => value > 0).withMessage('Precio no valido'),
    body('availability')
    .isBoolean().withMessage('Valor para disponibilidad no válido'),
    handleInputErrors,
    updateProduct)

/**
 * @swagger
 * /api/products/{id}:
 *  patch:
 *      summary: Update Product Avalability
 *      tags:
 *          - Products
 *      description: Returns the updated avalability
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the product to retrievve
 *          required: true
 *          schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: Succesful response
 *              content:
 *                  aplication/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad Request - Invalid ID 
 *          404:
 *              description: Product Not Found
 */

router.patch('/:id', 
    param('id').isInt().withMessage('ID no válido'),
    handleInputErrors,
    updateAvailability) //patch modificar partes de un recurso

/**
 * @swagger
 * /api/products/{id}:
 *  delete:
 *      summary: Deletes a product by a given ID
 *      tags:
 *          - Products
 *      description: Returns a confirmation message
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the product to delete
 *          required: true
 *          schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: Succesful response
 *              content:
 *                  aplication/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              name: 
 *                                  type: string
 *                                  example: "Producto Eliminado"
 *          400:
 *              description: Bad Request - Invalid ID 
 *          404:
 *              description: Product Not Found
 * 
 */

router.delete('/:id', 
    param('id').isInt().withMessage('ID no válido'),
    handleInputErrors,
    deleteProduct)

export default router
