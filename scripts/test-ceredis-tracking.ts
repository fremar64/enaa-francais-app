// scripts/test-ceredis-tracking.ts
// Script automatisé pour simuler la complétion des activités CEREDIS (xAPI, CaSS, PocketBase)
// Usage : ts-node scripts/test-ceredis-tracking.ts

const axios = require('axios');
const dotenv = require('dotenv');
const fs = require('fs');

dotenv.config({ path: '.env.local' });

const API_URL = 'http://localhost:3000/api/ceredis/track'; // Adapter si besoin

const testUser = {
  id: 'test-user-ceredis',
  email: 'test-ceredis@ceredis.net',
  role: 'student',
};

const activities = [
  {
    type: 'qcm',
    data: {
      question: 'Quel est le synonyme de "rapide" ?',
      reponse: 'vite',
      correct: true,
      score: 1,
    },
  },
  {
    type: 'texte_libre',
    data: {
      prompt: 'Exprime ton opinion sur la chanson.',
      texte: 'J’ai beaucoup aimé la chanson pour sa poésie.',
      score: 2,
    },
  },
  {
    type: 'journal',
    data: {
      reflexion: 'Aujourd’hui, j’ai appris de nouveaux mots.',
      contexte: 'Séance 2',
      score: 1,
    },
  },
  {
    type: 'ecoute',
    data: {
      audio: 'le-coureur.mp3',
      duree: 120,
      comprehension: 'bonne',
      score: 1,
    },
  },
];

async function run() {
  const results = [];
  for (const activity of activities) {
    const payload = {
      user: testUser,
      activityType: activity.type,
      activityData: activity.data,
      timestamp: new Date().toISOString(),
    };
    try {
      const res = await axios.post(API_URL, payload);
      results.push({
        type: activity.type,
        status: 'success',
        statusCode: res.status,
        data: res.data,
      });
      console.log(`✔️  [${activity.type}] OK`, res.data);
    } catch (err) {
      results.push({
        type: activity.type,
        status: 'error',
        error: err.response?.data || err.message,
      });
      console.error(`❌ [${activity.type}]`, err.response?.data || err.message);
    }
  }
  try {
    fs.writeFileSync('scripts/test-ceredis-tracking-report.json', JSON.stringify(results, null, 2));
    console.log('Rapport généré : scripts/test-ceredis-tracking-report.json');
  } catch (err) {
    console.error('Erreur lors de l’écriture du rapport :', err);
  }
}

run();
