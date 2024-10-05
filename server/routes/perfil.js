const express = require('express');
const router = express.Router();

router.get('/',  async(req, res) => {
    console.log('Usuário autenticado:', req.username);
    const user = req.username
    if (!user) {
        console.log('Usuário não encontrado'); // Log se o usuário não for encontrado
        return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    console.log('Usuário encontrado:', user); // Log do usuário encontrado
    res.status(200).json(user); // Retorna os dados do usuário
});

module.exports = router;