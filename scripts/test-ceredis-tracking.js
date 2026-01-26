// scripts/test-ceredis-tracking.js
// Script automatisé pour simuler la complétion des activités CEREDIS (xAPI, CaSS, PocketBase)
// Usage : node scripts/test-ceredis-tracking.js

const axios = require('axios');
const dotenv = require('dotenv');
const fs = require('fs');

dotenv.config({ path: '.env.local' });

const API_URL = 'http://localhost:3000/api/ceredis/track'; // Adapter si besoin


const testUser = {
  userId: 'test-user-ceredis',
  userName: 'Test Ceredis',
};

const activities = [
  {
    activityType: 'qcm',
    activityId: 'act-qcm-001',
    activityName: 'QCM Synonymes',
    chansonId: 'chanson-001',
    seanceId: 'seance-001',
    score: 1,
    maxScore: 1,
    duration: 30,
    niveau: 'A2',
    response: 'vite',
  },
  {
    activityType: 'texte_libre',
    activityId: 'act-txtlibre-001',
    activityName: 'Texte libre sur la chanson',
    chansonId: 'chanson-001',
    seanceId: 'seance-001',
    score: 2,
    maxScore: 2,
    duration: 120,
    niveau: 'A2',
    response: 'J’ai beaucoup aimé la chanson pour sa poésie.',
  },
  {
    activityType: 'journal_reflexif',
    activityId: 'act-journal-001',
    activityName: 'Journal réflexif',
    chansonId: 'chanson-001',
    seanceId: 'seance-001',
    score: 1,
    maxScore: 1,
    duration: 60,
    niveau: 'A2',
    response: 'Aujourd’hui, j’ai appris de nouveaux mots.',
  },
  {
    activityType: 'ecoute',
    activityId: 'act-ecoute-001',
    activityName: 'Écoute de la chanson',
    chansonId: 'chanson-001',
    seanceId: 'seance-001',
    score: 1,
    maxScore: 1,
    duration: 120,
    niveau: 'A2',
    response: 'bonne',
  },
];

async function run() {
  const results = [];
  for (const activity of activities) {
    const payload = {
      ...testUser,
      ...activity,
      timestamp: new Date().toISOString(),
    };
    try {
      const res = await axios.post(API_URL, payload);
      results.push({
        type: activity.activityType,
        status: 'success',
        statusCode: res.status,
        data: res.data,
      });
      console.log(`✔️  [${activity.activityType}] OK`, res.data);
    } catch (err) {
      results.push({
        type: activity.activityType,
        status: 'error',
        error: err.response?.data || err.message,
      });
      console.error(`❌ [${activity.activityType}]`, err.response?.data || err.message);
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
