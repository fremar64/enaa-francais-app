import PocketBase from 'pocketbase';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL || 'https://pocketbase-songs.ceredis.net');

/**
 * Script pour corriger l'utilisateur admin existant en ajoutant
 * les champs manquants (username, isValidated, etc.)
 */

async function fixAdminUser() {
  try {
    // Authentification admin
    console.log('🔐 Authentification admin...');
    await pb.admins.authWithPassword(
      process.env.PB_ADMIN_EMAIL!,
      process.env.PB_ADMIN_PASSWORD!
    );
    console.log('✅ Authentification réussie');

    // Rechercher l'utilisateur admin existant
    console.log('\n🔍 Recherche de l\'utilisateur admin...');
    const adminUser = await pb.collection('users').getFirstListItem('email="admin@ceredis.net"');
    
    if (!adminUser) {
      console.log('❌ Aucun utilisateur admin trouvé');
      return;
    }

    console.log('✅ Utilisateur admin trouvé:', adminUser.id);
    console.log('Données actuelles:', JSON.stringify(adminUser, null, 2));

    // Mettre à jour l'utilisateur avec les champs manquants
    console.log('\n🔧 Mise à jour de l\'utilisateur admin...');
    
    const updateData: any = {
      username: 'admin_ceredis',
      name: adminUser.name || 'Administrateur CEREDIS',
      isValidated: true,
      role: 'admin',
      preferences: adminUser.preferences || {
        theme: 'system',
        volume: 80,
        vitesse_lecture: 1,
        afficher_traduction: true
      }
    };

    console.log('Données de mise à jour:', JSON.stringify(updateData, null, 2));

    await pb.collection('users').update(adminUser.id, updateData);

    console.log('✅ Utilisateur admin mis à jour avec succès !');

    // Afficher les nouvelles données
    const updatedAdmin = await pb.collection('users').getOne(adminUser.id);
    console.log('\n📊 Nouvelles données:');
    console.log(JSON.stringify(updatedAdmin, null, 2));

    console.log('\n✨ Correction terminée !');
    console.log('\nℹ️  Vous pouvez maintenant vous connecter avec:');
    console.log('  Email: admin@ceredis.net');
    console.log('  Mot de passe: (celui que vous avez défini)');

  } catch (error) {
    console.error('❌ Erreur:', error);
    if (error instanceof Error) {
      console.error('Message:', error.message);
    }
    process.exit(1);
  }
}

// Exécuter le script
fixAdminUser().catch(console.error);
