const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API prjet-chara',
            version: '1.0.0',
            description: 'API Node.js/Express pour le CMS du site internet officiel.',
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT || 5000}`,
                description: 'Serveur de Développement'
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                }
            }
        },
        security: [{
            bearerAuth: []
        }]
    },
    // Chemins vers les fichiers où nous allons documenter les routes (JSDoc)
    apis: ['./backend/routes/*.js', './backend/controllers/*.js'],
};

const specs = swaggerJsdoc(options);

module.exports = specs;
