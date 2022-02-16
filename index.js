const express = require("express");
const app = express();
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const bodyParser = require("body-parser");
const loginRouter = require("./src/auth/login")
const unicornsRouter = require("./src/unicorns")

const port = 8000;
const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Unicorns API",
      version: "1.0.0",
      description: "The most magical API",
    },
  },
  components: {
    securitySchemes: {
      jwt: {
        type: "http",
        scheme: "bearer",
        in: "header",
        bearerFormat: "JWT",
      },
    },
  },
  security: [
    {
      jwt: [],
    },
  ],
  swagger: "2.0",
  apis: ["./index.js", "./src/*.js", "./src/auth/*.js"],
};
const swaggerSpec = swaggerJSDoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(bodyParser.json());

app.use("/auth", loginRouter)
app.use("/unicorns", unicornsRouter)

/**
 * @openapi
 * /swagger:
 *   get:
 *     description: get this swagger doc
 *     responses:
 *       200:
 *         description: returns a swagger doc with all of the endpoints
 */
app.get("/swagger", (req, res) => {
  res.send(swaggerSpec);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
