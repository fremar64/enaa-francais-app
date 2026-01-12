import type { Seance } from '../../../services/types';

const seance3: Omit<Seance, 'id' | 'created' | 'updated' | 'chanson'> = {
  titre: "Le conditionnel passé - Exprimer l'irréel du passé",
  description: "Maîtriser le conditionnel passé pour exprimer des regrets, des reproches et des hypothèses irréelles sur le passé",
  ordre: 3,
  duree_estimee: 50,
  objectifs: [
    "Former et utiliser le conditionnel passé",
    "Exprimer des regrets sur le passé",
    "Formuler des hypothèses irréelles",
    "Comprendre les phrases conditionnelles complexes"
  ],
  niveau: "B2",
  actif: true,
  competences_ciblees: [
    { code: "GRAM_B2", poids: 0.6 },
    { code: "PE_B2", poids: 0.4 }
  ],
  prerequis: ["seance-1", "seance-2"],
  ecrans: [
    {
      id: "intro",
      type: "introduction",
      titre: "Le temps des 'et si...'",
      contenu: `
        <p>Le conditionnel passé est le temps de la réflexion sur ce qui <strong>aurait pu être</strong> mais n'a pas été.</p>
        <p>Goldman l'utilise constamment dans sa chanson :</p>
        <ul>
          <li>"<em>J'<strong>aurais</strong> pu naître</em> à Leidenstadt"</li>
          <li>"<em>Je <strong>serais</strong> devenu</em> quoi ?"</li>
          <li>"<em>J'<strong>aurais</strong> pu</em> être l'un d'eux"</li>
        </ul>
        <p>C'est le temps des <strong>regrets</strong>, des <strong>reproches</strong> et des <strong>hypothèses</strong> sur un passé qu'on ne peut plus changer.</p>
      `,
      duree_estimee: 5
    },
    {
      id: "formation",
      type: "apprentissage",
      titre: "Formation du conditionnel passé",
      contenu: `
        <h3>Structure</h3>
        <p class="formule"><strong>AVOIR ou ÊTRE au conditionnel présent + PARTICIPE PASSÉ</strong></p>
        
        <h3>Avec AVOIR (la majorité des verbes)</h3>
        <table>
          <tr>
            <td>J'<strong>aurais fait</strong></td>
            <td>Nous <strong>aurions fait</strong></td>
          </tr>
          <tr>
            <td>Tu <strong>aurais fait</strong></td>
            <td>Vous <strong>auriez fait</strong></td>
          </tr>
          <tr>
            <td>Il/Elle <strong>aurait fait</strong></td>
            <td>Ils/Elles <strong>auraient fait</strong></td>
          </tr>
        </table>
        
        <h3>Avec ÊTRE (verbes de mouvement + pronominaux)</h3>
        <table>
          <tr>
            <td>Je <strong>serais allé(e)</strong></td>
            <td>Nous <strong>serions allé(e)s</strong></td>
          </tr>
          <tr>
            <td>Tu <strong>serais allé(e)</strong></td>
            <td>Vous <strong>seriez allé(e)(s)</strong></td>
          </tr>
          <tr>
            <td>Il/Elle <strong>serait allé(e)</strong></td>
            <td>Ils/Elles <strong>seraient allé(e)s</strong></td>
          </tr>
        </table>
        
        <h3>Négation</h3>
        <p>Je <strong>n'aurais pas</strong> fait / Je <strong>ne serais pas</strong> allé(e)</p>
        
        <h3>Exemples de la chanson</h3>
        <ul>
          <li>J'<strong>aurais pu</strong> (pouvoir)</li>
          <li>J'<strong>aurais dû</strong> (devoir)</li>
          <li>Je <strong>serais devenu</strong> (devenir)</li>
          <li>Ils <strong>auraient</strong> été (être)</li>
        </ul>
      `,
      duree_estimee: 15
    },
    {
      id: "exercice-conjugaison",
      type: "exercice",
      titre: "Exercice : Complétez au conditionnel passé",
      contenu: `
        <p>Complétez les phrases avec les verbes entre parenthèses au conditionnel passé :</p>
      `,
      activites: [
        {
          id: "trou-1",
          type: "texte_trous",
          enonce: "Si j'étais né en 1917, je [devoir] combattre.",
          reponse_attendue: "aurais dû",
          points: 5,
          feedback: {
            correct: "Exact ! 'aurais dû' = auxiliaire AVOIR au conditionnel + participe passé de DEVOIR.",
            incorrect: "Non. Formule : AVOIR (conditionnel) + participe passé. Ici : aurais + dû."
          }
        },
        {
          id: "trou-2",
          type: "texte_trous",
          enonce: "Sans la guerre, ils [pouvoir] vivre en paix.",
          reponse_attendue: "auraient pu",
          points: 5,
          feedback: {
            correct: "Parfait ! 'auraient pu' = ILS auraient + pu (participe passé de POUVOIR).",
            incorrect: "Attention à l'accord : ILS → auraient (pluriel)."
          }
        },
        {
          id: "trou-3",
          type: "texte_trous",
          enonce: "Nous [devenir] quoi dans cette situation ?",
          reponse_attendue: "serions devenus",
          points: 5,
          feedback: {
            correct: "Bravo ! DEVENIR utilise l'auxiliaire ÊTRE : serions devenus (accord avec 'nous').",
            incorrect: "DEVENIR prend ÊTRE comme auxiliaire. NOUS serions devenus."
          }
        },
        {
          id: "trou-4",
          type: "texte_trous",
          enonce: "Elle [partir] si elle avait su.",
          reponse_attendue: "serait partie",
          points: 5,
          feedback: {
            correct: "Excellent ! PARTIR prend ÊTRE : serait partie (accord féminin).",
            incorrect: "Verbe de mouvement → ÊTRE. ELLE serait partie (accord féminin)."
          }
        }
      ],
      duree_estimee: 10
    },
    {
      id: "phrases-conditionnelles",
      type: "apprentissage",
      titre: "Les phrases conditionnelles avec SI",
      contenu: `
        <h3>Structure complète</h3>
        <p class="formule"><strong>SI + PLUS-QUE-PARFAIT, CONDITIONNEL PASSÉ</strong></p>
        
        <h3>Exemples</h3>
        <ul>
          <li><strong>Si</strong> j'avais vécu en 1940, j'<strong>aurais peut-être été</strong> complice.</li>
          <li><strong>Si</strong> elle était née là-bas, elle <strong>aurait connu</strong> l'horreur.</li>
          <li><strong>Si</strong> nous avions su, nous <strong>aurions agi</strong> différemment.</li>
        </ul>
        
        <h3>Variantes et nuances</h3>
        <ul>
          <li><strong>Même si</strong> + plus-que-parfait : insiste sur l'hypothèse</li>
          <li><strong>Au cas où</strong> + conditionnel passé : éventualité dans le passé</li>
          <li><strong>Sans + nom</strong>, conditionnel passé : autre façon d'exprimer l'hypothèse</li>
        </ul>
        
        <div class="exemple">
          <p><strong>Exemples de nuances :</strong></p>
          <ul>
            <li>Même si j'avais résisté, rien n'aurait changé.</li>
            <li>Au cas où ils auraient fui, tout était préparé.</li>
            <li>Sans cette guerre, ils auraient vécu normalement.</li>
          </ul>
        </div>
      `,
      duree_estimee: 10
    },
    {
      id: "production-guidee",
      type: "production_ecrite",
      titre: "Production guidée : Hypothèses historiques",
      contenu: `
        <h3>Consigne</h3>
        <p>En vous inspirant de la chanson de Goldman, formulez <strong>5 hypothèses</strong> sur ce que vous auriez pu être ou faire si vous aviez vécu dans un contexte historique différent.</p>
        
        <p>Utilisez des phrases complètes avec <strong>SI + plus-que-parfait, conditionnel passé</strong>.</p>
        
        <h3>Exemples</h3>
        <ul>
          <li><em>Si j'avais vécu en Allemagne en 1940, j'aurais peut-être été enrôlé dans l'armée.</em></li>
          <li><em>Si j'étais né dans une famille nazie, j'aurais probablement cru à leur propagande.</em></li>
        </ul>
        
        <h3>Points à considérer</h3>
        <ul>
          <li>Contexte historique (guerre, dictature, etc.)</li>
          <li>Circonstances familiales</li>
          <li>Éducation reçue</li>
          <li>Pression sociale</li>
          <li>Alternatives possibles</li>
        </ul>
        
        <p><strong>Longueur</strong> : 60-100 mots (environ 5 phrases)</p>
      `,
      activites: [
        {
          id: "production-hypotheses",
          type: "texte_libre",
          enonce: "Vos 5 hypothèses au conditionnel passé :",
          longueur_min: 60,
          longueur_max: 100,
          points: 35,
          criteres_evaluation: [
            "5 phrases avec SI + plus-que-parfait, conditionnel passé",
            "Variété des contextes évoqués",
            "Honnêteté et humilité dans la réflexion",
            "Correction grammaticale"
          ]
        }
      ],
      duree_estimee: 20
    },
    {
      id: "synthese",
      type: "synthese",
      titre: "Synthèse grammaticale",
      contenu: `
        <h3>Vous maîtrisez maintenant</h3>
        
        <h4>Formation</h4>
        <p><strong>AVOIR/ÊTRE (conditionnel) + PARTICIPE PASSÉ</strong></p>
        <p>J'aurais fait, je serais allé(e), nous aurions été, ils seraient venus</p>
        
        <h4>Usages principaux</h4>
        <ul>
          <li><strong>Regret</strong> : J'aurais dû résister.</li>
          <li><strong>Reproche</strong> : Tu aurais pu agir.</li>
          <li><strong>Hypothèse irréelle</strong> : Si j'avais vécu là-bas, j'aurais été différent.</li>
        </ul>
        
        <h4>Phrase conditionnelle complète</h4>
        <p><strong>SI + plus-que-parfait, conditionnel passé</strong></p>
        <p>Si j'avais su → j'aurais agi</p>
        
        <h3>Message de Goldman</h3>
        <p>En utilisant constamment le conditionnel passé, Goldman nous invite à nous mettre à la place des autres et à reconnaître notre fragilité humaine face aux circonstances historiques.</p>
        
        <p>Prochaine séance : Débat philosophique sur la culpabilité collective.</p>
      `,
      duree_estimee: 5
    }
  ],
  points_total: 100
};

export default seance3;
