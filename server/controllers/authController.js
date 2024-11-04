const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "seu-segredo-super-seguro";

const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = "https://ftlkmfucihajaafuvsqy.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ0bGttZnVjaWhhamFhZnV2c3F5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg0OTkxNDYsImV4cCI6MjA0NDA3NTE0Nn0.hTdTi3a8lyVVbcSLtpWsEpmbAaj9vjn6HBbtLmAjdu8";
const supabase = createClient(supabaseUrl, supabaseKey);


const registerUser = async (req, res) => {
  const { username, password, idade, endereco } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {
    username,
    password: hashedPassword,
    idade,
    endereco,
    pedidos: [],
  };
  users.push(newUser);

  const token = jwt.sign(
    {
      username: newUser.username,
      idade: newUser.idade,
      endereco: newUser.endereco,
      pedidos: newUser.pedidos,
    },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.status(201).json({
    message: `Usuário registrado com sucesso!`,
    token,
    username,
    idade,
    endereco,
  });
};

const loginUser = async (req, res) => {
    const { email, senha } = req.body;
    const { data, error, status } = await supabase
        .from("cliente")
        .select("*")
        .eq("email", email)
        .eq("senha", senha)
        .single();

    if (error && status !== 406) {
        return res.status(401).json({ message: "Credenciais inválidas" });
    }

    if (data) {
        const token = jwt.sign({ id: data.id, username: data.username }, JWT_SECRET);
        return res.json({ message: "Login bem-sucedido", token });
    } else {
        return res.status(401).json({ message: "Credenciais inválidas" });
    }
};

// // Login de usuário
// const loginUser = async (req, res) => {
//     const { username, password } = req.body;
//     const user = users.find(u => u.username === username);
//     if (!user) {
//         return res.status(400).json({ error: 'Usuário não encontrado' });
//     }

//     // Comparar senha
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//         return res.status(400).json({ error: 'Senha inválida' });
//     }

//     // Gerar token JWT
//     const token = jwt.sign({ username: user.username }, JWT_SECRET, { expiresIn: '1h' });
//     // Retornar dados do usuário junto com o token
//     res.json({ message: 'Login bem-sucedido!', token, user: {
//         username: user.username,
//         idade: user.idade,
//         endereco: user.endereco,
//         pedidos: user.pedidos
//     } });
// };

// const getUser = async (req, res) => {
//     res.status(200).json(users)
// }

module.exports = { registerUser, loginUser };
