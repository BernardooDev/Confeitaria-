require("dotenv").config();
const express = require("express");
const cors = require("cors");

// const pedidosRoutes = require('./routes/pedidos');
const categoriasRoutes = require("./routes/categorias");
const produtosRoutes = require("./routes/produtos");
const authRoutes = require("./routes/authRoutes");
const CheckoutRoute = require("./routes/checkout");
const PerfilRoute = require("./routes/perfil");
const PedidoRoute = require("./routes/pedido");
const ClientesRoute = require("./routes/clientes")
const DashboardRoute = require("./routes/dashboard")

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API está funcionando!");
});

// Usar as rotas de pedidos
// app.use('/pedidos', pedidosRoutes);
app.use("/categorias", categoriasRoutes);
app.use("/produtos", produtosRoutes);
app.use("/auth", authRoutes);
app.use("checkout", CheckoutRoute);
app.use("/perfil", PerfilRoute);
app.use("/pedido_cliente", PedidoRoute)
app.use("/clientes", ClientesRoute)
app.use("/dashboard", DashboardRoute)

// app.get("/cliente/:id", async (req, res) => {
//   const clienteId = req.params.id;

//   const { data: clienteData, error } = await supabase
//     .from("cliente")
//     .select(`id, nome, endereco_cliente_id`)
//     .eq("id", clienteId)
//     .single();
  
//   const enderecoId = clienteData.endereco_cliente_id

//   const { data: enderecoData, error: enderecoError } = await supabase
//       .from('endereco_cliente')
//       .select('rua_endereco, numero_endereco, bairro_endereco, cep_endereco')
//       .eq('id', enderecoId)
//       .single();
//     console.log("Teste1", enderecoData, enderecoError)

//   if (error) {
//     return res.status(500).json({ message: "Erro ao buscar cliente", error });
//   }

//   if (!enderecoData) {
//     return res.status(404).json({ message: "Cliente não encontrado" });
//   }

//   return res.json("Teste1", enderecoData);
// });

const PORT = 3306 || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

console.log("Servindo no backend Rodando!");
