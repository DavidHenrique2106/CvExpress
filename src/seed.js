const fetch = require('node-fetch');
require('dotenv').config();

console.log('CWD (diretório atual):', process.cwd());
console.log('Arquivo .env carregado?');
console.log('SUPABASE_URL:', process.env.SUPABASE_URL);
console.log('SUPABASE_KEY:', process.env.SUPABASE_KEY);

const BASE = process.env.SUPABASE_URL;
const HEADERS = {
  apikey: process.env.SUPABASE_KEY,
  Authorization: `Bearer ${process.env.SUPABASE_KEY}`,
  'Content-Type': 'application/json',
  Prefer: 'return=representation'
};

async function post(endpoint, body) {
  try {
    const res = await fetch(`${BASE}/rest/v1/${endpoint}`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify(body)
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Erro na requisição POST para ${endpoint}: ${res.status} - ${errorText}`);
    }

    const data = await res.json();
    console.log(`POST ${endpoint} retornou:`, data);
    return data[0];
  } catch (err) {
    console.error(`Erro na função post para endpoint ${endpoint}:`, err.message);
    throw err;  
  }
}

async function seed() {
  try {
    const david = await post('Pessoa', {
      nome: 'David Henrique',
      resumo: 'Desenvolvedor Web com foco em Front-end.'
    });

    console.log('Objeto david recebido:', david);

    if (!david || !david.id) {
      throw new Error('Objeto "david" inválido ou sem campo "id". Verifique a resposta do Supabase.');
    }

    await post('Experiencia', {
      pessoaid: david.id, 
      cargo: 'Front-end Developer',
      empresa: 'Startup X',
      inicio: '2022-01-01',
      fim: '2023-01-01'
    });

    await post('Formacao', {
      pessoaid: david.id, 
      instituicao: 'Católica de Pernambuco',
      curso: 'ADS',
      conclusao: '2025-12-01'
    });

await Promise.all([
  post('Skill', { pessoaid: david.id, nome: 'React' }),
  post('Skill', { pessoaid: david.id, nome: 'TypeScript' }),
  post('Skill', { pessoaid: david.id, nome: 'Next.js' })
]);

    const maria = await post('Pessoa', {
      nome: 'Maria Silva',
      resumo: 'Analista de Dados com experiência em Python.'
    });

    console.log('Objeto maria recebido:', maria);

    if (!maria || !maria.id) {
      throw new Error('Objeto "maria" inválido ou sem campo "id". Verifique a resposta do Supabase.');
    }

    await post('Experiencia', {
      pessoaid: maria.id,
      cargo: 'Data Analyst',
      empresa: 'Empresa Y',
      inicio: '2021-01-01',
      fim: '2023-06-01'
    });

    await post('Formacao', {
      pessoaid: maria.id,  
      instituicao: 'UFPE',
      curso: 'Engenharia da Computação',
      conclusao: '2023-12-01'
    });

await Promise.all([
  post('Skill', { pessoaid: maria.id, nome: 'Python' }),
  post('Skill', { pessoaid: maria.id, nome: 'Pandas' }),
  post('Skill', { pessoaid: maria.id, nome: 'SQL' })
]);

    console.log('✅ Dados inseridos via Supabase REST!');
    process.exit();
  } catch (err) {
    console.error('Erro na função seed:', err.message);
    process.exit(1);
  }
}

seed();
