const express = require('express');
const router = express.Router();
const authenticateToken = require("../middlerwares/authMiddleware"); 

router.post('/', async (req, res) => {
    res.status(200).json({ message: "Checkout realizado com sucesso!" });
});

module.exports = router;