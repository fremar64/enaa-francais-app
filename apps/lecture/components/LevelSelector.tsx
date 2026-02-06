import { cn } from '@/lib/utils';

interface LevelSelectorProps {
  onSelectLevel: (level: 'GS' | 'CP' | 'CE1') => void;
  disabledLevels?: Array<'GS' | 'CP' | 'CE1'>;
}

const levels = [
  {
    id: 'GS' as const,
    name: 'Grande Section',
    age: '5-6 ans',
    description: 'Les voyelles et premières consonnes',
    icon: '🌱',
    gradient: 'gs',
  },
  {
    id: 'CP' as const,
    name: 'CP',
    age: '6-7 ans',
    description: 'Toutes les lettres et syllabes',
    icon: '📚',
    gradient: 'cp',
  },
  {
    id: 'CE1' as const,
    name: 'CE1',
    age: '7-8 ans',
    description: 'Sons complexes et lecture fluide',
    icon: '🚀',
    gradient: 'ce1',
  },
];

export const LevelSelector = ({ onSelectLevel, disabledLevels = [] }: LevelSelectorProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-6 w-full max-w-4xl mx-auto">
      {levels.map((level, index) => {
        const isDisabled = disabledLevels.includes(level.id);

        return (
          <button
            key={level.id}
            onClick={() => !isDisabled && onSelectLevel(level.id)}
            disabled={isDisabled}
            className={cn(
              'level-button flex-1 flex flex-col items-center gap-3 text-center',
              level.gradient,
              isDisabled && 'opacity-50 cursor-not-allowed'
            )}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <span className="text-4xl">{level.icon}</span>
            <div>
              <h3 className="text-2xl font-bold">{level.name}</h3>
              <p className="text-sm opacity-90">{level.age}</p>
            </div>
            <p className="text-xs opacity-80 mt-1">{level.description}</p>
          </button>
        );
      })}
    </div>
  );
};
