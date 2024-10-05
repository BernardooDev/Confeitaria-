const jwt = require('jsonwebtoken');
const JWT_SECRET = 'seu-segredo-super-seguro';

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Pega o token do cabeçalho

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
        next(); 
    });
};

module.exports = authenticateToken;
