const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'seu-segredo-super-seguro';

const users = []; 

const registerUser = async (req, res) => {
    const { username, password, idade, endereco } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { 
        username, 
        password: hashedPassword,
        idade, 
        endereco,
        pedidos: [] 
    };
    users.push(newUser);
    
    const token = jwt.sign({ 
        username: newUser.username, 
        idade: newUser.idade, 
        endereco: newUser.endereco,
        pedidos: newUser.pedidos 
    }, JWT_SECRET, { expiresIn: '1h' });
    
    res.status(201).json({ 
        message: `Usuário registrado com sucesso!`, 
        token, 
        username,
        idade, 
        endereco
    });
};


// Login de usuário
const loginUser = async (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);
    if (!user) {
        return res.status(400).json({ error: 'Usuário não encontrado' });
    }

    // Comparar senha
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({ error: 'Senha inválida' });
    }

    // Gerar token JWT
    const token = jwt.sign({ username: user.username }, JWT_SECRET, { expiresIn: '1h' });
    // Retornar dados do usuário junto com o token
    res.json({ message: 'Login bem-sucedido!', token, user: { 
        username: user.username,
        idade: user.idade,
        endereco: user.endereco,
        pedidos: user.pedidos
    } });
};

const getUser = async (req, res) => {
    res.status(200).json(users)
}

module.exports = { registerUser, loginUser, getUser, users };
