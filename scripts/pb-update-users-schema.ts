import PocketBase from 'pocketbase';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL || 'https://pocketbase-songs.ceredis.net');

/**
 * Script pour mettre à jour le schéma de la collection "users" dans PocketBase
 * avec tous les champs nécessaires pour l'application Chansons Françaises.
 */

async function updateUsersSchema() {
  try {
    // Authentification admin
    console.log('🔐 Authentification admin...');
    await pb.admins.authWithPassword(
      process.env.PB_ADMIN_EMAIL!,
      process.env.PB_ADMIN_PASSWORD!
    );
    console.log('✅ Authentification réussie');

    // Récupérer la collection users
    console.log('\n📋 Récupération de la collection users...');
    const collection = await pb.collections.getOne('users');
    console.log('✅ Collection récupérée');

    // Afficher le schéma actuel
    console.log('\n📊 Schéma actuel:');
    const currentSchema = collection.schema || [];
    console.log(JSON.stringify(currentSchema, null, 2));

    // Définir le schéma complet
    const updatedSchema = [
      // Champ username (obligatoire, unique)
      {
        id: findOrGenerateId(currentSchema, 'username'),
        name: 'username',
        type: 'text',
        required: true,
        unique: true,
        options: {
          min: 3,
          max: 50,
          pattern: '^[a-z0-9_]+$'
        }
      },
      // Champ name (nom d'affichage)
      {
        id: findOrGenerateId(currentSchema, 'name'),
        name: 'name',
        type: 'text',
        required: true,
        options: {
          min: 1,
          max: 100
        }
      },
      // Champ avatar (fichier image)
      {
        id: findOrGenerateId(currentSchema, 'avatar'),
        name: 'avatar',
        type: 'file',
        required: false,
        options: {
          maxSelect: 1,
          maxSize: 5242880, // 5MB
          mimeTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
        }
      },
      // Champ role (student, teacher, admin)
      {
        id: findOrGenerateId(currentSchema, 'role'),
        name: 'role',
        type: 'select',
        required: true,
        options: {
          maxSelect: 1,
          values: ['student', 'teacher', 'admin']
        }
      },
      // Champ isValidated (validation par admin)
      {
        id: findOrGenerateId(currentSchema, 'isValidated'),
        name: 'isValidated',
        type: 'bool',
        required: false
      },
      // Champ niveau_actuel (niveau CECRL)
      {
        id: findOrGenerateId(currentSchema, 'niveau_actuel'),
        name: 'niveau_actuel',
        type: 'select',
        required: false,
        options: {
          maxSelect: 1,
          values: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']
        }
      },
      // Champ langue_maternelle
      {
        id: findOrGenerateId(currentSchema, 'langue_maternelle'),
        name: 'langue_maternelle',
        type: 'text',
        required: false,
        options: {
          max: 10
        }
      },
      // Champ preferences (JSON)
      {
        id: findOrGenerateId(currentSchema, 'preferences'),
        name: 'preferences',
        type: 'json',
        required: false
      }
    ];

    // Mettre à jour le schéma
    console.log('\n🔧 Mise à jour du schéma...');
    await pb.collections.update(collection.id, {
      schema: updatedSchema
    });

    console.log('✅ Schéma mis à jour avec succès !');
    
    // Afficher le nouveau schéma
    const updatedCollection = await pb.collections.getOne('users');
    console.log('\n📊 Nouveau schéma:');
    console.log(JSON.stringify(updatedCollection.schema, null, 2));

    console.log('\n✨ Mise à jour terminée !');
    console.log('\nℹ️  Champs ajoutés/mis à jour:');
    console.log('  - username (text, required, unique)');
    console.log('  - name (text, required)');
    console.log('  - avatar (file, optional)');
    console.log('  - role (select: student, teacher, admin)');
    console.log('  - isValidated (bool, optional)');
    console.log('  - niveau_actuel (select: A1-C2)');
    console.log('  - langue_maternelle (text, optional)');
    console.log('  - preferences (json, optional)');

  } catch (error) {
    console.error('❌ Erreur:', error);
    if (error instanceof Error) {
      console.error('Message:', error.message);
    }
    process.exit(1);
  }
}

/**
 * Trouve l'ID d'un champ existant ou génère un nouvel ID
 */
function findOrGenerateId(schema: any[] | null | undefined, fieldName: string): string {
  // Si le schéma n'existe pas ou est vide, générer un nouvel ID
  if (!schema || !Array.isArray(schema)) {
    return Math.random().toString(36).substring(2, 10);
  }
  
  const existingField = schema.find((f: any) => f && f.name === fieldName);
  if (existingField && existingField.id) {
    return existingField.id;
  }
  
  // Générer un ID aléatoire de 8 caractères
  return Math.random().toString(36).substring(2, 10);
}

// Exécuter le script
updateUsersSchema().catch(console.error);
