import { Mascot } from './Mascot';
import { LevelSelector } from './LevelSelector';

interface WelcomeScreenProps {
  onSelectLevel: (level: 'GS' | 'CP' | 'CE1') => void;
  disabledLevels?: Array<'GS' | 'CP' | 'CE1'>;
}

export const WelcomeScreen = ({ onSelectLevel, disabledLevels }: WelcomeScreenProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-background via-muted/30 to-background">
      {/* Hero section */}
      <div className="text-center mb-10 animate-fade-in">
        <div className="flex justify-center mb-6">
          <Mascot mood="happy" size="lg" />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-fredoka font-bold text-foreground mb-3">
          LectureMagique
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-md mx-auto">
          Apprends à lire et à écrire en t'amusant ! 📚✨
        </p>
      </div>

      {/* Sélection du niveau */}
      <div className="w-full animate-slide-up" style={{ animationDelay: '0.2s' }}>
        <h2 className="text-center text-xl font-fredoka font-semibold text-foreground mb-6">
          Quel est ton niveau ?
        </h2>
        <LevelSelector onSelectLevel={onSelectLevel} disabledLevels={disabledLevels} />
      </div>

      {/* Décorations */}
      <div className="fixed top-10 left-10 text-4xl animate-bounce-soft opacity-50">📖</div>
      <div className="fixed top-20 right-16 text-3xl animate-bounce-soft opacity-50" style={{ animationDelay: '0.5s' }}>✏️</div>
      <div className="fixed bottom-20 left-16 text-3xl animate-bounce-soft opacity-50" style={{ animationDelay: '1s' }}>🌟</div>
      <div className="fixed bottom-32 right-10 text-4xl animate-bounce-soft opacity-50" style={{ animationDelay: '0.7s' }}>🎨</div>
    </div>
  );
};
