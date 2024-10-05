require('dotenv').config();
const express = require('express');
const cors = require('cors');

// const pedidosRoutes = require('./routes/pedidos');
const categoriasRoutes = require('./routes/categorias');
const itensRoutes = require("./routes/itens");
const authRoutes = require("./routes/authRoutes");
const CheckoutRoute = require("./routes/checkout");
const PerfilRoute = require("./routes/perfil")

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API está funcionando!');
});

// Usar as rotas de pedidos
// app.use('/pedidos', pedidosRoutes);
app.use('/categorias', categoriasRoutes);
app.use("/itens", itensRoutes)
app.use('/auth', authRoutes);
app.use("checkout", CheckoutRoute)
app.use('/perfil' , PerfilRoute)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

console.log("Servindo no backend Rodando!")
