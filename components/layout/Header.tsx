'use client';

import { Search, Music2, User, BookOpen, BarChart3, LogOut, Settings, LogIn, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { pb } from "@/lib/pocketbase";

export function Header() {
  const { user, isAuthenticated, logout } = useAuth();

  // Obtenir l'URL de l'avatar si disponible
  const avatarUrl = user?.avatar
    ? pb.files.getURL(user, user.avatar, { thumb: '100x100' })
    : undefined;

  // Obtenir les initiales pour le fallback de l'avatar
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-80">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-accent shadow-glow">
            <Music2 className="h-5 w-5 text-primary" />
          </div>
          <div className="hidden sm:block">
            <h1 className="font-display text-xl font-semibold text-foreground">
              Français<span className="text-accent">Chanson</span>
            </h1>
            <p className="text-xs text-muted-foreground">Apprendre en musique</p>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          <Link href="/">
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
              <Music2 className="mr-2 h-4 w-4" />
              Catalogue
            </Button>
          </Link>
          {isAuthenticated && (
            <>
              <Link href="/dashboard">
                <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Dashboard
                </Button>
              </Link>
              <Link href="/enseignant">
                <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                  <GraduationCap className="mr-2 h-4 w-4" />
                  Enseignant
                </Button>
              </Link>
              <Link href="/parcours">
                <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Mes Parcours
                </Button>
              </Link>
            </>
          )}
        </nav>

        {/* Search & User */}
        <div className="flex items-center gap-3">
          <div className="relative hidden lg:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Rechercher une chanson..."
              className="w-64 pl-10 bg-secondary/50 border-0 focus-visible:ring-accent"
            />
          </div>
          <Button size="icon" variant="ghost" className="lg:hidden">
            <Search className="h-5 w-5" />
          </Button>
          
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={avatarUrl} alt={user?.name} />
                    <AvatarFallback className="bg-gradient-to-br from-music-purple to-music-blue text-white">
                      {user?.name ? getInitials(user.name) : <User className="h-4 w-4" />}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user?.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.email}
                    </p>
                    <p className="text-xs leading-none text-music-purple font-medium mt-1">
                      Niveau {user?.niveau_actuel}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profil" className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    Mon profil
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/progression" className="cursor-pointer">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Ma progression
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/parametres" className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    Paramètres
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-red-600 focus:text-red-600 cursor-pointer"
                  onClick={logout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Déconnexion
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  <LogIn className="mr-2 h-4 w-4" />
                  Connexion
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm" className="bg-gradient-to-r from-music-purple to-music-blue hover:opacity-90">
                  S'inscrire
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
