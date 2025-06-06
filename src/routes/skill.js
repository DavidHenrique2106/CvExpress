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
    const url = `${baseUrl}/rest/v1/Skill?pessoaid=eq.${pessoaid}`;
    const response = await fetch(url, { headers });
    if (!response.ok) {
      return res.status(response.status).json({ message: 'Erro ao buscar skills' });
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar skills', error: error.message });
  }
});

router.post('/', async (req, res) => {
  const pessoaId = req.params.id;
  const { nome } = req.body;

  if (!nome) {
    return res.status(400).json({ message: 'Campo "nome" é obrigatório' });
  }

  const skillData = { nome, pessoaid: pessoaId };

  try {
    const response = await fetch(`${baseUrl}/rest/v1/Skill`, {
      method: 'POST',
      headers,
      body: JSON.stringify(skillData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({ message: 'Erro ao criar skill', detalhe: errorText });
    }

    const data = await response.json();
    res.status(201).json(data[0]);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar skill', error: error.message });
  }
});

router.delete('/:skillId', async (req, res) => {
  const pessoaId = req.params.id;
  const skillId = req.params.skillId;

  try {
    const url = `${baseUrl}/rest/v1/Skill?id=eq.${skillId}&pessoaid=eq.${pessoaId}`;
    const response = await fetch(url, { method: 'DELETE', headers });

    if (response.status === 204) {
      res.status(204).send();
    } else {
      const errorText = await response.text();
      res.status(response.status).json({ message: 'Erro ao deletar skill', detalhe: errorText });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar skill', error: error.message });
  }
});

module.exports = router;
