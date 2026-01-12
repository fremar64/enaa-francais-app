# Intégration CaSS & xAPI

## 📋 Vue d'ensemble

Ce dossier contient les services d'intégration avec :
- **CaSS** (Competency and Skills System) : Gestion du référentiel CEREDIS et des assertions de compétences
- **LRS Ralph** (Learning Record Store) : Traçabilité xAPI des activités d'apprentissage

## 🏗️ Architecture

```
┌─────────────────┐
│   Frontend      │  React + TypeScript
│  (Plateforme)   │
└────────┬────────┘
         │
         ├──────────► PocketBase (données)
         │
         ├──────────► CaSS (compétences)
         │
         └──────────► LRS Ralph (traces xAPI)
```

## 🚀 Utilisation rapide

### Configuration

1. Copier `.env.example` vers `.env`
2. Remplir les credentials CaSS et LRS
3. Les services sont automatiquement activés si les credentials sont présents

### Tracking d'une activité

```typescript
import { integrationService } from '@/services/integration';

// 1. Au démarrage de l'activité
await integrationService.trackActivityStart({
  userId: 'user123',
  userName: 'Jean Dupont',
  activityId: 'qcm-conditionnel-1',
  activityName: 'QCM sur le conditionnel',
  activityType: 'qcm',
  chansonId: 'ne-en-17',
  seanceId: 'seance-3',
  niveau: 'B2'
});

// 2. À la fin de l'activité
const result = await integrationService.trackActivityCompletion({
  userId: 'user123',
  userName: 'Jean Dupont',
  activityId: 'qcm-conditionnel-1',
  activityName: 'QCM sur le conditionnel',
  activityType: 'qcm',
  chansonId: 'ne-en-17',
  seanceId: 'seance-3',
  niveau: 'B2',
  score: 18,
  maxScore: 20,
  duration: 120, // secondes
  response: 'réponses de l\'apprenant'
});

// 3. Vérifier le résultat
if (result.success) {
  console.log('Tracking réussi !');
  console.log(`${result.cassAssertions.length} compétences validées`);
  console.log(`${result.xapiStatements.length} statements xAPI envoyés`);
}
```

## 📊 Services disponibles

### IntegrationService (recommandé)

Service d'orchestration qui gère automatiquement CaSS + xAPI.

```typescript
import { integrationService } from '@/services/integration';

// Tester les connexions
const status = await integrationService.testConnections();
// { cass: true, xapi: true }

// Dashboard complet d'un apprenant
const dashboard = await integrationService.getUserDashboard('user123');
/*
{
  xapi: {
    totalAttempts: 45,
    totalCompleted: 38,
    averageScore: 0.85,
    totalDuration: 3600
  },
  cass: {
    totalCompetencies: 7,
    mastered: 3,
    inProgress: 4,
    byDomain: { '5': 7 }
  }
}
*/
```

### CassService

Service direct pour interagir avec CaSS.

```typescript
import { cassService, COMPETENCES_METALINGUISTIQUES } from '@/services/integration';

// Récupérer les compétences mappées pour une activité
const competencies = cassService.getCompetenciesForActivity('qcm', 'B2');
// ['5.1', '5.2']

// Créer une assertion manuelle
const assertion = await cassService.createAssertion({
  competencyId: '5.3',
  userId: 'user123',
  evidence: 'https://enaa-chansons.ceredis.net/response/abc',
  level: 'B2',
  confidence: 0.9,
  score: 18,
  maxScore: 20
});

// Vérifier la maîtrise d'une compétence
const mastery = await cassService.getCompetencyMastery('user123', '5.3');
/*
{
  mastered: true,
  averageConfidence: 0.87,
  assertionCount: 5
}
*/
```

### XApiService

Service direct pour interagir avec le LRS.

```typescript
import { xapiService, XAPI_VERBS } from '@/services/integration';

// Créer un statement personnalisé
const statement = xapiService.createCompletedStatement(
  'user123',
  'Jean Dupont',
  'activity-1',
  'Mon activité',
  15,
  20,
  180
);

await xapiService.sendStatement(statement);

// Récupérer les statistiques
const stats = await xapiService.getUserStatistics('user123');
/*
{
  totalAttempts: 45,
  totalCompleted: 38,
  totalMastered: 3,
  averageScore: 0.85,
  totalDuration: 3600
}
*/
```

## 🎯 Mapping Activités → Compétences

Basé sur la **MATRICE OPÉRATIONNELLE CEREDIS** :

| Type d'activité      | Compétences CEREDIS (Domaine 5) |
|---------------------|----------------------------------|
| `qcm`               | 5.1, 5.2                         |
| `texte_trous`       | 5.1, 5.3                         |
| `texte_libre`       | 5.5, 5.6, 5.7                    |
| `production_ecrite` | 5.5, 5.7                         |
| `journal_reflexif`  | 5.6                              |

### Compétences du Domaine 5 (Métalinguistique)

| Code | Nom | Niveau |
|------|-----|--------|
| 5.1 | Identifier des formes grammaticales | A2 |
| 5.2 | Relier forme et sens | B1 |
| 5.3 | Analyser valeur sémantique | B2 |
| 5.4 | Analyser phrase complexe | B2 |
| 5.5 | Mobiliser l'analyse linguistique | C1 |
| 5.6 | Verbaliser stratégies | B2 |
| 5.7 | Réguler production écrite | C1 |

## 🔍 Debug

Activer le mode debug dans `.env` :

```bash
VITE_INTEGRATION_DEBUG=true
```

Les logs détaillés apparaîtront dans la console :

```
[CaSS] ✅ Assertion créée pour compétence 5.3
[xAPI] ✅ Statement envoyé: Jean Dupont a complété QCM sur le conditionnel
[Integration] ✅ Résultat: { xapiStatements: 2, cassAssertions: 2, errors: 0 }
```

## ⚠️ Gestion des erreurs

Les services sont résilients :
- Si CaSS est indisponible, seul xAPI continue de fonctionner
- Si xAPI échoue, CaSS continue quand même
- Les erreurs sont loggées mais ne bloquent pas l'application

```typescript
const result = await integrationService.trackActivityCompletion(data);

if (!result.success) {
  console.error('Erreurs rencontrées:', result.errors);
  // L'activité est quand même enregistrée dans PocketBase
}
```

## 📈 Règles de validation

### CaSS

Une assertion est créée SI :
- Score ≥ 60% (configurable)
- Activité mappée à au moins 1 compétence
- Niveau CECRL compatible

Le niveau de **confidence** est automatiquement calculé :
- 100% score = 1.0 confidence
- 90% score = 0.9 confidence
- 60% score = 0.6 confidence

### Compétence "maîtrisée"

Une compétence est considérée **maîtrisée** si :
- Au moins 3 assertions
- Confidence moyenne ≥ 0.75

## 🔗 Références

- [Documentation CaSS](https://cassproject.github.io/cass-editor/)
- [Spécification xAPI](https://github.com/adlnet/xAPI-Spec)
- [LRS Ralph](https://openfun.gitbooks.io/ralph/)
- [Référentiel CEREDIS](../../../docs/REFERENTIEL_CEREDIS.md)
