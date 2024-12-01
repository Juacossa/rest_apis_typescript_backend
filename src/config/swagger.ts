import swaggerJSDoc from "swagger-jsdoc";
import { SwaggerUiOptions } from "swagger-ui-express";

const options : swaggerJSDoc.Options = {
    swaggerDefinition : {
        openapi: '3.0.2',
        tags: [
            {
                name: 'Products',
                description: 'API operations related to products'
            }
        ],
        info: {
            title: 'REST API Node.js / Express  / Typescript',
            version: "1.0.0",
            description: "API Docs for Products"
        }
    },
    apis: ['./src/router.ts']
}
const swaggerSpec = swaggerJSDoc(options)

const swaggerUiOptions : SwaggerUiOptions = {
    customCss: `
        .topbar-wrapper .link {
            content: url("https://files.oaiusercontent.com/file-n29ai4hFG6E2SywnZAGNL8Jg?se=2024-11-23T03%3A01%3A51Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D4122a049-fb40-4f65-bd60-ae84d33fe8ab.webp&sig=v72AgYTxWwhQusR86jbM4JmlmIDguTg%2BHLgKYuaSfHY%3D");
            height: 180px;
            width: auto;
        }
        .swagger-ui .topbar {
        background-color: #2b45;
        }
    `,
    customSiteTitle: 'Documentacion REST API Express / Typescript'
}
export default swaggerSpec
export {
    swaggerUiOptions
}