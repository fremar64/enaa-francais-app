Parfait. Voici **un squelette Next.js (App Router) prêt à cloner**, **aligné exactement** sur :

* votre **curriculum figé** (Domain → Track → Cycle → Level),
* une **navigation 100 % data-driven**,
* un **monorepo extensible** (curriculum, CaSS, scoring),
* une **page d’accueil déjà branchée** sur `curriculum.ts`.

Je vous donne :

1. l’arborescence complète,
2. les fichiers clés **copiables tels quels**,
3. le flux exact de données côté accueil.

---

# 1. Arborescence du monorepo (squelette officiel CEREDIS)

```txt
ceredis-monorepo/
├─ apps/
│  └─ web/
│     ├─ app/
│     │  ├─ layout.tsx
│     │  ├─ page.tsx              # ACCUEIL (navigation progressive)
│     │  └─ activities/
│     │     └─ [track]/
│     │        └─ [cycle]/
│     │           └─ [level]/
│     │              └─ page.tsx
│     ├─ components/
│     │  ├─ DomainCards.tsx
│     │  ├─ TrackCards.tsx
│     │  ├─ CycleSelector.tsx
│     │  └─ LevelSelector.tsx
│     └─ lib/
│        └─ navigation.ts
│
├─ packages/
│  ├─ curriculum/
│  │  └─ curriculum.ts
│  ├─ types/
│  │  └─ curriculum.ts
│  ├─ scoring-engine/
│  └─ cass-client/
│
├─ package.json
├─ tsconfig.json
└─ turbo.json   (optionnel)
```

---

# 2. Configuration Next.js minimale (App Router)

## `apps/web/app/layout.tsx`

```tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
```

---

# 3. État de navigation (clé de toute l’UX)

## `apps/web/lib/navigation.ts`

```ts
import { Domain, Track, Cycle, Level } from "@ceredis/types/curriculum";

export type NavigationState = {
  domain?: Domain;
  track?: Track;
  cycle?: Cycle;
  level?: Level;
};
```

---

# 4. Accueil branché sur le curriculum figé

## `apps/web/app/page.tsx`

```tsx
"use client";

import { useState } from "react";
import { DOMAINS, TRACKS, CYCLES } from "@ceredis/curriculum";
import { NavigationState } from "../lib/navigation";

import DomainCards from "../components/DomainCards";
import TrackCards from "../components/TrackCards";
import CycleSelector from "../components/CycleSelector";
import LevelSelector from "../components/LevelSelector";

export default function HomePage() {
  const [nav, setNav] = useState<NavigationState>({});

  return (
    <main className="space-y-10 p-10">

      {/* 1. DOMAINES */}
      <DomainCards
        domains={DOMAINS}
        selected={nav.domain}
        onSelect={(domain) =>
          setNav({ domain })
        }
      />

      {/* 2. TRACKS / MODULES */}
      {nav.domain && (
        <TrackCards
          tracks={TRACKS.filter(t => t.domainId === nav.domain!.id)}
          selected={nav.track}
          onSelect={(track) =>
            setNav({ ...nav, track })
          }
        />
      )}

      {/* 3. CYCLES */}
      {nav.track && (
        <CycleSelector
          cycles={CYCLES.filter(c =>
            nav.track!.cycles.includes(c.id)
          )}
          selected={nav.cycle}
          onSelect={(cycle) =>
            setNav({ ...nav, cycle })
          }
        />
      )}

      {/* 4. NIVEAUX */}
      {nav.cycle && (
        <LevelSelector
          levels={nav.cycle.levels}
          selected={nav.level}
          onSelect={(level) =>
            setNav({ ...nav, level })
          }
        />
      )}

      {/* 5. ACCÈS AUX ACTIVITÉS */}
      {nav.level && (
        <a
          href={`/activities/${nav.track!.id}/${nav.cycle!.id}/${nav.level.id}`}
          className="inline-block rounded bg-black px-6 py-3 text-white"
        >
          Accéder aux activités
        </a>
      )}

    </main>
  );
}
```

👉 **Aucune logique pédagogique ici**
👉 Tout vient de `curriculum.ts`

---

# 5. Composants UI (exemples minimalistes)

## `DomainCards.tsx`

```tsx
import { Domain } from "@ceredis/types/curriculum";

export default function DomainCards({
  domains,
  selected,
  onSelect,
}: {
  domains: Domain[];
  selected?: Domain;
  onSelect: (d: Domain) => void;
}) {
  return (
    <section>
      <h2>Choisir un domaine</h2>
      <div className="grid grid-cols-2 gap-4">
        {domains.map(d => (
          <button
            key={d.id}
            onClick={() => onSelect(d)}
            className={`border p-4 ${
              selected?.id === d.id ? "border-black" : ""
            }`}
          >
            <h3>{d.label}</h3>
            <p>{d.description}</p>
          </button>
        ))}
      </div>
    </section>
  );
}
```

*(Les autres composants suivent exactement le même pattern.)*

---

# 6. Page générique des activités

## `apps/web/app/activities/[track]/[cycle]/[level]/page.tsx`

```tsx
import { TRACKS, CYCLES } from "@ceredis/curriculum";

export default function ActivitiesPage({
  params,
}: {
  params: { track: string; cycle: string; level: string };
}) {
  return (
    <main className="p-10">
      <h1>Activités</h1>
      <p>Module : {params.track}</p>
      <p>Cycle : {params.cycle}</p>
      <p>Niveau : {params.level}</p>

      {/* Ici viendront les activités réelles */}
    </main>
  );
}
```

---

# 7. Ce que ce squelette garantit (important)

✔ navigation progressive fidèle à vos captures
✔ aucune duplication de logique
✔ ajout d’un module = **1 entrée dans curriculum.ts**
✔ prêt pour CaSS + scoring-engine
✔ compatible primaire → lycée
✔ architecture stable pour 5–10 ans

---

# 8. Prochaine étape (naturelle et critique)

Je vous recommande maintenant :

1. **connecter une vraie activité “Chansons – Lycée”**
2. injecter le **scoring-engine** dans une activité
3. générer la **première assertion CaSS réelle**
4. afficher un **score D / CECRL côté élève**

👉 Si vous voulez, je peux vous fournir **le composant ActivityRunner** (audio + texte + scoring) directement compatible avec ce squelette.
