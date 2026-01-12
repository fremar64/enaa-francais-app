/**
 * Chanson : Né en 17 à Leidenstadt
 * Artiste : Jean-Jacques Goldman
 * Album : Entre gris clair et gris foncé (1987)
 * 
 * Thème : Humilité morale, contingence, responsabilité historique
 * Une réflexion profonde sur le hasard de la naissance et la responsabilité morale
 */

import type { Chanson } from '@/services/pocketbase';

export const chansonData: Omit<Chanson, 'id' | 'created' | 'updated'> = {
  // Métadonnées de base
  titre: "Né en 17 à Leidenstadt",
  artiste: "Jean-Jacques Goldman",
  album: "Entre gris clair et gris foncé",
  annee: 1987,
  duree: 234, // 3:54
  audio_url: "/Répertoire des chansons/Né en 17 à Leidenstadt.mp3",
  
  // Classification
  genre: ["chanson française", "pop"],
  niveau: "B2",
  type_texte: "reflexif_interrogatif",
  
  // Thématiques
  themes: [
    "responsabilité morale",
    "contingence",
    "histoire",
    "Shoah",
    "humilité",
    "empathie",
    "condition humaine",
    "hasard de la naissance",
    "culpabilité collective"
  ],
  
  // Paroles (texte complet pour l'éditeur)
  paroles: `<p>
Je suis né en dix-sept à Leidenstadt<br/>
A deux heures d'Hambourg et du canal<br/>
Comme tous les miens dans ce pays<br/>
J'ai travaillé, j'ai eu des enfants, j'ai tout oublié
</p>

<p>
Les prairies ont recouvert les traces<br/>
Et le soc efface les pas<br/>
Mais dans la maison on entend comme des coups de feu<br/>
Et c'est comme si quelqu'un criait encore
</p>

<p>
Je suis né en dix-sept à Leidenstadt<br/>
Ça ressemblait à n'importe quelle autre ville<br/>
Mais aujourd'hui quelque chose me rattrape<br/>
Une honte mêlée de peur, de colère ou je ne sais quoi
</p>

<p>
Un jour, j'ai su qu'il y avait eu ça<br/>
Quelque part ici, je ne sais pas où<br/>
Mais peut-être dans ce jardin qui jouxte notre cour<br/>
Peut-être ici même où j'ai grandi
</p>

<p>
Je crois que nul n'est innocent<br/>
De ce qu'il s'est passé là-bas<br/>
Même si aujourd'hui je n'avais pas trente ans<br/>
Je suis né en dix-sept à Leidenstadt
</p>

<p>
On dit que c'était une guerre<br/>
Que les temps étaient durs<br/>
Qu'ils donnaient, qu'ils obéissaient<br/>
Qu'il fallait se taire ou mourir
</p>

<p>
Mais je ne veux pas qu'on m'explique<br/>
Je ne veux pas que l'on m'apprenne<br/>
Cette culpabilité que les hommes m'ont léguée<br/>
Je la prends, je la garde, elle est mienne
</p>

<p>
Je suis né en dix-sept à Leidenstadt<br/>
Et je ne veux absoudre personne<br/>
Je ne juge pas, mais dans l'odeur d'un soir d'automne<br/>
Il me semble entendre encore des cris
</p>`,
  
  // Paroles synchronisées
  paroles_synchronisees: [
    { id: "l1", numero: 1, texte: "Je suis né en dix-sept à Leidenstadt", timestamp: 12 },
    { id: "l2", numero: 2, texte: "A deux heures d'Hambourg et du canal", timestamp: 17 },
    { id: "l3", numero: 3, texte: "Comme tous les miens dans ce pays", timestamp: 22 },
    { id: "l4", numero: 4, texte: "J'ai travaillé, j'ai eu des enfants, j'ai tout oublié", timestamp: 27 },
    { id: "l5", numero: 5, texte: "", timestamp: 32 },
    { id: "l6", numero: 6, texte: "Les prairies ont recouvert les traces", timestamp: 42 },
    { id: "l7", numero: 7, texte: "Et le soc efface les pas", timestamp: 47 },
    { id: "l8", numero: 8, texte: "Mais dans la maison on entend comme des coups de feu", timestamp: 52 },
    { id: "l9", numero: 9, texte: "Et c'est comme si quelqu'un criait encore", timestamp: 59 },
    { id: "l10", numero: 10, texte: "", timestamp: 64 },
    { id: "l11", numero: 11, texte: "Je suis né en dix-sept à Leidenstadt", timestamp: 74 },
    { id: "l12", numero: 12, texte: "Ça ressemblait à n'importe quelle autre ville", timestamp: 79 },
    { id: "l13", numero: 13, texte: "Mais aujourd'hui quelque chose me rattrape", timestamp: 84 },
    { id: "l14", numero: 14, texte: "Une honte mêlée de peur, de colère ou je ne sais quoi", timestamp: 90 },
    { id: "l15", numero: 15, texte: "", timestamp: 95 },
    { id: "l16", numero: 16, texte: "Un jour, j'ai su qu'il y avait eu ça", timestamp: 105 },
    { id: "l17", numero: 17, texte: "Quelque part ici, je ne sais pas où", timestamp: 110 },
    { id: "l18", numero: 18, texte: "Mais peut-être dans ce jardin qui jouxte notre cour", timestamp: 115 },
    { id: "l19", numero: 19, texte: "Peut-être ici même où j'ai grandi", timestamp: 122 },
    { id: "l20", numero: 20, texte: "", timestamp: 127 },
    { id: "l21", numero: 21, texte: "Je crois que nul n'est innocent", timestamp: 137 },
    { id: "l22", numero: 22, texte: "De ce qu'il s'est passé là-bas", timestamp: 142 },
    { id: "l23", numero: 23, texte: "Même si aujourd'hui je n'avais pas trente ans", timestamp: 147 },
    { id: "l24", numero: 24, texte: "Je suis né en dix-sept à Leidenstadt", timestamp: 153 },
    { id: "l25", numero: 25, texte: "", timestamp: 158 },
    { id: "l26", numero: 26, texte: "On dit que c'était une guerre", timestamp: 168 },
    { id: "l27", numero: 27, texte: "Que les temps étaient durs", timestamp: 172 },
    { id: "l28", numero: 28, texte: "Qu'ils donnaient, qu'ils obéissaient", timestamp: 176 },
    { id: "l29", numero: 29, texte: "Qu'il fallait se taire ou mourir", timestamp: 181 },
    { id: "l30", numero: 30, texte: "", timestamp: 186 },
    { id: "l31", numero: 31, texte: "Mais je ne veux pas qu'on m'explique", timestamp: 191 },
    { id: "l32", numero: 32, texte: "Je ne veux pas que l'on m'apprenne", timestamp: 196 },
    { id: "l33", numero: 33, texte: "Cette culpabilité que les hommes m'ont léguée", timestamp: 201 },
    { id: "l34", numero: 34, texte: "Je la prends, je la garde, elle est mienne", timestamp: 207 },
    { id: "l35", numero: 35, texte: "", timestamp: 212 },
    { id: "l36", numero: 36, texte: "Je suis né en dix-sept à Leidenstadt", timestamp: 217 },
    { id: "l37", numero: 37, texte: "Et je ne veux absoudre personne", timestamp: 222 },
    { id: "l38", numero: 38, texte: "Je ne juge pas, mais dans l'odeur d'un soir d'automne", timestamp: 227 },
    { id: "l39", numero: 39, texte: "Il me semble entendre encore des cris", timestamp: 232 },
  ],
  
  // Vocabulaire clé
  vocabulaire_cle: {
    "Leidenstadt": "Ville fictive allemande (de 'Leiden' = souffrance). Goldman crée un lieu symbolique.",
    "le soc": "Partie de la charrue qui laboure la terre. Métaphore de l'oubli qui 'efface' l'histoire.",
    "rattraper": "Rejoindre, atteindre quelqu'un qui avançait. Ici : le passé qui revient.",
    "jouxte": "Être très proche de, être contigu à. Langage soutenu.",
    "absoudre": "Pardonner, déclarer innocent (terme religieux/juridique).",
    "innocent": "Non coupable. Question morale centrale : peut-on être innocent du passé ?",
    "culpabilité": "Sentiment d'être coupable. Responsabilité morale transmise.",
    "léguer": "Transmettre par héritage. La culpabilité comme héritage historique."
  },
  
  // Points de grammaire
  points_grammaire: [
    "Le conditionnel passé : 'j'aurais pu', 'auraient dû' (hypothèses irréelles sur le passé)",
    "Le subjonctif imparfait (langage soutenu) : 'Il fallait que...'",
    "La négation : 'je ne veux pas que...', 'nul n'est innocent' (forme soutenue de 'personne')"
  ],
  
  // Contexte culturel et philosophique (TRÈS DÉTAILLÉ pour ce parcours)
  contexte_culturel: `# Contexte historique et moral

## 1. Leidenstadt : Une ville fictive symbolique

Goldman crée une ville imaginaire **"Leidenstadt"** :
- **"Leiden"** (allemand) = souffrance, douleur
- **"Stadt"** = ville
- Ville fictive représentant TOUTE ville allemande ordinaire ayant participé à la Shoah

## 2. La Shoah et les camps

La chanson fait référence à la **Shoah** (Holocauste) :
- Extermination systématique de 6 millions de Juifs (1941-1945)
- Camps de concentration et d'extermination
- **Participation active ou passive** de millions d'Allemands ordinaires
- Question morale : Comment des gens "normaux" ont-pu participer ?

## 3. Le personnage : Un Allemand né après-guerre (1947)

Le narrateur est né en **1947** à Leidenstadt :
- Il n'a **pas vécu** les atrocités
- Il n'était **pas là**
- Pourtant, il ressent une **culpabilité** et une **responsabilité**

## 4. Débat philosophique : Culpabilité collective

### Hannah Arendt : "La banalité du mal"
- Les nazis n'étaient pas des "monstres" mais des gens ordinaires
- Le mal peut être commis par des individus "normaux" obéissant aux ordres
- **Question centrale** : Et nous, qu'aurions-nous fait ?

### Emmanuel Levinas : Responsabilité pour autrui
- Nous sommes **responsables** même de ce que nous n'avons pas fait
- La responsabilité morale **précède** notre existence individuelle
- "Nul n'est innocent" = nous héritons d'une histoire

### Karl Jaspers : Types de culpabilité
- **Culpabilité criminelle** : Ceux qui ont commis les crimes
- **Culpabilité politique** : Le peuple allemand
- **Culpabilité morale** : Chaque individu face à sa conscience
- **Culpabilité métaphysique** : Solidarité humaine universelle

## 5. Le refus des excuses

Le narrateur **refuse** les excuses habituelles :
- "C'était la guerre"
- "Les temps étaient durs"
- "Ils obéissaient aux ordres"

**Pourquoi ce refus ?**
→ Accepter ces excuses = minimiser l'horreur
→ Préférer **assumer** la culpabilité plutôt que de l'effacer

## 6. La contingence : "Et si j'étais né là-bas ?"

**Question existentielle centrale** :
> "Si j'étais né en 1917 à Leidenstadt, qu'aurais-je fait ?"

- Le hasard de la naissance
- L'humilité morale : ne pas se croire meilleur
- La conscience que **nous aurions pu être les bourreaux**

## 7. Message universel

Au-delà de la Shoah, Goldman pose une question **universelle** :
- Rwanda, Srebrenica, Cambodge, etc.
- **Chaque génocide** pose la même question
- La responsabilité morale de l'humanité entière

## 8. Style et ton

- **Langage sobre**, presque détaché
- **Pas de pathos** : Goldman refuse l'émotion facile
- **Force de la retenue** : les non-dits sont puissants
- **Respect des victimes** : ne pas s'approprier leur souffrance`,
  
  // Métadonnées
  cover_url: "",
  video_url: "",
  actif: true,
};

export default chansonData;
