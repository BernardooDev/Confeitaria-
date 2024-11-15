const express = require('express');
const router = express.Router();
const supabase = require("../db/supabase");

router.get('/', async (req, res) => {
  try {
    const { data: PromocoesData, error: ErrorData } = await supabase
      .from('promocoes')
      .select('*')
      .eq('ativo', true);

    if (ErrorData) {
      throw ErrorData;
    }

    const produtoIds = PromocoesData.map(promo => promo.produto_id);

    if (produtoIds.length === 0) {
      return res.status(200).json({ promocoes: PromocoesData, produtos: [] });
    }

    const { data: ProdutosData, error: ErrorProdutos } = await supabase
      .from('produto')
      .select('*')
      .in('id', produtoIds);

    if (ErrorProdutos) {
      throw ErrorProdutos;
    }
    
    res.status(200).json({ promocoes: PromocoesData, produtos: ProdutosData });

  } catch (err) {
    console.error('Erro ao buscar promoções ou produtos:', err);
    res.status(500).json({ error: 'Erro ao buscar dados', detalhes: err });
  }
});

module.exports = router;
