import { cn } from '@/lib/utils';

interface MascotProps {
  mood?: 'happy' | 'thinking' | 'celebrating' | 'encouraging';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Mascot = ({ mood = 'happy', size = 'md', className }: MascotProps) => {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
  };

  const getMoodEmoji = () => {
    switch (mood) {
      case 'happy':
        return '😊';
      case 'thinking':
        return '🤔';
      case 'celebrating':
        return '🎉';
      case 'encouraging':
        return '💪';
      default:
        return '😊';
    }
  };

  return (
    <div
      className={cn(
        'relative flex items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/80 animate-float',
        sizeClasses[size],
        className
      )}
    >
      {/* Face du hibou stylisé */}
      <div className="relative flex flex-col items-center">
        {/* Yeux */}
        <div className="flex gap-2 mb-1">
          <div className="w-3 h-3 md:w-4 md:h-4 bg-white rounded-full flex items-center justify-center">
            <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-foreground rounded-full animate-bounce-soft" />
          </div>
          <div className="w-3 h-3 md:w-4 md:h-4 bg-white rounded-full flex items-center justify-center">
            <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-foreground rounded-full animate-bounce-soft" style={{ animationDelay: '0.1s' }} />
          </div>
        </div>
        {/* Bec */}
        <div className="w-2 h-2 md:w-3 md:h-3 bg-warning rotate-45 rounded-sm" />
      </div>
      
      {/* Oreilles */}
      <div className="absolute -top-2 left-2 w-3 h-4 md:w-4 md:h-5 bg-gradient-to-t from-primary to-primary/60 rounded-t-full transform -rotate-12" />
      <div className="absolute -top-2 right-2 w-3 h-4 md:w-4 md:h-5 bg-gradient-to-t from-primary to-primary/60 rounded-t-full transform rotate-12" />
      
      {/* Indicateur d'humeur */}
      <span className="absolute -bottom-1 -right-1 text-lg md:text-xl">{getMoodEmoji()}</span>
    </div>
  );
};
