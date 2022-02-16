const express = require("express")
const jwt = require("jsonwebtoken");
const { TOKEN_SECRET } = require('../../environment')

const router = express.Router()

/**
 * @openapi
 * /auth/login:
 *   post:
 *     description: Authenticates a user
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === "unicorn" && password === "tacos") {
    const token = jwt.sign({ username: "unicorn" }, TOKEN_SECRET, {
      expiresIn: 3600,
    });
    res.status(200).send({ token });
  } else {
    res.status(401).send({ error: 'wrong credentials'});
  }
})

module.exports = router