'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Home, BookOpen, LayoutDashboard, User, LogOut } from 'lucide-react';

interface NavLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

function NavLink({ href, icon, label }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
        isActive
          ? 'bg-purple-100 text-purple-700 font-medium'
          : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      <span className="h-5 w-5">{icon}</span>
      <span className="hidden md:inline">{label}</span>
    </Link>
  );
}

export function Navbar() {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  return (
    <nav className="bg-white border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo + Titre */}
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg" />
            <span className="font-bold text-xl">ENAA Chansons</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-2">
            <NavLink href="/" icon={<Home className="h-5 w-5" />} label="Accueil" />
            <NavLink href="/parcours" icon={<BookOpen className="h-5 w-5" />} label="Parcours" />
            <NavLink href="/dashboard" icon={<LayoutDashboard className="h-5 w-5" />} label="Dashboard" />
            <NavLink href="/profile" icon={<User className="h-5 w-5" />} label="Profil" />

            {/* Bouton Déconnexion */}
            <Button variant="outline" onClick={handleLogout} className="ml-2">
              <LogOut className="h-4 w-4 mr-2" />
              <span className="hidden md:inline">Déconnexion</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
