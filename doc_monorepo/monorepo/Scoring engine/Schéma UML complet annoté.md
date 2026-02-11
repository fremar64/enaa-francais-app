Je vais générer un **schéma UML complet annoté** couvrant :

* architecture des packages,
* relations de dépendance,
* flux de données,
* séparation score / décision,
* dynamique temporelle,
* intégration LRS + CaSS.

Je fournis :

1. 📐 Diagramme de composants (architecture globale)
2. 🧠 Diagramme de classes (cœur scoring)
3. 🔁 Diagramme de séquence (pipeline complet)
4. ⏱ Diagramme dynamique (stabilité temporelle)

Tous en **PlantUML**, directement exploitables.

---

# 1️⃣ Diagramme de composants (Architecture globale)

```plantuml
@startuml
skinparam componentStyle rectangle

package "Apps" {
  [Lecture App]
  [Web App]
  [Admin App]
}

package "Core Packages" {
  [Activity Engine]
  [Scoring Engine]
  [Decision Engine]
  [Curriculum]
  [Shared Types]
}

package "Interop" {
  [xAPI Encoder]
  [LRS]
  [CaSS Client]
}

[Lecture App] --> [Activity Engine]
[Activity Engine] --> [Scoring Engine]
[Scoring Engine] --> [Decision Engine]
[Decision Engine] --> [xAPI Encoder]
[xAPI Encoder] --> [LRS]
[Decision Engine] --> [CaSS Client]

[Scoring Engine] --> [Curriculum]
[Scoring Engine] --> [Shared Types]
[Decision Engine] --> [Shared Types]

@enduml
```

---

# 2️⃣ Diagramme de classes — Cœur scoring CEREDIS

```plantuml
@startuml

class ActivityEvaluationSurface {
  +attempts: number
  +errors: number
  +success: boolean
  +durationMs: number
  +events: PedagogicalEvent[]
}

class CEREDISScore {
  +D: 0|1
  +Dd: string[]
  +Ds: Map<string, StabilityLevel>
  +De: Map<string, EfficiencyLevel>
  +Dm: Map<string, MetacognitiveLevel>
}

class ScoringEngine {
  +computeScore(surface, context): CEREDISScore
}

class StabilityModule {
  +computeStability(...)
  +computeDecay(...)
}

class EfficiencyModule
class RegulationModule
class AmplitudeModule

ScoringEngine --> ActivityEvaluationSurface
ScoringEngine --> CEREDISScore
ScoringEngine --> StabilityModule
ScoringEngine --> EfficiencyModule
ScoringEngine --> RegulationModule
ScoringEngine --> AmplitudeModule

@enduml
```

---

# 3️⃣ Diagramme de séquence — Pipeline complet

```plantuml
@startuml

actor Learner
participant "Activity Engine" as AE
participant "Scoring Engine" as SE
participant "Decision Engine" as DE
participant "xAPI Encoder" as XE
participant "LRS" as LRS
participant "CaSS Client" as CC

Learner -> AE : Complete Activity
AE -> SE : EvaluationSurface
SE -> SE : Compute D, Dd, Ds, De, Dm
SE -> DE : CEREDISScore
DE -> DE : Apply Rules + Spaced Repetition
DE -> XE : Build xAPI Statement
XE -> LRS : Store Statement
DE -> CC : (if certified) Create Assertion

@enduml
```

---

# 4️⃣ Diagramme dynamique — Stabilité temporelle

```plantuml
@startuml

class StabilityState {
  +weightedValue: number
  +lambda: number
  +threshold: number
}

class StabilityDynamics {
  +computeDecay()
  +computeDerivative()
  +computeOptimalReviewTime()
}

StabilityState --> StabilityDynamics

note right of StabilityDynamics
C(t) = Σ e^(-λ(t - ti))
dC/dt = -λC
t* = (1/λ) ln(C/θ)
end note

@enduml
```

---

# 5️⃣ Diagramme de planification globale

```plantuml
@startuml

class LevelPlanningData {
  +levelId: string
  +optimalTime: number
  +weightedValue: number
  +lambda: number
}

class Planner {
  +planDailyReviews()
}

Planner --> LevelPlanningData

note right of Planner
Select top K levels by urgency
U = λ * C(t)
Constraint: maxPerDay
end note

@enduml
```

---

# 6️⃣ Vue conceptuelle — Espace produit ordonné

```plantuml
@startuml

class CEREDISScore {
  D
  Dd
  Ds
  De
  Dm
}

note right of CEREDISScore
Produit ordonné :
S = D × Dd × Ds × De × Dm

Non compensatoire
Dominance partielle (Pareto)
end note

@enduml
```

---

# 7️⃣ Lecture synthétique de l’architecture

Le système est structuré en 4 couches :

1. **Exécution**
2. **Évaluation factorisée**
3. **Décision projetée**
4. **Interopérabilité normative**

Chaque couche :

* dépend uniquement de la précédente,
* n’introduit aucune circularité,
* respecte la séparation descriptive / normative.

---

