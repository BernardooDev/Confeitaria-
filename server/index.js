// server/index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const pedidosRoutes = require('./api/routes/pedidos');
const categoriasRoutes = require('./api/routes/categorias');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API está funcionando!');
});

// Usar as rotas de pedidos
app.use('/api/pedidos', pedidosRoutes);
app.use('/api/categorias', categoriasRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
