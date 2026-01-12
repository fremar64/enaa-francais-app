import { Seance } from '@/types/seance';

// Séances pour la chanson "La Vie en Rose" (ID: 1)
export const seancesLaVieEnRose: Seance[] = [
  {
    id: 'seance-1-1',
    chansonId: '1',
    numero: 1,
    titre: 'Découverte de la chanson',
    description: 'Première écoute et compréhension globale de "La Vie en Rose"',
    objectifs: [
      'Comprendre le thème principal de la chanson',
      'Identifier les émotions exprimées',
      'Repérer les mots-clés du vocabulaire de l\'amour',
    ],
    dureeEstimee: 20,
    competences: ['CO_GLOBALE', 'VOC_THEMATIQUE'],
    ecrans: [
      {
        id: 'ecran-1-1-1',
        numero: 1,
        titre: 'Bienvenue',
        type: 'introduction',
        consigne: 'Découvrons ensemble cette chanson emblématique d\'Édith Piaf',
        dureeEstimee: 2,
        activite: {
          type: 'introduction',
          contenu: `
# La Vie en Rose

Bienvenue dans cette séance consacrée à l'un des plus grands classiques de la chanson française !

## Ce que vous allez apprendre :
- Comprendre le sens global de la chanson
- Découvrir le vocabulaire de l'amour en français
- Identifier les émotions dans une chanson

## À propos de la chanson
"La Vie en Rose" a été écrite et interprétée par Édith Piaf en 1947. Elle est devenue un symbole de l'amour à la française dans le monde entier.

Durée estimée : **20 minutes**
          `,
        },
      },
      {
        id: 'ecran-1-1-2',
        numero: 2,
        titre: 'Première écoute',
        type: 'ecoute_decouverte',
        consigne: 'Écoutez attentivement la chanson sans lire les paroles. Concentrez-vous sur la mélodie et les émotions.',
        dureeEstimee: 4,
        activite: {
          type: 'ecoute_decouverte',
          contenu: `
Fermez les yeux et laissez-vous porter par la musique.

**Pendant l'écoute, essayez de répondre mentalement à ces questions :**
- Quelle est l'ambiance générale ?
- Quelles émotions ressentez-vous ?
- Pouvez-vous identifier certains mots ?

*Cliquez sur "Play" pour démarrer l'écoute, puis sur "Suivant" quand vous êtes prêt.*
          `,
        },
        audioDebut: 0,
        audioFin: 198,
      },
      {
        id: 'ecran-1-1-3',
        numero: 3,
        titre: 'Vos premières impressions',
        type: 'quiz_qcm',
        consigne: 'Répondez à ces questions sur vos premières impressions',
        dureeEstimee: 3,
        difficulte: 'facile',
        competencesCibles: ['CO_GLOBALE'],
        activite: {
          type: 'quiz_qcm',
          questions: [
            {
              id: 'q1',
              question: 'Quelle est l\'ambiance générale de cette chanson ?',
              options: [
                'Triste et mélancolique',
                'Romantique et heureuse',
                'Énergique et festive',
                'Calme et neutre',
              ],
              reponseCorrecte: 1,
              explication: 'La chanson exprime le bonheur d\'être amoureux, avec une mélodie douce et romantique.',
            },
            {
              id: 'q2',
              question: 'De quoi parle principalement cette chanson ?',
              options: [
                'De la nature',
                'D\'un voyage',
                'De l\'amour',
                'Du travail',
              ],
              reponseCorrecte: 2,
              explication: '"La Vie en Rose" est une déclaration d\'amour. Édith Piaf décrit le bonheur d\'aimer.',
            },
            {
              id: 'q3',
              question: 'Quel sentiment dominant exprime la chanteuse ?',
              options: [
                'La tristesse',
                'La colère',
                'Le bonheur',
                'La peur',
              ],
              reponseCorrecte: 2,
              explication: 'La chanteuse exprime son bonheur d\'être aimée et de voir "la vie en rose".',
            },
          ],
        },
      },
      {
        id: 'ecran-1-1-4',
        numero: 4,
        titre: 'Le vocabulaire de l\'amour',
        type: 'texte_a_trous',
        consigne: 'Complétez ces vers avec les mots manquants. Réécoutez si nécessaire.',
        dureeEstimee: 5,
        difficulte: 'moyen',
        competencesCibles: ['VOC_THEMATIQUE', 'CO_DETAILLEE'],
        activite: {
          type: 'texte_a_trous',
          exercice: {
            id: 'tat-1',
            texteAvecTrous: 'Des {{yeux}} qui font baisser les miens\nUn {{rire}} qui se perd sur sa bouche\nVoilà le {{portrait}} sans retouche\nDe l\'homme auquel j\'{{appartiens}}',
            motsCaches: ['yeux', 'rire', 'portrait', 'appartiens'],
            indicesOptionnels: [
              'Organe de la vision',
              'Expression de joie',
              'Description d\'une personne',
              'Verbe : être à quelqu\'un',
            ],
          },
        },
        audioDebut: 0,
        audioFin: 20,
      },
      {
        id: 'ecran-1-1-5',
        numero: 5,
        titre: 'L\'expression "voir la vie en rose"',
        type: 'comprehension',
        consigne: 'Analysons cette expression française célèbre',
        dureeEstimee: 3,
        competencesCibles: ['VOC_CONTEXTUEL'],
        activite: {
          type: 'quiz_qcm',
          questions: [
            {
              id: 'q4',
              question: 'Que signifie l\'expression "voir la vie en rose" ?',
              options: [
                'Aimer la couleur rose',
                'Être optimiste, voir les choses positivement',
                'Être triste',
                'Porter des lunettes roses',
              ],
              reponseCorrecte: 1,
              explication: '"Voir la vie en rose" signifie être optimiste, heureux, et voir le bon côté des choses. C\'est une expression idiomatique française très connue.',
            },
            {
              id: 'q5',
              question: 'Pourquoi la chanteuse voit-elle "la vie en rose" ?',
              options: [
                'Parce qu\'elle a gagné de l\'argent',
                'Parce qu\'elle est amoureuse',
                'Parce qu\'il fait beau',
                'Parce qu\'elle voyage',
              ],
              reponseCorrecte: 1,
              explication: 'L\'amour lui donne une vision positive de la vie. Quand l\'homme qu\'elle aime la prend dans ses bras, tout devient beau.',
            },
          ],
        },
      },
      {
        id: 'ecran-1-1-6',
        numero: 6,
        titre: 'Bilan de la séance',
        type: 'bilan',
        consigne: 'Récapitulons ce que vous avez appris',
        dureeEstimee: 3,
        activite: {
          type: 'bilan',
          contenu: `
# Félicitations ! 🎉

Vous avez terminé la première séance sur "La Vie en Rose".

## Ce que vous avez appris :

### Vocabulaire
- **les yeux** - eyes
- **le rire** - laughter  
- **le portrait** - portrait
- **appartenir** - to belong to
- **la vie en rose** - seeing life through rose-colored glasses

### Expression idiomatique
**"Voir la vie en rose"** = être optimiste, voir les choses positivement grâce au bonheur (souvent lié à l'amour)

### Culture
Cette chanson de 1947 est l'une des plus célèbres chansons françaises au monde. Édith Piaf, surnommée "la môme", est une icône de la chanson française.

## Prochaine séance
Dans la séance suivante, nous analyserons plus en détail le texte et la grammaire de cette chanson.
          `,
        },
      },
    ],
  },
  {
    id: 'seance-1-2',
    chansonId: '1',
    numero: 2,
    titre: 'Analyse du texte',
    description: 'Étude approfondie des paroles et de la structure du texte',
    objectifs: [
      'Analyser la structure narrative du texte',
      'Identifier les figures de style',
      'Enrichir le vocabulaire descriptif',
    ],
    dureeEstimee: 25,
    competences: ['CE_LITTERALE', 'VOC_FIGURES', 'CE_INFERENTIELLE'],
    prerequis: ['seance-1-1'],
    ecrans: [
      {
        id: 'ecran-1-2-1',
        numero: 1,
        titre: 'Introduction',
        type: 'introduction',
        consigne: 'Analysons maintenant le texte en profondeur',
        activite: {
          type: 'introduction',
          contenu: `
# Analyse du texte

Dans cette séance, nous allons décortiquer les paroles de "La Vie en Rose" pour mieux comprendre la richesse du texte.

## Objectifs :
- Comprendre la structure du texte
- Identifier les images poétiques
- Analyser les sentiments exprimés

Durée estimée : **25 minutes**
          `,
        },
      },
      {
        id: 'ecran-1-2-2',
        numero: 2,
        titre: 'Ordre des vers',
        type: 'ordre_elements',
        consigne: 'Remettez ces vers dans le bon ordre',
        dureeEstimee: 4,
        difficulte: 'moyen',
        competencesCibles: ['CE_LITTERALE'],
        activite: {
          type: 'ordre_elements',
          exercice: {
            id: 'ordre-1',
            consigne: 'Remettez les vers dans l\'ordre de la chanson',
            elements: [
              { id: 'v1', texte: 'Des yeux qui font baisser les miens', ordre: 1 },
              { id: 'v2', texte: 'Un rire qui se perd sur sa bouche', ordre: 2 },
              { id: 'v3', texte: 'Voilà le portrait sans retouche', ordre: 3 },
              { id: 'v4', texte: 'De l\'homme auquel j\'appartiens', ordre: 4 },
            ],
          },
        },
      },
    ],
  },
];

// Séances pour "Formidable" de Stromae (ID: 3)
export const seancesFormidable: Seance[] = [
  {
    id: 'seance-3-1',
    chansonId: '3',
    numero: 1,
    titre: 'Découverte et contexte',
    description: 'Première approche de cette chanson contemporaine sur la rupture amoureuse',
    objectifs: [
      'Comprendre le contexte de la chanson',
      'Identifier le registre de langue familier',
      'Repérer les jeux de mots',
    ],
    dureeEstimee: 25,
    competences: ['CO_GLOBALE', 'VOC_STYLISTIQUE', 'SYNT_PHRASE_SIMPLE'],
    ecrans: [
      {
        id: 'ecran-3-1-1',
        numero: 1,
        titre: 'Bienvenue',
        type: 'introduction',
        consigne: 'Découvrons une chanson contemporaine de Stromae',
        activite: {
          type: 'introduction',
          contenu: `
# Formidable - Stromae

Bienvenue dans cette séance sur "Formidable" de Stromae (2013).

## Ce que vous allez découvrir :
- Le français familier et oral
- Le thème de la rupture amoureuse
- Le jeu sur les mots "formidable" et "fort minable"

## À propos de l'artiste
Stromae (Paul Van Haver) est un artiste belge qui mélange musique électronique et textes profonds. Son clip de "Formidable" a été filmé dans les rues de Bruxelles, où il jouait un homme ivre.

Durée estimée : **25 minutes**
          `,
        },
      },
      {
        id: 'ecran-3-1-2',
        numero: 2,
        titre: 'Le jeu de mots',
        type: 'quiz_qcm',
        consigne: 'Analysons le jeu de mots du titre',
        dureeEstimee: 4,
        difficulte: 'moyen',
        competencesCibles: ['VOC_STYLISTIQUE'],
        activite: {
          type: 'quiz_qcm',
          questions: [
            {
              id: 'q1',
              question: 'Dans "Tu étais formidable, j\'étais fort minable", quel est le jeu de mots ?',
              options: [
                'Il n\'y a pas de jeu de mots',
                '"Formidable" se décompose en "fort" + "minable"',
                'Les deux mots riment',
                '"Formidable" est un anglicisme',
              ],
              reponseCorrecte: 1,
              explication: 'Stromae joue sur la décomposition du mot "formidable" en "fort minable". C\'est un jeu de mots brillant qui oppose le positif (formidable = super) au négatif (minable = pathétique).',
            },
            {
              id: 'q2',
              question: 'Que signifie "minable" en français familier ?',
              options: [
                'Quelqu\'un de riche',
                'Quelqu\'un de pathétique, nul',
                'Quelqu\'un de courageux',
                'Quelqu\'un de sportif',
              ],
              reponseCorrecte: 1,
              explication: '"Minable" est un adjectif familier qui signifie pathétique, pitoyable, nul. Le narrateur se décrit comme "fort minable" après sa rupture.',
            },
          ],
        },
      },
      {
        id: 'ecran-3-1-3',
        numero: 3,
        titre: 'Le français familier',
        type: 'texte_a_trous',
        consigne: 'Complétez avec les contractions du français oral',
        dureeEstimee: 5,
        difficulte: 'moyen',
        competencesCibles: ['VOC_STYLISTIQUE', 'SYNT_PHRASE_SIMPLE'],
        activite: {
          type: 'texte_a_trous',
          exercice: {
            id: 'tat-stromae',
            texteAvecTrous: '{{J\'suis}} perdu, {{j\'ai}} trop bu\nTu m\'as laissé {{seul}} là',
            motsCaches: ['J\'suis', 'j\'ai', 'seul'],
            indicesOptionnels: [
              'Contraction de "Je suis"',
              'Verbe avoir au passé composé',
              'Sans personne',
            ],
          },
        },
      },
    ],
  },
];

// Map de toutes les séances par chanson ID
export const seancesParChanson: Record<string, Seance[]> = {
  '1': seancesLaVieEnRose,
  '3': seancesFormidable,
};

// Fonction utilitaire pour récupérer les séances d'une chanson
export function getSeancesByChansonId(chansonId: string): Seance[] {
  return seancesParChanson[chansonId] || [];
}

// Fonction pour récupérer une séance spécifique
export function getSeanceById(seanceId: string): Seance | undefined {
  for (const seances of Object.values(seancesParChanson)) {
    const seance = seances.find(s => s.id === seanceId);
    if (seance) return seance;
  }
  return undefined;
}
