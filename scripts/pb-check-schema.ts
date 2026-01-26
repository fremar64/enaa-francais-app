import PocketBase from 'pocketbase';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL || 'https://pocketbase-songs.ceredis.net');

/**
 * Script pour vérifier le schéma actuel de la collection users
 */

async function checkSchema() {
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
    console.log('📊 INFORMATIONS COMPLÈTES:');
    console.log('='.repeat(80));
    console.log(JSON.stringify(collection, null, 2));
    console.log('='.repeat(80));

    console.log('\n📋 CHAMPS DANS LE SCHÉMA:');
    if (collection.schema && Array.isArray(collection.schema)) {
      collection.schema.forEach((field: any, index: number) => {
        console.log(`\n${index + 1}. ${field.name}`);
        console.log(`   Type: ${field.type}`);
        console.log(`   Required: ${field.required || false}`);
        console.log(`   Unique: ${field.unique || false}`);
        if (field.options) {
          console.log(`   Options: ${JSON.stringify(field.options)}`);
        }
      });
    } else {
      console.log('❌ Aucun schéma trouvé ou schéma invalide');
    }

    // Vérifier les champs critiques
    console.log('\n\n✅ VÉRIFICATION DES CHAMPS CRITIQUES:');
    const hasUsername = collection.schema?.some((f: any) => f.name === 'username');
    const hasIsValidated = collection.schema?.some((f: any) => f.name === 'isValidated');
    const hasRole = collection.schema?.some((f: any) => f.name === 'role');
    
    console.log(`  username: ${hasUsername ? '✅ Présent' : '❌ MANQUANT'}`);
    console.log(`  isValidated: ${hasIsValidated ? '✅ Présent' : '❌ MANQUANT'}`);
    console.log(`  role: ${hasRole ? '✅ Présent' : '❌ MANQUANT'}`);

    if (hasRole) {
      const roleField = collection.schema?.find((f: any) => f.name === 'role');
      console.log(`  role values: ${JSON.stringify(roleField?.options?.values)}`);
    }

  } catch (error) {
    console.error('❌ Erreur:', error);
    if (error instanceof Error) {
      console.error('Message:', error.message);
    }
    process.exit(1);
  }
}

// Exécuter le script
checkSchema().catch(console.error);
