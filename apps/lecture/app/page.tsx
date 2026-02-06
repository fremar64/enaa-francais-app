"use client";

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { WelcomeScreen } from '../components/WelcomeScreen';
import { Button } from '../components/ui/button';

const HomePage = () => {
  const router = useRouter();

  const handleSelectLevel = (level: 'GS' | 'CP' | 'CE1') => {
    if (level === 'GS') {
      router.push('/levels/gs');
      return;
    }

    if (level === 'CP') {
      router.push('/levels/cp');
      return;
    }

    if (level === 'CE1') {
      router.push('/levels/ce1');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/30 to-background">
      <WelcomeScreen onSelectLevel={handleSelectLevel} />

      <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 px-6 pb-10">
        <p className="text-sm text-muted-foreground">
          Acces direct aux parcours par niveau
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button asChild variant="secondary">
            <Link href="/levels/gs">Commencer GS</Link>
          </Button>
          <Button asChild>
            <Link href="/levels/cp">Commencer CP</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/levels/ce1">Commencer CE1</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
