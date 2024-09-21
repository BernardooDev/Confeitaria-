import React, { useState } from 'react';

export default function Main() {
  const [formData, setFormData] = useState({
    tipoBolo: '',
    recheio: '',
    massa: '',
    tamanho: '',
    mensagem: '',
    dataEntrega: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Enviar os dados para o backend (API) ou banco de dados
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="encomendaForm">
      <label>Tipo de Bolo:</label>
      <select name="tipoBolo" value={formData.tipoBolo} onChange={handleInputChange}>
        <option value="">Selecione...</option>
        <option value="chocolate">Chocolate</option>
        <option value="morango">Morango</option>
        <option value="coco">Coco</option>
      </select>

      <label>Recheio:</label>
      <select name="recheio" value={formData.recheio} onChange={handleInputChange}>
        <option value="">Selecione...</option>
        <option value="brigadeiro">Brigadeiro</option>
        <option value="doceLeite">Doce de Leite</option>
        <option value="creme">Creme de Baunilha</option>
      </select>

      <label>Massa:</label>
      <select name="massa" value={formData.massa} onChange={handleInputChange}>
        <option value="">Selecione...</option>
        <option value="baunilha">Baunilha</option>
        <option value="chocolate">Chocolate</option>
        <option value="redVelvet">Red Velvet</option>
      </select>

      <label>Tamanho:</label>
      <input type="text" name="tamanho" value={formData.tamanho} onChange={handleInputChange} placeholder="Ex: Médio, Grande..." />

      <label>Mensagem Personalizada:</label>
      <textarea name="mensagem" value={formData.mensagem} onChange={handleInputChange} placeholder="Escreva sua mensagem (opcional)" />

      <label>Data de Entrega:</label>
      <input type="date" name="dataEntrega" value={formData.dataEntrega} onChange={handleInputChange} />

      <button type="submit">Enviar Encomenda</button>
    </form>
  );
}