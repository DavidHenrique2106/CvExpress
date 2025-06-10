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
      const url = `${baseUrl}/rest/v1/Formacao?pessoaid=eq.${pessoaid}`;
      const response = await fetch(url, { headers });

      if (!response.ok) {
        return res.status(response.status).json({ message: 'Erro ao buscar formações' });
      }

      const data = await response.json();
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar formações', error: error.message });
    }
  });

  router.post('/', async (req, res) => {
    const pessoaId = req.params.id;
    const { curso, instituicao, conclusao } = req.body;

    if (!curso || !instituicao) {
      return res.status(400).json({ message: 'Campos "curso" e "instituicao" são obrigatórios' });
    }

    const formacaoData = {
      curso,
      instituicao,
      conclusao,
      pessoaid: pessoaId,
    };

    try {
      const response = await fetch(`${baseUrl}/rest/v1/Formacao`, {
        method: 'POST',
        headers,
        body: JSON.stringify(formacaoData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        return res.status(response.status).json({ message: 'Erro ao criar formação', detalhe: errorText });
      }

      const data = await response.json();
      res.status(201).json(data[0]);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao criar formação', error: error.message });
    }
  });

  router.delete('/:formacaoId', async (req, res) => {
    const pessoaId = req.params.id;
    const formacaoId = req.params.formacaoId;

    try {
      const url = `${baseUrl}/rest/v1/Formacao?id=eq.${formacaoId}&pessoaid=eq.${pessoaId}`;
      const response = await fetch(url, { method: 'DELETE', headers });

      if (response.status === 204) {
        res.status(204).send();
      } else {
        const errorText = await response.text();
        res.status(response.status).json({ message: 'Erro ao deletar formação', detalhe: errorText });
      }
    } catch (error) {
      res.status(500).json({ message: 'Erro ao deletar formação', error: error.message });
    }
  });

  module.exports = router;
