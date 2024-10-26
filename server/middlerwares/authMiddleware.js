// middleware/authenticateToken.js
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'seu-segredo-super-seguro';

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Pega o token do header
    console.log('Token:', token); 

    if (!token) {
        console.log('Sem token, acesso negado'); 
        return res.sendStatus(403);
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            console.log('Erro ao verificar token:', err);
            return res.sendStatus(403); 
        }
        req.user = user; 
        console.log('Usuário:', req.user); // Adicione este log
        next(); 
    });
};

module.exports = authenticateToken;
