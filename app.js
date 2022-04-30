const express = require('express')
const url = require('url');
const swaggerUI = require('swagger-ui-express')
const openApiDocumentation = require('./src/utils/swagger/swagger.js')
const config = require('./src/config/config')
const mongoose = require('mongoose');
const indexRouter  = require('./src/routes/index');


const app = express()
const urll = "";

mongoose
    .connect(config.DB_URI)
    .then(() => {
        console.log('Mongo Connected');
    })
    .catch((error) => {
        console.log( error.message, error);
    });

/**
 * Swagger routing...
 */




// app.use('/swagger.json', express.static('./src/utils/swagger.json'))
var options = {
  explorer: true,
  swaggerOptions: {
    url: `/swagger.json`,
    validatorUrl: null
  }
}

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/**
 * Header all controles Perimissions
 */
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'OPTIONS,GET,PUT,POST,DELETE')
  res.header('Access-Control-Allow-Headers', '*')
  next()
})

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(null, options))
app.get('/swagger.json', (req, res) => res.json(openApiDocumentation))

// app.use(function (error, req, res, next) {
//     if (error instanceof SyntaxError) {
//       res.json({
//         responseStatus: false,
//         responseCode: 500,
//         responseMessage: "Invalid",
//       });
//     } else {
//       next();
//     }
//   });
app.use("/", indexRouter);
/**
 * Application listern PORT
 */
app.listen(config.port, error => {
  if (error) {
    console.log(`Server is not listening on port ${config.port}`)
  } else {
    console.log(`Server is listening on port ${config.port}`)
  }
})
