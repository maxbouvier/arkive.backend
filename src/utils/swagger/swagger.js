const paths = require("./path.js");
const definitions  = require ("./definitions.js");
const parameters  = require ("./parameters.js");
const config = require ("../../config/config");


const  openApiDocumentation   = {
  openapi: "3.0.0",
  info: {
    title: "Mappn",
    version: "1.0.0",
    description: "Project Mappn",
  },
  servers: [
    {
      url: `${config.APP_URL}/api/v1/`,
      description: "SWAGGER_BASE_URL",
    },
  ],
  components: {
    securitySchemes: {
      apiAuth: {
        type: "apiKey",
        in: "header",
        name: "Authorization",
      },
    },
    schemas: definitions,
    parameters: parameters,
  },
  paths: paths,
};

console.log(__dirname);
module.exports = openApiDocumentation;