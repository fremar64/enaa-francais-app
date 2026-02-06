Parfait. Je vais **figer le schéma du curriculum** et vous fournir **un fichier `curriculum.ts` complet, réaliste et directement utilisable** dans votre monorepo Next.js / TypeScript.

Je respecte strictement ce que vous avez posé :

* 2 **domaines**,
* modules vs disciplines,
* cycles → niveaux,
* articulation **CECRL repensé + score numérique continu**,
* compatibilité **CaSS** (URI, traçabilité).

---

# 1. Principes de figement (à valeur contractuelle)

Ce schéma devient :

* ✅ **la source de vérité pédagogique**
* ✅ **stable dans le temps**
* ✅ **consommée par l’UI, les activités et CaSS**
* ❌ jamais recalculée côté interface

👉 Toute évolution future = **ajout de données**, jamais refonte structurelle.

---

# 2. Types TypeScript canoniques (`types.ts`)

```ts
// packages/types/curriculum.ts

export type DomainId = "communication" | "langue";

export type CycleId = "primaire" | "college" | "lycee";

export type LevelId =
  | "CP" | "CE1" | "CE2" | "CM1" | "CM2"
  | "6e" | "5e" | "4e" | "3e"
  | "2nde" | "1ere" | "terminale";

export interface Level {
  id: LevelId;
  label: string;
  cassLevelUri: string;
  scoreRange: [number, number];
  cecrlProjection: string;
}

export interface Cycle {
  id: CycleId;
  label: string;
  levels: Level[];
}

export interface Track {
  id: string;
  label: string;
  description: string;
  domainId: DomainId;
  cycles: CycleId[];
}

export interface Domain {
  id: DomainId;
  label: string;
  description: string;
}
```

---

# 3. Curriculum figé – `curriculum.ts`

📍 `packages/curriculum/curriculum.ts`

```ts
import { Domain, Track, Cycle, Level } from "@ceredis/types/curriculum";

/* ============================================================
   DOMAINES D’APPRENTISSAGE
   ============================================================ */

export const DOMAINS: Domain[] = [
  {
    id: "communication",
    label: "Communication orale et écrite",
    description: "Parler, écouter, lire et écrire dans des situations authentiques."
  },
  {
    id: "langue",
    label: "Connaissance de la langue",
    description: "Maîtrise grammaticale, lexicale et orthographique du français."
  }
];

/* ============================================================
   CYCLES ET NIVEAUX (CECRL + SCORE CONTINU)
   ============================================================ */

export const CYCLES: Cycle[] = [
  {
    id: "primaire",
    label: "Cycle primaire",
    levels: [
      level("CP", "Cours préparatoire", 0, 20, "Pré-A1"),
      level("CE1", "Cours élémentaire 1", 15, 30, "A1.0"),
      level("CE2", "Cours élémentaire 2", 25, 40, "A1.1"),
      level("CM1", "Cours moyen 1", 35, 50, "A1.2"),
      level("CM2", "Cours moyen 2", 45, 60, "A2.1"),
    ]
  },
  {
    id: "college",
    label: "Collège",
    levels: [
      level("6e", "Sixième", 50, 65, "A2.1"),
      level("5e", "Cinquième", 60, 75, "A2.2"),
      level("4e", "Quatrième", 70, 85, "B1.0"),
      level("3e", "Troisième", 80, 95, "B1.1"),
    ]
  },
  {
    id: "lycee",
    label: "Lycée",
    levels: [
      level("2nde", "Seconde", 85, 95, "B1.1"),
      level("1ere", "Première", 90, 98, "B1.2"),
      level("terminale", "Terminale", 95, 100, "B2.0"),
    ]
  }
];

/* ============================================================
   MODULES / DISCIPLINES (TRACKS)
   ============================================================ */

export const TRACKS: Track[] = [
  // ===== DOMAINE COMMUNICATION =====

  {
    id: "chansons",
    label: "Chansons",
    description: "Apprendre le français par l’écoute, l’analyse et l’interprétation de chansons.",
    domainId: "communication",
    cycles: ["primaire", "college", "lycee"]
  },
  {
    id: "contes-nouvelles",
    label: "Contes et nouvelles",
    description: "Récits courts, narration et compréhension narrative.",
    domainId: "communication",
    cycles: ["primaire", "college"]
  },
  {
    id: "textes-argumentatifs",
    label: "Textes argumentatifs",
    description: "Débattre, convaincre, justifier.",
    domainId: "communication",
    cycles: ["college", "lycee"]
  },
  {
    id: "textes-fonctionnels",
    label: "Textes fonctionnels",
    description: "Comprendre et produire des écrits usuels.",
    domainId: "communication",
    cycles: ["primaire", "college", "lycee"]
  },
  {
    id: "correspondance",
    label: "Correspondance",
    description: "Écrire des lettres et courriels dans un cadre interscolaire.",
    domainId: "communication",
    cycles: ["college", "lycee"]
  },

  // ===== DOMAINE CONNAISSANCE DE LA LANGUE =====

  {
    id: "grammaire",
    label: "Grammaire",
    description: "Structuration de la langue et raisonnement grammatical.",
    domainId: "langue",
    cycles: ["primaire", "college", "lycee"]
  },
  {
    id: "conjugaison",
    label: "Conjugaison",
    description: "Maîtrise des temps, modes et valeurs verbales.",
    domainId: "langue",
    cycles: ["primaire", "college", "lycee"]
  },
  {
    id: "orthographe",
    label: "Orthographe",
    description: "Précision et rigueur dans l’écriture.",
    domainId: "langue",
    cycles: ["primaire", "college", "lycee"]
  },
  {
    id: "vocabulaire",
    label: "Vocabulaire",
    description: "Enrichissement lexical et nuances de sens.",
    domainId: "langue",
    cycles: ["primaire", "college", "lycee"]
  },
  {
    id: "initiation-lecture-ecriture",
    label: "Initiation lecture-écriture",
    description: "CP–CE1 : bases du décodage et de l’encodage.",
    domainId: "langue",
    cycles: ["primaire"]
  }
];

/* ============================================================
   UTILITAIRE LOCAL
   ============================================================ */

function level(
  id: Level["id"],
  label: string,
  min: number,
  max: number,
  cecrl: string
): Level {
  return {
    id,
    label,
    scoreRange: [min, max],
    cecrlProjection: cecrl,
    cassLevelUri: `https://cass.ceredis.net/levels/${id}`
  };
}
```

---

# 4. Comment l’UI consomme ce curriculum (exemple réel)

```ts
// apps/web/app/page.tsx

import { DOMAINS, TRACKS, CYCLES } from "@ceredis/curriculum";

const communicationTracks = TRACKS.filter(
  t => t.domainId === "communication"
);
```

👉 **Aucune logique pédagogique dans l’UI.**

---

# 5. Ce que vous venez de verrouiller définitivement

✔ structure Domain → Track → Cycle → Level
✔ continuité primaire → lycée
✔ articulation CECRL ↔ score continu
✔ compatibilité CaSS native
✔ navigation dynamique simple
✔ industrialisation à grande échelle

---

## Prochaine étape recommandée

Je vous conseille maintenant, dans cet ordre :

1. **brancher l’accueil sur ce curriculum figé**
2. créer une **page générique ActivitiesPage**
3. relier un **premier module (Chansons – Lycée)** à CaSS
4. afficher les **scores D, Dd, Ds, De, Dm** côté apprenant

Si vous voulez, je peux vous fournir **le composant React de navigation progressive** prêt à intégrer.
