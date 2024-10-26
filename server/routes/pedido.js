const express = require("express");
const router = express.Router();
const authenticateToken = require("../middlerwares/authMiddleware");
const supabase = require("../db/supabase");

router.get("/:id", async (req,res) => {
  const userId = req.params.id;
  try {
    const { data, error } = await supabase
    .from("pedido_cliente")
    .select("*")
    .eq("cliente_id", userId)
    console.log(data)

    res.status(200).json({
      data
    });
  }
  
  catch (error) {
    console.error("Erro ao procurar pedido:", error);
    res.status(500).json({ message: "Erro ao procurar pedido" });
  }
});

router.get("/", async (req,res) => {
  try {
    const { data, error } = await supabase
    .from("pedido_cliente")
    .select("*")
    console.log(data)

    res.status(200).json({
      data
    });
  }
  catch (error) {
    console.error("Erro ao procurar pedido:", error);
    res.status(500).json({ message: "Erro ao procurar pedido" });
  }
});


router.post("/", authenticateToken, async (req, res) => {
  const { valor_total, forma_entrega, pedido_status, pedido_produtos } = req.body;
  const cliente_id = req.user.id;
  
  try {
    const { data, error } = await supabase
      .from("pedido_cliente")
      .insert([
        {
          valor_total,
          cliente_id,
          forma_entrega,
          pedido_status,
          pedido_produtos,
        },
      ])
      .eq("cliente_id", cliente_id)
      .single();

    if (error) {
      return res.status(500).json({ message: "Erro ao criar pedido", error });
    }

    res
      .status(200)
      .json({ message: "Pedido criado com sucesso!", pedido: data });
  } catch (error) {
    console.error("Erro ao criar pedido:", error);
    res.status(500).json({ message: "Erro ao criar pedido" });
  }
});

module.exports = router;
