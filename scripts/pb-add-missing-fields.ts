import PocketBase from 'pocketbase';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL || 'https://pocketbase-songs.ceredis.net');

/**
 * Script pour ajouter les champs manquants à la collection users
 * en utilisant la nouvelle structure "fields" de PocketBase
 */

async function addMissingFields() {
  try {
    // Authentification admin
    console.log('🔐 Authentification admin...');
    await pb.admins.authWithPassword(
      process.env.PB_ADMIN_EMAIL!,
      process.env.PB_ADMIN_PASSWORD!
    );
    console.log('✅ Authentification réussie\n');

    // Récupérer la collection users
    console.log('📋 Récupération de la collection users...');
    const collection = await pb.collections.getOne('users');
    console.log('✅ Collection récupérée\n');

    // Récupérer les champs existants
    const fields = collection.fields || [];
    console.log(`📊 Nombre de champs actuels: ${fields.length}\n`);

    // Vérifier quels champs manquent
    const hasUsername = fields.some((f: any) => f.name === 'username');
    const hasIsValidated = fields.some((f: any) => f.name === 'isValidated');
    const roleField = fields.find((f: any) => f.name === 'role');

    console.log('🔍 ÉTAT ACTUEL:');
    console.log(`  username: ${hasUsername ? '✅ Présent' : '❌ MANQUANT'}`);
    console.log(`  isValidated: ${hasIsValidated ? '✅ Présent' : '❌ MANQUANT'}`);
    if (roleField) {
      console.log(`  role: ✅ Présent (valeurs: ${JSON.stringify(roleField.values)})`);
    } else {
      console.log(`  role: ❌ MANQUANT`);
    }
    console.log('');

    // Préparer les nouveaux champs
    const newFields = [...fields];
    let modified = false;

    // 1. Ajouter le champ username s'il manque
    if (!hasUsername) {
      console.log('➕ Ajout du champ username...');
      newFields.push({
        id: Math.random().toString(36).substring(2, 10),
        name: 'username',
        type: 'text',
        required: true,
        presentable: false,
        unique: true,
        system: false,
        hidden: false,
        autogeneratePattern: '',
        pattern: '^[a-z0-9_]+$',
        min: 3,
        max: 50,
        primaryKey: false
      });
      modified = true;
    }

    // 2. Ajouter le champ isValidated s'il manque
    if (!hasIsValidated) {
      console.log('➕ Ajout du champ isValidated...');
      newFields.push({
        id: Math.random().toString(36).substring(2, 10),
        name: 'isValidated',
        type: 'bool',
        required: false,
        presentable: false,
        system: false,
        hidden: false
      });
      modified = true;
    }

    // 3. Mettre à jour le champ role pour inclure "student"
    if (roleField) {
      const roleIndex = newFields.findIndex((f: any) => f.name === 'role');
      if (roleIndex !== -1) {
        const currentValues = roleField.values || [];
        if (!currentValues.includes('student')) {
          console.log('🔧 Mise à jour du champ role pour inclure "student"...');
          newFields[roleIndex] = {
            ...roleField,
            values: ['student', 'teacher', 'admin']
          };
          modified = true;
        }
      }
    }

    if (!modified) {
      console.log('✅ Tous les champs sont déjà présents et corrects !');
      return;
    }

    // Mettre à jour la collection
    console.log('\n🔧 Application des modifications...');
    await pb.collections.update(collection.id, {
      fields: newFields
    });

    console.log('✅ Modifications appliquées avec succès !\n');

    // Vérifier les modifications
    const updatedCollection = await pb.collections.getOne('users');
    const updatedFields = updatedCollection.fields || [];
    
    const hasUsernameNow = updatedFields.some((f: any) => f.name === 'username');
    const hasIsValidatedNow = updatedFields.some((f: any) => f.name === 'isValidated');
    const roleFieldNow = updatedFields.find((f: any) => f.name === 'role');

    console.log('📊 VÉRIFICATION FINALE:');
    console.log(`  username: ${hasUsernameNow ? '✅ Présent' : '❌ MANQUANT'}`);
    console.log(`  isValidated: ${hasIsValidatedNow ? '✅ Présent' : '❌ MANQUANT'}`);
    if (roleFieldNow) {
      console.log(`  role: ✅ Présent (valeurs: ${JSON.stringify(roleFieldNow.values)})`);
    }

    console.log('\n✨ Mise à jour terminée !');
    console.log('\nℹ️  Vous pouvez maintenant:');
    console.log('  1. Exécuter: npx tsx scripts/pb-fix-admin-user.ts');
    console.log('  2. Vous connecter avec: admin@ceredis.net');

  } catch (error) {
    console.error('❌ Erreur:', error);
    if (error instanceof Error) {
      console.error('Message:', error.message);
      console.error('Stack:', error.stack);
    }
    process.exit(1);
  }
}

// Exécuter le script
addMissingFields().catch(console.error);
