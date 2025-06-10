const router = require('express').Router({ mergeParams: true });
require('dotenv').config();
const fetch = require('node-fetch');

const baseUrl = process.env.SUPABASE_URL;
const headers = {
  apikey: process.env.SUPABASE_KEY,
  Authorization: `Bearer ${process.env.SUPABASE_KEY}`,
  'Content-Type': 'application/json',
  Prefer: 'return=representation',
};

router.get('/', async (req, res) => {
  const pessoaid = req.params.id;
  try {
    const url = `${baseUrl}/rest/v1/Experiencia?pessoaid=eq.${pessoaid}`;
    const response = await fetch(url, { headers });

    if (!response.ok) {
      return res.status(response.status).json({ message: 'Erro ao buscar experiências' });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar experiências', error: error.message });
  }
});

router.post('/', async (req, res) => {
  const pessoaId = req.params.id;
  const { empresa, cargo, inicio, fim } = req.body;

  if (!empresa || !cargo) {
    return res.status(400).json({ message: 'Campos "empresa" e "cargo" são obrigatórios' });
  }

  const experienciaData = {
    empresa,
    cargo,
    inicio,
    fim,
    pessoaid: pessoaId,
  };

  try {
    const response = await fetch(`${baseUrl}/rest/v1/Experiencia`, {
      method: 'POST',
      headers,
      body: JSON.stringify(experienciaData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({ message: 'Erro ao criar experiência', detalhe: errorText });
    }

    const data = await response.json();
    res.status(201).json(data[0]);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar experiência', error: error.message });
  }
});

router.patch('/:experienciaId', async (req, res) => {
  const pessoaId = req.params.id;
  const experienciaId = req.params.experienciaId;
  const updates = req.body;

  if (!updates || Object.keys(updates).length === 0) {
    return res.status(400).json({ message: 'Nenhum dado para atualizar foi enviado' });
  }

  try {
    const url = `${baseUrl}/rest/v1/Experiencia?id=eq.${experienciaId}&pessoaid=eq.${pessoaId}`;
    const response = await fetch(url, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(updates),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({ message: 'Erro ao atualizar experiência', detalhe: errorText });
    }

    const data = await response.json();
    if (data.length === 0) {
      return res.status(404).json({ message: 'Experiência não encontrada' });
    }

    res.json(data[0]);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar experiência', error: error.message });
  }
});

router.delete('/:experienciaId', async (req, res) => {
  const pessoaid = req.params.id;
  const experienciaId = req.params.experienciaId;

  try {
    const url = `${baseUrl}/rest/v1/Experiencia?id=eq.${experienciaId}&pessoaid=eq.${pessoaid}`;
    const response = await fetch(url, { method: 'DELETE', headers });

    if (response.status === 204) {
      res.status(204).send();
    } else {
      const errorText = await response.text();
      res.status(response.status).json({ message: 'Erro ao deletar experiência', detalhe: errorText });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar experiência', error: error.message });
  }
});

module.exports = router;
