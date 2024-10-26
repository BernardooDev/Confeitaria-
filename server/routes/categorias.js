const express = require('express');
const router = express.Router();
const supabase = require("../db/supabase");

router.get('/', async (req, res) => {
  const { data, error } = await supabase
  .from("categorias")
  .select("id, categoria_produto");
  console.log(data)
  try {
    res.status(200).json(data)
    console.log(data)

  } catch(err) {
    res.status(401).json(error)
  }
})

router.get('/:id', async (req, res) => {
  const categoriaId = req.params.id
  const { data, error } = await supabase
  .from("categorias")
  .select("id, categoria_produto")
  .eq("id", categoriaId);

  try {
    res.status(200).json(data)
    console.log(data)

  } catch(err) {
    res.status(401).json(error)
  }
});

module.exports = router;
