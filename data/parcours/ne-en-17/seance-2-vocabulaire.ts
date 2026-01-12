import type { Seance } from '../../../services/types';

const seance2: Omit<Seance, 'id' | 'created' | 'updated' | 'chanson'> = {
  titre: "Vocabulaire de la responsabilité et de la mémoire",
  description: "Maîtriser le vocabulaire de la mémoire historique, de la responsabilité morale et de la culpabilité collective",
  ordre: 2,
  duree_estimee: 45,
  objectifs: [
    "Maîtriser le vocabulaire de la mémoire et de l'oubli",
    "Utiliser les mots de la responsabilité morale",
    "Exprimer la culpabilité et le pardon",
    "Distinguer responsabilité et culpabilité"
  ],
  niveau: "B2",
  actif: true,
  competences_ciblees: [
    { code: "CE_B2", poids: 0.3 },
    { code: "PO_B2", poids: 0.2 },
    { code: "PE_B2", poids: 0.5 }
  ],
  prerequis: ["seance-1"],
  ecrans: [
    {
      id: "intro",
      type: "introduction",
      titre: "Des mots qui portent le poids de l'histoire",
      contenu: `
        <p>Cette séance explore le vocabulaire riche et nuancé qui entoure les questions de mémoire historique et de responsabilité morale.</p>
        <p>Nous allons travailler sur deux champs lexicaux principaux :</p>
        <ul>
          <li>Le vocabulaire de la <strong>mémoire et de l'oubli</strong></li>
          <li>Le vocabulaire de la <strong>responsabilité et de la culpabilité</strong></li>
        </ul>
        <p>Ces mots sont essentiels pour comprendre les débats sur la mémoire collective et la transmission de l'histoire.</p>
      `,
      duree_estimee: 5
    },
    {
      id: "vocabulaire-memoire",
      type: "apprentissage",
      titre: "Le vocabulaire de la mémoire et de l'oubli",
      contenu: `
        <h3>Verbes de la mémoire</h3>
        <ul>
          <li><strong>Se souvenir de</strong> : garder en mémoire (neutre)</li>
          <li><strong>Commémorer</strong> : célébrer le souvenir de manière officielle</li>
          <li><strong>Témoigner de</strong> : rapporter ce qu'on a vu ou vécu</li>
          <li><strong>Transmettre</strong> : passer à la génération suivante</li>
        </ul>
        
        <h3>Verbes de l'oubli</h3>
        <ul>
          <li><strong>Oublier</strong> : perdre le souvenir (neutre)</li>
          <li><strong>Effacer</strong> : faire disparaître volontairement</li>
          <li><strong>Occulter</strong> : cacher, dissimuler</li>
          <li><strong>Nier</strong> : refuser de reconnaître</li>
        </ul>
        
        <h3>Noms</h3>
        <ul>
          <li><strong>La mémoire collective</strong> : souvenir partagé par un groupe</li>
          <li><strong>Le devoir de mémoire</strong> : obligation morale de se souvenir</li>
          <li><strong>Le témoignage</strong> : récit d'un témoin</li>
          <li><strong>L'oubli</strong> : perte du souvenir</li>
          <li><strong>L'amnésie collective</strong> : oubli volontaire d'une société</li>
          <li><strong>Le déni</strong> : refus de reconnaître la réalité</li>
        </ul>
      `,
      duree_estimee: 10
    },
    {
      id: "exercice-memoire",
      type: "exercice",
      titre: "Exercice : Mémoire et oubli",
      contenu: `
        <p>Choisissez le verbe qui convient le mieux dans chaque contexte :</p>
      `,
      activites: [
        {
          id: "qcm-memoire",
          type: "qcm",
          enonce: "Les survivants de la Shoah ________ leur expérience pour que l'histoire ne se répète pas.",
          options: [
            { id: "a", texte: "oublient", correct: false },
            { id: "b", texte: "transmettent", correct: true },
            { id: "c", texte: "occultent", correct: false },
            { id: "d", texte: "nient", correct: false }
          ],
          points: 5,
          feedback: {
            correct: "Exact ! 'Transmettre' signifie passer quelque chose aux générations suivantes.",
            incorrect: "Non. Cherchez le verbe qui signifie 'passer à la génération suivante'."
          }
        },
        {
          id: "qcm-commemorer",
          type: "qcm",
          enonce: "Chaque année, nous ________ la libération des camps.",
          options: [
            { id: "a", texte: "commémorons", correct: true },
            { id: "b", texte: "oublions", correct: false },
            { id: "c", texte: "effaçons", correct: false },
            { id: "d", texte: "transmettons", correct: false }
          ],
          points: 5,
          feedback: {
            correct: "Parfait ! 'Commémorer' signifie célébrer solennellement le souvenir.",
            incorrect: "Non. Quel verbe signifie 'célébrer le souvenir de manière officielle' ?"
          }
        },
        {
          id: "qcm-occulter",
          type: "qcm",
          enonce: "Certains pays tentent d'________ les pages sombres de leur histoire.",
          options: [
            { id: "a", texte: "commémorer", correct: false },
            { id: "b", texte: "occulter", correct: true },
            { id: "c", texte: "témoigner", correct: false },
            { id: "d", texte: "transmettre", correct: false }
          ],
          points: 5,
          feedback: {
            correct: "Bravo ! 'Occulter' signifie cacher, dissimuler volontairement.",
            incorrect: "Non. Cherchez le verbe qui signifie 'cacher' ou 'dissimuler'."
          }
        }
      ],
      duree_estimee: 10
    },
    {
      id: "vocabulaire-responsabilite",
      type: "apprentissage",
      titre: "Le vocabulaire de la responsabilité et de la culpabilité",
      contenu: `
        <h3>Noms</h3>
        <ul>
          <li><strong>La responsabilité</strong> : devoir moral envers quelque chose</li>
          <li><strong>La culpabilité</strong> : sentiment d'être coupable</li>
          <li><strong>La faute</strong> : action moralement condamnable</li>
          <li><strong>Le crime</strong> : violation grave de la loi</li>
          <li><strong>L'innocence</strong> : absence de culpabilité</li>
          <li><strong>L'héritage</strong> : ce qu'on reçoit du passé</li>
          <li><strong>Le fardeau</strong> : poids difficile à porter (métaphore)</li>
        </ul>
        
        <h3>Verbes</h3>
        <ul>
          <li><strong>Assumer</strong> : accepter et prendre en charge</li>
          <li><strong>Hériter de</strong> : recevoir en héritage</li>
          <li><strong>Léguer</strong> : transmettre par héritage</li>
          <li><strong>Porter</strong> : supporter (un poids, une responsabilité)</li>
          <li><strong>Endosser</strong> : prendre sur soi</li>
          <li><strong>Rejeter</strong> : refuser</li>
          <li><strong>Nier</strong> : refuser de reconnaître</li>
        </ul>
        
        <h3>Adjectifs</h3>
        <ul>
          <li><strong>Coupable</strong> : qui a commis une faute</li>
          <li><strong>Innocent(e)</strong> : qui n'est pas coupable</li>
          <li><strong>Responsable</strong> : qui doit répondre de ses actes</li>
          <li><strong>Collectif/collective</strong> : qui concerne un groupe</li>
        </ul>
      `,
      duree_estimee: 10
    },
    {
      id: "distinction-conceptuelle",
      type: "apprentissage",
      titre: "Distinction importante : Culpabilité ≠ Responsabilité",
      contenu: `
        <p>Goldman fait une distinction essentielle entre deux concepts :</p>
        
        <h3>La culpabilité</h3>
        <ul>
          <li>Implique d'avoir <strong>commis</strong> personnellement un acte</li>
          <li>Ne peut pas être transmise ou héritée</li>
          <li>Exemple : Les nazis qui ont participé aux crimes sont <em>coupables</em></li>
        </ul>
        
        <h3>La responsabilité</h3>
        <ul>
          <li>C'est un <strong>devoir moral</strong> envers le passé</li>
          <li>Peut être <strong>héritée</strong> ou <strong>transmise</strong></li>
          <li>Ne signifie pas qu'on est coupable personnellement</li>
          <li>Exemple : Les générations actuelles ont une <em>responsabilité</em> de mémoire</li>
        </ul>
        
        <div class="exemple">
          <p><strong>Exemple de Goldman :</strong></p>
          <p>"Je n'ai pas participé à la Shoah, donc je ne suis pas <strong>coupable</strong>. Mais j'ai la <strong>responsabilité</strong> de ne pas oublier et de transmettre la mémoire."</p>
        </div>
      `,
      activites: [
        {
          id: "qcm-distinction",
          type: "qcm",
          enonce: "Les jeunes Allemands d'aujourd'hui ne sont pas ________ des crimes nazis, mais ils ont une ________ de mémoire.",
          options: [
            { id: "a", texte: "coupables / responsabilité", correct: true },
            { id: "b", texte: "responsables / culpabilité", correct: false },
            { id: "c", texte: "coupables / culpabilité", correct: false },
            { id: "d", texte: "innocents / indifférence", correct: false }
          ],
          points: 10,
          feedback: {
            correct: "Parfait ! Vous avez compris la distinction essentielle : on peut avoir une responsabilité sans être coupable.",
            incorrect: "Relisez la distinction entre culpabilité (avoir commis un acte) et responsabilité (devoir moral)."
          }
        }
      ],
      duree_estimee: 10
    },
    {
      id: "production-ecrite",
      type: "production_ecrite",
      titre: "Production écrite : Position nuancée",
      contenu: `
        <p>Goldman dit : "Nul n'est innocent, nul."</p>
        <p>Cette affirmation signifie que nous avons tous une part de responsabilité face à l'histoire.</p>
        
        <h3>Consigne</h3>
        <p>Écrivez un texte de <strong>100-150 mots</strong> où vous exprimez votre position sur cette question :</p>
        <p class="question">"Les jeunes générations ont-elles une responsabilité face aux crimes commis par leurs ancêtres ?"</p>
        
        <h3>Critères d'évaluation</h3>
        <ul>
          <li>Position claire et nuancée (10 points)</li>
          <li>Utilisation de 5 mots minimum du vocabulaire de cette séance (15 points)</li>
          <li>Distinction entre culpabilité et responsabilité (5 points)</li>
          <li>Argumentation cohérente (5 points)</li>
        </ul>
        
        <p><em>Conseil : N'ayez pas peur d'exprimer votre honnête opinion, même si elle diffère de celle de Goldman. L'important est d'argumenter de manière nuancée.</em></p>
      `,
      activites: [
        {
          id: "production-responsabilite",
          type: "texte_libre",
          enonce: "Votre réflexion (100-150 mots) :",
          longueur_min: 100,
          longueur_max: 150,
          points: 35,
          criteres_evaluation: [
            "Position claire",
            "Vocabulaire approprié (5+ mots)",
            "Distinction culpabilité/responsabilité",
            "Argumentation nuancée"
          ]
        }
      ],
      duree_estimee: 25
    },
    {
      id: "synthese",
      type: "synthese",
      titre: "Synthèse du vocabulaire",
      contenu: `
        <h3>Vous avez appris</h3>
        
        <h4>Vocabulaire de la mémoire</h4>
        <p>Se souvenir, commémorer, témoigner, transmettre / Oublier, effacer, occulter, nier</p>
        
        <h4>Vocabulaire de la responsabilité</h4>
        <p>Responsabilité, culpabilité, faute, crime, innocence, héritage, fardeau / Assumer, hériter, léguer, porter, endosser, rejeter</p>
        
        <h4>Distinction conceptuelle clé</h4>
        <p><strong>Culpabilité</strong> = avoir commis personnellement (non transmissible)<br>
        <strong>Responsabilité</strong> = devoir moral (peut être héritée)</p>
        
        <h3>À retenir</h3>
        <p>Ce vocabulaire vous permettra de participer aux débats sur la mémoire collective et la responsabilité historique avec précision et nuance.</p>
        
        <p>Prochaine séance : La grammaire du conditionnel passé pour exprimer les hypothèses irréelles.</p>
      `,
      duree_estimee: 5
    }
  ],
  points_total: 100
};

export default seance2;
