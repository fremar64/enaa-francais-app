import PocketBase from 'pocketbase';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL || 'https://pocketbase-songs.ceredis.net');

/**
 * Script pour tester la connexion d'un utilisateur
 */

async function testLogin() {
  try {
    console.log('🔐 Test de connexion utilisateur...');
    console.log('URL PocketBase:', process.env.NEXT_PUBLIC_POCKETBASE_URL);
    console.log('');

    // Demander les credentials
    const email = 'admin@ceredis.net';
    console.log(`📧 Email: ${email}`);
    console.log('🔑 Mot de passe: [entrez votre mot de passe]');
    console.log('');

    // Vous pouvez remplacer 'VOTRE_MOT_DE_PASSE' par votre vrai mot de passe pour tester
    const password = process.argv[2] || 'VOTRE_MOT_DE_PASSE';

    if (password === 'VOTRE_MOT_DE_PASSE') {
      console.log('❌ Erreur: Vous devez fournir votre mot de passe');
      console.log('Usage: npx tsx scripts/pb-test-login.ts VOTRE_MOT_DE_PASSE');
      process.exit(1);
    }

    console.log('🔄 Tentative de connexion...');
    const authData = await pb.collection('users').authWithPassword(email, password);

    console.log('✅ Connexion réussie !');
    console.log('');
    console.log('👤 Utilisateur connecté:');
    console.log(JSON.stringify(authData.record, null, 2));
    console.log('');
    console.log('🔑 Token:');
    console.log(authData.token);
    console.log('');
    console.log('✅ Le compte fonctionne correctement !');

  } catch (error: any) {
    console.error('❌ Erreur de connexion:', error);
    console.error('');
    if (error.status) {
      console.error(`Status: ${error.status}`);
    }
    if (error.message) {
      console.error(`Message: ${error.message}`);
    }
    if (error.data) {
      console.error('Data:', JSON.stringify(error.data, null, 2));
    }
    console.error('');
    console.error('💡 Vérifiez:');
    console.error('  1. Que le mot de passe est correct');
    console.error('  2. Que l\'email est: admin@ceredis.net');
    console.error('  3. Que PocketBase est accessible');
    process.exit(1);
  }
}

// Exécuter le script
testLogin().catch(console.error);
