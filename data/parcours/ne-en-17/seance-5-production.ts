import type { Seance } from '../../../services/types';

const seance5: Omit<Seance, 'id' | 'created' | 'updated' | 'chanson'> = {
  titre: "Production finale : Réflexion philosophique personnelle",
  description: "Synthétiser tous les apprentissages dans une réflexion personnelle approfondie sur la condition humaine et la responsabilité morale",
  ordre: 5,
  duree_estimee: 70,
  objectifs: [
    "Synthétiser tous les apprentissages du parcours",
    "Produire une réflexion philosophique personnelle mature",
    "Mobiliser vocabulaire, grammaire et concepts philosophiques",
    "Exprimer une position nuancée et honnête"
  ],
  niveau: "C1",
  actif: true,
  competences_ciblees: [
    { code: "PE_C1", poids: 0.5 },
    { code: "CRIT_C1", poids: 0.3 },
    { code: "GRAM_B2", poids: 0.2 }
  ],
  prerequis: ["seance-1", "seance-2", "seance-3", "seance-4"],
  ecrans: [
    {
      id: "intro",
      type: "introduction",
      titre: "Mission finale : Votre réflexion personnelle",
      contenu: `
        <p>Vous avez parcouru un chemin intense avec cette chanson de Goldman :</p>
        <ul>
          <li>✅ Vous avez découvert le <strong>contexte historique</strong> de la Shoah</li>
          <li>✅ Vous avez maîtrisé le <strong>vocabulaire</strong> de la responsabilité</li>
          <li>✅ Vous avez appris le <strong>conditionnel passé</strong></li>
          <li>✅ Vous avez débattu des <strong>questions philosophiques</strong></li>
        </ul>
        
        <h3>La mission finale</h3>
        <p>Écrivez une réflexion personnelle de <strong>250-350 mots</strong> qui réponde à cette question :</p>
        
        <p class="question-centrale">
          <strong>"Que m'a appris 'Né en 17 à Leidenstadt' sur la condition humaine et ma responsabilité morale ?"</strong>
        </p>
        
        <p>Cette production compte pour <strong>145 points</strong> (dont 15 bonus possibles pour la révision).</p>
      `,
      duree_estimee: 5
    },
    {
      id: "rappel-outils",
      type: "apprentissage",
      titre: "Rappel des outils à votre disposition",
      contenu: `
        <h3>1. Vocabulaire de la séance 2</h3>
        <h4>Mémoire et oubli</h4>
        <p>Se souvenir, commémorer, témoigner, transmettre / Oublier, effacer, occulter, nier</p>
        
        <h4>Responsabilité et culpabilité</h4>
        <p>Responsabilité, culpabilité, faute, crime, innocence, héritage, fardeau / Assumer, hériter, léguer, porter, endosser, rejeter</p>
        
        <h3>2. Grammaire de la séance 3</h3>
        <p><strong>Conditionnel passé</strong> : AVOIR/ÊTRE (conditionnel) + participe passé</p>
        <p>Exemples : J'aurais pu, je serais devenu, nous aurions fait</p>
        <p><strong>Phrases avec SI</strong> : Si + plus-que-parfait, conditionnel passé</p>
        
        <h3>3. Concepts philosophiques de la séance 4</h3>
        <ul>
          <li><strong>Les 4 culpabilités de Jaspers</strong> (criminelle, politique, morale, métaphysique)</li>
          <li><strong>La banalité du mal d'Arendt</strong> (gens ordinaires commettant le mal)</li>
          <li><strong>L'humilité morale de Goldman</strong> ("Nul n'est innocent")</li>
          <li><strong>La contingence</strong> (le hasard de la naissance)</li>
        </ul>
      `,
      duree_estimee: 10
    },
    {
      id: "planification",
      type: "apprentissage",
      titre: "Planification de votre réflexion",
      contenu: `
        <h3>Questions pour vous guider</h3>
        
        <h4>Sur vous-même</h4>
        <ul>
          <li>Qu'ai-je ressenti en écoutant cette chanson ?</li>
          <li>En quoi cette chanson m'a-t-elle dérangé(e) ou touché(e) ?</li>
          <li>Ai-je changé d'avis sur quelque chose ?</li>
        </ul>
        
        <h4>Sur l'histoire</h4>
        <ul>
          <li>Que savais-je de la Shoah avant ? Qu'ai-je appris ?</li>
          <li>Comment comprends-je maintenant la complicité ordinaire ?</li>
          <li>Quel type de culpabilité (Jaspers) me semble le plus important ?</li>
        </ul>
        
        <h4>Sur la condition humaine</h4>
        <ul>
          <li>Qu'est-ce que signifie être humain après avoir étudié cette chanson ?</li>
          <li>Sommes-nous tous capables du pire ? Du meilleur ?</li>
          <li>Le contexte justifie-t-il certains actes ?</li>
        </ul>
        
        <h4>Sur ma responsabilité</h4>
        <ul>
          <li>Ai-je une responsabilité face à l'histoire de mon pays ?</li>
          <li>Comment puis-je "ne pas oublier" concrètement ?</li>
          <li>Suis-je d'accord avec Goldman : "Nul n'est innocent" ?</li>
        </ul>
        
        <h3>Structure suggérée (mais pas obligatoire)</h3>
        <ol>
          <li><strong>Introduction</strong> (2-3 phrases) : Ce que la chanson m'a fait ressentir</li>
          <li><strong>Développement 1</strong> (6-8 phrases) : Ce qu'elle m'a appris sur l'humain</li>
          <li><strong>Développement 2</strong> (6-8 phrases) : Ma position sur la responsabilité</li>
          <li><strong>Conclusion</strong> (2-3 phrases) : Ce que je retiens, ce qui a changé en moi</li>
        </ol>
        
        <p><em>Conseil : Prenez quelques minutes pour noter vos idées principales avant d'écrire.</em></p>
      `,
      duree_estimee: 15
    },
    {
      id: "production-finale",
      type: "production_ecrite",
      titre: "Votre réflexion personnelle",
      contenu: `
        <h3>Consigne principale</h3>
        <p>Écrivez une réflexion de <strong>250-350 mots</strong> sur ce que vous a appris "Né en 17 à Leidenstadt".</p>
        
        <h3>Contenu obligatoire</h3>
        <p>Votre texte <strong>doit</strong> contenir :</p>
        <ul>
          <li>Au moins <strong>3 concepts philosophiques</strong> étudiés (Jaspers, Arendt, contingence, etc.)</li>
          <li>Au moins <strong>2 phrases au conditionnel passé</strong> avec SI</li>
          <li>Au moins <strong>5 mots</strong> du vocabulaire de la séance 2</li>
        </ul>
        
        <h3>Critères d'évaluation (sur 70 points)</h3>
        <ol>
          <li><strong>Profondeur de la réflexion</strong> (20 pts) : Analyse sincère et approfondie</li>
          <li><strong>Concepts philosophiques</strong> (15 pts) : Intégration pertinente de 3+ concepts</li>
          <li><strong>Vocabulaire</strong> (10 pts) : Utilisation de 5+ mots du vocabulaire</li>
          <li><strong>Grammaire</strong> (10 pts) : 2+ phrases au conditionnel passé correctes</li>
          <li><strong>Structure</strong> (10 pts) : Organisation claire et logique</li>
          <li><strong>Honnêteté intellectuelle</strong> (5 pts) : Sincérité, reconnaissance de la complexité</li>
        </ol>
        
        <p><strong>Longueur</strong> : 250-350 mots (environ 15-20 phrases)</p>
        
        <p class="conseil"><strong>Important</strong> : Il n'y a pas de "bonne" réponse. L'important est d'être honnête, nuancé, et de montrer que vous avez vraiment réfléchi à ces questions.</p>
      `,
      activites: [
        {
          id: "reflexion-finale",
          type: "texte_libre",
          enonce: "Votre réflexion personnelle (250-350 mots) :",
          longueur_min: 250,
          longueur_max: 350,
          points: 70,
          criteres_evaluation: [
            "Profondeur de la réflexion (20 pts)",
            "Concepts philosophiques (15 pts)",
            "Vocabulaire approprié (10 pts)",
            "Conditionnel passé correct (10 pts)",
            "Structure claire (10 pts)",
            "Honnêteté intellectuelle (5 pts)"
          ]
        }
      ],
      duree_estimee: 35
    },
    {
      id: "revision",
      type: "apprentissage",
      titre: "Révision et amélioration",
      contenu: `
        <h3>Relisez votre texte avec cette grille</h3>
        
        <h4>Contenu</h4>
        <ul>
          <li>☐ J'ai intégré au moins 3 concepts philosophiques</li>
          <li>☐ J'ai utilisé au moins 5 mots du vocabulaire de la séance 2</li>
          <li>☐ Ma réflexion est personnelle et sincère</li>
          <li>☐ J'ai reconnu la complexité des questions</li>
        </ul>
        
        <h4>Langue</h4>
        <ul>
          <li>☐ J'ai écrit au moins 2 phrases au conditionnel passé</li>
          <li>☐ Mes accords sont corrects (participes passés)</li>
          <li>☐ Mon vocabulaire est précis</li>
          <li>☐ Mes phrases sont bien construites</li>
        </ul>
        
        <h4>Structure</h4>
        <ul>
          <li>☐ Mon introduction capte l'attention</li>
          <li>☐ Mes idées s'enchaînent logiquement</li>
          <li>☐ Ma conclusion apporte une ouverture</li>
          <li>☐ Mon texte fait 250-350 mots</li>
        </ul>
        
        <h4>Honnêteté</h4>
        <ul>
          <li>☐ J'exprime vraiment ce que je pense</li>
          <li>☐ Je ne simplifie pas les questions</li>
          <li>☐ J'évite les jugements faciles</li>
          <li>☐ Je montre de l'humilité</li>
        </ul>
        
        <h3>Version améliorée (optionnelle, 15 points bonus)</h3>
        <p>Si vous le souhaitez, vous pouvez soumettre une version améliorée de votre texte après l'avoir relu.</p>
      `,
      activites: [
        {
          id: "version-amelioree",
          type: "texte_libre",
          enonce: "Version améliorée (optionnelle, 15 points bonus) :",
          longueur_min: 250,
          longueur_max: 350,
          points: 15,
          criteres_evaluation: [
            "Amélioration significative",
            "Corrections pertinentes"
          ]
        }
      ],
      duree_estimee: 20
    },
    {
      id: "bilan-final",
      type: "synthese",
      titre: "Bilan du parcours complet",
      contenu: `
        <h3>🎉 Félicitations ! Vous avez terminé le parcours "Né en 17 à Leidenstadt" !</h3>
        
        <h4>Ce que vous avez accompli</h4>
        
        <h5>📊 Statistiques</h5>
        <ul>
          <li>✅ <strong>5 séances complètes</strong> (5h10 de travail)</li>
          <li>✅ <strong>36 écrans</strong> pédagogiques</li>
          <li>✅ <strong>545 points</strong> d'activités</li>
        </ul>
        
        <h5>🎯 Compétences développées</h5>
        
        <h6>Linguistiques</h6>
        <ul>
          <li>✅ Vocabulaire abstrait et moral (mémoire, responsabilité, culpabilité)</li>
          <li>✅ Conditionnel passé maîtrisé</li>
          <li>✅ Production écrite argumentative de niveau C1</li>
        </ul>
        
        <h6>Culturelles</h6>
        <ul>
          <li>✅ Connaissance approfondie de la Shoah</li>
          <li>✅ Compréhension des débats mémoriels</li>
          <li>✅ Sensibilité aux questions d'histoire collective</li>
        </ul>
        
        <h6>Philosophiques</h6>
        <ul>
          <li>✅ Jaspers : 4 types de culpabilité</li>
          <li>✅ Arendt : banalité du mal</li>
          <li>✅ Concept de contingence</li>
          <li>✅ Humilité morale</li>
        </ul>
        
        <h6>Personnelles</h6>
        <ul>
          <li>✅ Pensée critique développée</li>
          <li>✅ Capacité à nuancer son jugement</li>
          <li>✅ Honnêteté intellectuelle</li>
          <li>✅ Empathie historique</li>
        </ul>
        
        <h3>Le message de Goldman</h3>
        <p class="message-final">
          Goldman ne donne pas de réponse définitive. Il pose des questions essentielles sur notre humanité commune, notre fragilité face aux circonstances, et notre responsabilité collective face à l'histoire.
        </p>
        
        <p>Son message est double :</p>
        <ol>
          <li><strong>Humilité</strong> : Nous ne savons pas ce que nous aurions fait</li>
          <li><strong>Vigilance</strong> : C'est précisément pourquoi nous devons rester vigilants</li>
        </ol>
        
        <h3>Et maintenant ?</h3>
        <p>Ce parcours vous a donné des outils pour :</p>
        <ul>
          <li>Participer aux débats sur la mémoire collective</li>
          <li>Comprendre les enjeux moraux de l'histoire</li>
          <li>Développer votre propre réflexion éthique</li>
          <li>Parler français avec précision sur des sujets complexes</li>
        </ul>
        
        <p class="encouragement">
          <strong>Merci d'avoir cheminé avec cette chanson difficile mais essentielle.</strong>
        </p>
        
        <p>N'oubliez pas : "Nul n'est innocent, nul."</p>
        
        <h3>📝 Feedback optionnel</h3>
        <p>Si vous le souhaitez, vous pouvez partager vos impressions sur ce parcours avec votre enseignant ou dans les commentaires.</p>
      `,
      duree_estimee: 5
    }
  ],
  points_total: 145
};

export default seance5;
