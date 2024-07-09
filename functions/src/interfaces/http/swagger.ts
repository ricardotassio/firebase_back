import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import { Express } from 'express'

const swaggerDefinition = {
  info: {
    title: 'Firebase Back API',
    version: '1.0.0',
    description: 'Documentação da API para o projeto Firebase Back',
  },
  servers: [
    {
      url: 'http://localhost:5001/fir-back-a92e9/us-central1',
      description: 'Servidor de desenvolvimento',
    },
  ],
}

const options = {
  swaggerDefinition,
  apis: ['./src/**/*.ts'],
}

const swaggerSpec = swaggerJsdoc(options)

export const setupSwagger = (app: Express) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
}
