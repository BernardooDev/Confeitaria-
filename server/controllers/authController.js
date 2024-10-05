const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const generateJWTSecret = () => {
    return crypto.randomBytes(32).toString('hex'); // Gera 32 bytes de dados aleatórios em formato hexadecimal
};

const JWT_SECRET = generateJWTSecret();

const users = [
    {
        username: "bernardo",
        password: "senha123"
    }
]; 

const registerUser = async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { username, password: hashedPassword };
    users.push(newUser);
    const token = jwt.sign({ username: newUser.username }, JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ message: `Usuário registrado com sucesso!`, token, username});
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
    res.json({ message: 'Login bem-sucedido!', token });
};

const getUser = async (req, res) => {
    res.status(200).json(users)
}

module.exports = { registerUser, loginUser, getUser, users };
