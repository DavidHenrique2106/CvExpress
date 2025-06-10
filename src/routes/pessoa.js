const router = require('express').Router();
const fetch = require('node-fetch');
require('dotenv').config();

const baseUrl = process.env.SUPABASE_URL;
const headers = {
  apikey: process.env.SUPABASE_KEY,
  Authorization: `Bearer ${process.env.SUPABASE_KEY}`,
  'Content-Type': 'application/json',
  Prefer: 'return=representation'
};

router.get('/', async (req, res) => {
  try {
    const url = `${baseUrl}/rest/v1/Pessoa?select=*`;
    const response = await fetch(url, { headers });

    if (!response.ok) {
      return res.status(response.status).json({ erro: 'Erro ao buscar pessoas' });
    }

    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ erro: 'Erro interno', detalhe: err.message });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const url = `${baseUrl}/rest/v1/Pessoa?id=eq.${id}&select=*,Experiencia(*),Formacao(*),Skill(*)`;
    const response = await fetch(url, { headers });
    if (!response.ok) {
      return res.status(response.status).json({ erro: 'Erro ao buscar pessoa' });
    }
    const data = await response.json();
    if (data.length === 0) {
      return res.status(404).json({ erro: 'Pessoa não encontrada' });
    }
    res.json(data[0]);
  } catch (err) {
    res.status(500).json({ erro: 'Erro interno', detalhe: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { nome, resumo } = req.body;
    const body = JSON.stringify({ nome, resumo });
    const response = await fetch(`${baseUrl}/rest/v1/Pessoa`, {
      method: 'POST',
      headers,
      body
    });
    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({ erro: 'Erro ao criar pessoa', detalhe: errorText });
    }
    const data = await response.json();
    res.status(201).json(data[0]);
  } catch (err) {
    res.status(500).json({ erro: 'Erro interno', detalhe: err.message });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const dadosAtualizados = req.body;

  try {
    const response = await fetch(`${baseUrl}/rest/v1/Pessoa?id=eq.${id}`, {
      method: 'PATCH', 
      headers,
      body: JSON.stringify(dadosAtualizados)
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({ erro: 'Erro ao atualizar pessoa', detalhe: errorText });
    }

    const data = await response.json();

    if (data.length === 0) {
      return res.status(404).json({ erro: 'Pessoa não encontrada para atualizar' });
    }

    res.json(data[0]);
  } catch (err) {
    res.status(500).json({ erro: 'Erro interno', detalhe: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const response = await fetch(`${baseUrl}/rest/v1/Pessoa?id=eq.${id}`, {
      method: 'DELETE',
      headers
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({ erro: 'Erro ao deletar pessoa', detalhe: errorText });
    }

    const data = await response.json();
    if (data.length === 0) {
      return res.status(404).json({ erro: 'Pessoa não encontrada para deletar' });
    }

    res.json({ message: 'Pessoa deletada com sucesso', pessoa: data[0] });
  } catch (err) {
    res.status(500).json({ erro: 'Erro interno', detalhe: err.message });
  }
});

module.exports = router;
