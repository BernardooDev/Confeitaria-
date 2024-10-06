const express = require("express");
const router = express.Router();
const authenticateToken = require("../middlerwares/authMiddleware");

router.get("/", authenticateToken, (req, res) => {
    console.log("Usuário autenticado:", req.user);
    const user = req.user.username; // username é uma string
    const endereco = req.user.endereco; // endereco é uma string
    const idade = req.user.idade; // idade é uma string
    const pedidos = req.user.pedidos; // pedidos é um array

    console.log("Usuário encontrado:", user, endereco, idade, pedidos);
    res.status(200).json({
        username: user,
        idade: idade,
        endereco: endereco,
        pedidos: pedidos,
        message: "Perfil carregado com sucesso!"
    });
});

module.exports = router;