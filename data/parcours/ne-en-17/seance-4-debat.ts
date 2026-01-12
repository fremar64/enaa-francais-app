import type { Seance } from '../../../services/types';

const seance4: Omit<Seance, 'id' | 'created' | 'updated' | 'chanson'> = {
  titre: "Débat : Peut-on hériter d'une culpabilité ?",
  description: "Débattre des questions philosophiques soulevées par la chanson : culpabilité collective, responsabilité historique, et les positions de Jaspers et Arendt",
  ordre: 4,
  duree_estimee: 60,
  objectifs: [
    "Comprendre les différents types de culpabilité (Jaspers)",
    "Analyser la position de Goldman",
    "Développer une argumentation nuancée",
    "Débattre de la responsabilité historique"
  ],
  niveau: "C1",
  actif: true,
  competences_ciblees: [
    { code: "PO_C1", poids: 0.4 },
    { code: "PE_C1", poids: 0.4 },
    { code: "CRIT_C1", poids: 0.2 }
  ],
  prerequis: ["seance-1", "seance-2", "seance-3"],
  ecrans: [
    {
      id: "intro",
      type: "introduction",
      titre: "Une question morale fondamentale",
      contenu: `
        <p>La question centrale de Goldman est :</p>
        <p class="citation">"Peut-on hériter d'une culpabilité ?"</p>
        
        <p>Cette question a trois réponses possibles :</p>
        <ol>
          <li><strong>Oui</strong>, les descendants portent la culpabilité de leurs ancêtres</li>
          <li><strong>Non</strong>, chacun n'est responsable que de ses propres actes</li>
          <li><strong>Nuancé</strong>, il y a différents types de responsabilité</li>
        </ol>
        
        <p>Dans cette séance, nous allons explorer ces trois positions à travers la philosophie et le débat.</p>
      `,
      duree_estimee: 5
    },
    {
      id: "jaspers-typologie",
      type: "apprentissage",
      titre: "Karl Jaspers : Les 4 types de culpabilité",
      contenu: `
        <p>Le philosophe allemand Karl Jaspers (1883-1969) a distingué quatre types de culpabilité après la Seconde Guerre mondiale :</p>
        
        <h3>1. Culpabilité criminelle</h3>
        <ul>
          <li><strong>Qui ?</strong> Les auteurs directs des crimes</li>
          <li><strong>Exemple :</strong> Les nazis qui ont tué dans les camps</li>
          <li><strong>Transmissible ?</strong> NON</li>
          <li><strong>Jugement :</strong> Tribunaux</li>
        </ul>
        
        <h3>2. Culpabilité politique</h3>
        <ul>
          <li><strong>Qui ?</strong> Les citoyens du régime</li>
          <li><strong>Exemple :</strong> Tous les Allemands sous Hitler</li>
          <li><strong>Transmissible ?</strong> Partiellement (héritage politique)</li>
          <li><strong>Jugement :</strong> Histoire et politique</li>
        </ul>
        
        <h3>3. Culpabilité morale</h3>
        <ul>
          <li><strong>Qui ?</strong> Ceux qui auraient pu agir</li>
          <li><strong>Exemple :</strong> Ceux qui ont laissé faire</li>
          <li><strong>Transmissible ?</strong> NON (conscience individuelle)</li>
          <li><strong>Jugement :</strong> Conscience personnelle</li>
        </ul>
        
        <h3>4. Culpabilité métaphysique</h3>
        <ul>
          <li><strong>Qui ?</strong> Tous les humains (solidarité humaine)</li>
          <li><strong>Exemple :</strong> "Nul n'est innocent"</li>
          <li><strong>Transmissible ?</strong> OUI (condition humaine)</li>
          <li><strong>Jugement :</strong> Dieu / transcendance</li>
        </ul>
      `,
      activites: [
        {
          id: "qcm-jaspers",
          type: "qcm",
          enonce: "Selon Jaspers, quel type de culpabilité peut être transmis aux générations suivantes ?",
          options: [
            { id: "a", texte: "La culpabilité criminelle", correct: false },
            { id: "b", texte: "La culpabilité morale", correct: false },
            { id: "c", texte: "La culpabilité politique et métaphysique", correct: true },
            { id: "d", texte: "Aucune culpabilité n'est transmissible", correct: false }
          ],
          points: 10,
          feedback: {
            correct: "Exact ! Pour Jaspers, la culpabilité politique (héritage du régime) et métaphysique (solidarité humaine) peuvent être transmises.",
            incorrect: "Relisez les 4 types. Seules les culpabilités politique et métaphysique sont transmissibles."
          }
        }
      ],
      duree_estimee: 15
    },
    {
      id: "arendt-banalite",
      type: "apprentissage",
      titre: "Hannah Arendt : La banalité du mal",
      contenu: `
        <p>Hannah Arendt (1906-1975), philosophe juive allemande, a assisté au procès d'Adolf Eichmann en 1961.</p>
        
        <h3>Sa découverte choquante</h3>
        <p>Eichmann n'était pas un <strong>monstre</strong>, mais un homme <strong>banal</strong>, ordinaire, qui obéissait aux ordres.</p>
        
        <h3>Le concept de "banalité du mal"</h3>
        <ul>
          <li>Le mal peut être commis par des <strong>gens ordinaires</strong></li>
          <li>L'<strong>obéissance aveugle</strong> suffit pour participer au mal</li>
          <li>Il n'est pas nécessaire d'être méchant pour faire le mal</li>
          <li>L'<strong>absence de pensée critique</strong> est dangereuse</li>
        </ul>
        
        <h3>Le lien avec Goldman</h3>
        <p>Goldman dit : "J'aurais pu être l'un d'eux"</p>
        <p>Il reconnaît qu'il aurait pu, dans les mêmes circonstances, devenir un "homme ordinaire" qui participe au mal par conformisme.</p>
        
        <div class="reflexion">
          <p><strong>Question dérangeante :</strong></p>
          <p>Si le mal peut être commis par des gens ordinaires, ne sommes-nous pas tous potentiellement capables du pire dans certaines circonstances ?</p>
        </div>
      `,
      duree_estimee: 10
    },
    {
      id: "debat-refus-excuses",
      type: "production_ecrite",
      titre: "Débat : Le refus des excuses",
      contenu: `
        <p>Dans la chanson, Goldman énumère plusieurs excuses que les gens donnent pour justifier leur passivité ou leur complicité :</p>
        
        <ul class="excuses">
          <li>"C'était <strong>la guerre</strong>"</li>
          <li>"<strong>Personne</strong> ne pouvait savoir"</li>
          <li>"C'étaient des <strong>temps durs</strong>"</li>
          <li>"<strong>J'avais</strong> ma famille"</li>
        </ul>
        
        <p>Goldman répond : <strong>"Rien n'excuse"</strong></p>
        
        <h3>Le débat</h3>
        <p>Êtes-vous d'accord avec Goldman ? Les circonstances peuvent-elles justifier ou expliquer la complicité ?</p>
        
        <h3>Deux positions possibles</h3>
        
        <h4>Position A : D'accord avec Goldman (rien n'excuse)</h4>
        <p>Même dans les pires circonstances, chacun garde sa <strong>responsabilité morale</strong> de refuser le mal. Les excuses permettent l'oubli et la répétition.</p>
        
        <h4>Position B : Les circonstances expliquent</h4>
        <p>Il est facile de juger <strong>a posteriori</strong>. Dans le contexte de la peur, de la propagande et de la pression sociale, beaucoup n'avaient pas vraiment le choix.</p>
        
        <h3>Votre réponse</h3>
        <p>Écrivez un texte de <strong>120-180 mots</strong> où vous :</p>
        <ol>
          <li>Choisissez une position (ou proposez une position nuancée)</li>
          <li>Argumentez avec au moins 2 arguments solides</li>
          <li>Donnez des exemples concrets</li>
          <li>Reconnaissez la complexité de la question</li>
        </ol>
      `,
      activites: [
        {
          id: "debat-excuses",
          type: "texte_libre",
          enonce: "Votre position argumentée (120-180 mots) :",
          longueur_min: 120,
          longueur_max: 180,
          points: 35,
          criteres_evaluation: [
            "Position claire",
            "2+ arguments solides",
            "Exemples concrets",
            "Reconnaissance de la complexité"
          ]
        }
      ],
      duree_estimee: 25
    },
    {
      id: "analyse-goldman",
      type: "apprentissage",
      titre: "Analyse critique de la position de Goldman",
      contenu: `
        <h3>La position de Goldman : Humilité morale</h3>
        <p>Goldman adopte une position d'<strong>humilité radicale</strong> :</p>
        <ul>
          <li>Il refuse de juger ses ancêtres</li>
          <li>Il reconnaît qu'il aurait pu être complice</li>
          <li>Il affirme "Nul n'est innocent"</li>
        </ul>
        
        <h3>Forces de cette position</h3>
        <ul>
          <li>✅ <strong>Respect</strong> envers ceux qui ont vécu ces événements</li>
          <li>✅ <strong>Humilité</strong> face à la fragilité humaine</li>
          <li>✅ <strong>Refus de l'oubli</strong> et du confort moral</li>
          <li>✅ <strong>Reconnaissance</strong> de la contingence</li>
        </ul>
        
        <h3>Limites possibles</h3>
        <ul>
          <li>⚠️ Peut être <strong>paralysante</strong> (trop de culpabilité)</li>
          <li>⚠️ Risque de <strong>relativisme</strong> moral ("tout le monde aurait fait pareil")</li>
          <li>⚠️ Peut sembler <strong>masochiste</strong> (auto-accusation permanente)</li>
          <li>⚠️ Peut empêcher de <strong>condamner clairement</strong> les vrais coupables</li>
        </ul>
      `,
      activites: [
        {
          id: "qcm-critique",
          type: "qcm",
          enonce: "Quelle est la principale force de la position de Goldman ?",
          options: [
            { id: "a", texte: "Elle permet d'accuser les coupables", correct: false },
            { id: "b", texte: "Elle montre l'humilité morale face à l'histoire", correct: true },
            { id: "c", texte: "Elle excuse les crimes nazis", correct: false },
            { id: "d", texte: "Elle oublie le passé pour avancer", correct: false }
          ],
          points: 10,
          feedback: {
            correct: "Exact ! Goldman adopte une position d'humilité : il refuse de se croire moralement supérieur.",
            incorrect: "Relisez les forces de sa position. L'humilité morale est au cœur de sa démarche."
          }
        }
      ],
      duree_estimee: 10
    },
    {
      id: "synthese",
      type: "synthese",
      titre: "Synthèse du débat",
      contenu: `
        <h3>Ce que nous avons exploré</h3>
        
        <h4>Les 4 culpabilités de Jaspers</h4>
        <p>Criminelle, politique, morale, métaphysique - Seules les deux dernières sont transmissibles</p>
        
        <h4>La banalité du mal d'Arendt</h4>
        <p>Le mal peut être commis par des gens ordinaires qui obéissent sans penser</p>
        
        <h4>La position de Goldman</h4>
        <p>Humilité morale + Refus des excuses + "Nul n'est innocent"</p>
        
        <h3>Il n'y a pas de réponse simple</h3>
        <p>Cette question est <strong>complexe</strong> et légitime de nombreuses positions :</p>
        <ul>
          <li>Culpabilité strictement individuelle</li>
          <li>Responsabilité collective partielle</li>
          <li>Humilité morale radicale</li>
        </ul>
        
        <p>L'important n'est pas d'avoir <em>raison</em>, mais de <strong>penser</strong> ces questions avec honnêteté et nuance.</p>
        
        <p>Prochaine séance : Production finale - Réflexion personnelle sur la condition humaine.</p>
      `,
      duree_estimee: 5
    }
  ],
  points_total: 100
};

export default seance4;
