const express = require("express")
const router = express.Router()
const { TOKEN_SECRET } = require('../environment')
const jwt = require("jsonwebtoken");

const unicorns = []

router.use((req, res, next) => {
  try {
    const tokenHeader = req.headers.authorization.split("Bearer ")[1];
    jwt.verify(tokenHeader, TOKEN_SECRET);
    next()
  } catch (e) {
    res.sendStatus(401);
  }
})

/**
 * @openapi
 * /unicorns:
 *   get:
 *     description: get some unicorns
 *     responses:
 *       200:
 *         description: returns a list of unicorns
 */
router.get("/", (req, res) => {
  res.send(unicorns);
});

/**
 * @openapi
 * /unicorns:
 *   post:
 *     description: add a unicorn
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               age:
 *                 type: integer
 *             example:
 *               name: Super Unicorn
 *               age: 33
 *     responses:
 *       201:
 *         description: the add was performed successfuly
 */
router.post("/", (req, res) => {
  const { name, age } = req.body

  if (!name) return res.status(400).send({
    error: 'name is required'
  })

  if (!age) return res.status(400).send({
    error: 'age is required'
  })

  unicorns.push({ name, age })

  res.sendStatus(201)
});

module.exports = router