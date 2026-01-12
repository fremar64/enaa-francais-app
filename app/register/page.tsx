'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Music, Mail, Lock, User, Globe, Loader2, AlertCircle, CheckCircle } from 'lucide-react';

const NIVEAUX = [
  { value: 'A1', label: 'A1 - Débutant' },
  { value: 'A2', label: 'A2 - Élémentaire' },
  { value: 'B1', label: 'B1 - Intermédiaire' },
  { value: 'B2', label: 'B2 - Intermédiaire avancé' },
  { value: 'C1', label: 'C1 - Avancé' },
  { value: 'C2', label: 'C2 - Maîtrise' },
];

const LANGUES = [
  { value: 'en', label: '🇬🇧 Anglais' },
  { value: 'es', label: '🇪🇸 Espagnol' },
  { value: 'de', label: '🇩🇪 Allemand' },
  { value: 'it', label: '🇮🇹 Italien' },
  { value: 'pt', label: '🇵🇹 Portugais' },
  { value: 'zh', label: '🇨🇳 Chinois' },
  { value: 'ja', label: '🇯🇵 Japonais' },
  { value: 'ko', label: '🇰🇷 Coréen' },
  { value: 'ar', label: '🇸🇦 Arabe' },
  { value: 'ru', label: '🇷🇺 Russe' },
  { value: 'other', label: '🌍 Autre' },
];

export default function RegisterPage() {
  const router = useRouter();
  const { register, isLoading } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
    username: '',
    name: '',
    niveau: 'A2' as 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2',
    langueMaternelle: 'en',
  });
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState(1);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError(null);
  };

  const validateStep1 = () => {
    if (!formData.email || !formData.password || !formData.passwordConfirm) {
      setError('Veuillez remplir tous les champs');
      return false;
    }
    if (!formData.email.includes('@')) {
      setError('Veuillez entrer un email valide');
      return false;
    }
    if (formData.password.length < 8) {
      setError('Le mot de passe doit contenir au moins 8 caractères');
      return false;
    }
    if (formData.password !== formData.passwordConfirm) {
      setError('Les mots de passe ne correspondent pas');
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!formData.username || !formData.name) {
      setError('Veuillez remplir tous les champs');
      return false;
    }
    if (formData.username.length < 3) {
      setError('Le nom d\'utilisateur doit contenir au moins 3 caractères');
      return false;
    }
    return true;
  };

  const handleNextStep = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      setStep(3);
    }
  };

  const handlePrevStep = () => {
    setError(null);
    setStep((prev) => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await register(formData);
      router.push('/');
    } catch (err: unknown) {
      console.error('Erreur d\'inscription:', err);
      if (err && typeof err === 'object' && 'data' in err) {
        const pbError = err as { data?: { data?: Record<string, { message?: string }> } };
        const errorData = pbError.data?.data;
        if (errorData?.email?.message) {
          setError('Cet email est déjà utilisé');
        } else if (errorData?.username?.message) {
          setError('Ce nom d\'utilisateur est déjà pris');
        } else {
          setError('Erreur lors de l\'inscription. Veuillez réessayer.');
        }
      } else {
        setError('Erreur lors de l\'inscription. Veuillez réessayer.');
      }
    }
  };

  const getPasswordStrength = () => {
    const password = formData.password;
    if (!password) return { score: 0, label: '', color: '' };
    
    let score = 0;
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^a-zA-Z0-9]/.test(password)) score++;

    if (score <= 1) return { score, label: 'Faible', color: 'bg-red-500' };
    if (score <= 2) return { score, label: 'Moyen', color: 'bg-orange-500' };
    if (score <= 3) return { score, label: 'Bon', color: 'bg-yellow-500' };
    return { score, label: 'Excellent', color: 'bg-green-500' };
  };

  const passwordStrength = getPasswordStrength();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-accent/5 via-background to-primary/5 px-4 py-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full gradient-accent">
              <Music className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Créer un compte</CardTitle>
          <CardDescription>
            Rejoignez notre communauté d&apos;apprenants
          </CardDescription>

          {/* Progress indicator */}
          <div className="flex items-center justify-center gap-2 mt-4">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-colors ${
                  s < step
                    ? 'bg-green-500 text-white'
                    : s === step
                    ? 'bg-accent text-white'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {s < step ? <CheckCircle className="h-4 w-4" /> : s}
              </div>
            ))}
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Step 1: Email & Password */}
            {step === 1 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="votre@email.com"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Mot de passe</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => handleChange('password', e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  {formData.password && (
                    <div className="space-y-1">
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <div
                            key={i}
                            className={`h-1 flex-1 rounded-full transition-colors ${
                              i <= passwordStrength.score ? passwordStrength.color : 'bg-muted'
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Force du mot de passe: {passwordStrength.label}
                      </p>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="passwordConfirm">Confirmer le mot de passe</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="passwordConfirm"
                      type="password"
                      placeholder="••••••••"
                      value={formData.passwordConfirm}
                      onChange={(e) => handleChange('passwordConfirm', e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  {formData.password && formData.passwordConfirm && (
                    <p className={`text-xs ${
                      formData.password === formData.passwordConfirm
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}>
                      {formData.password === formData.passwordConfirm
                        ? '✓ Les mots de passe correspondent'
                        : '✗ Les mots de passe ne correspondent pas'}
                    </p>
                  )}
                </div>

                <Button
                  type="button"
                  onClick={handleNextStep}
                  className="w-full gradient-accent hover:opacity-90"
                >
                  Continuer
                </Button>
              </>
            )}

            {/* Step 2: Profile Info */}
            {step === 2 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="username">Nom d&apos;utilisateur</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="username"
                      type="text"
                      placeholder="monpseudo"
                      value={formData.username}
                      onChange={(e) => handleChange('username', e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                      className="pl-10"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Lettres minuscules, chiffres et underscores uniquement
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name">Prénom (ou surnom)</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="Marie"
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handlePrevStep}
                    className="flex-1"
                  >
                    Retour
                  </Button>
                  <Button
                    type="button"
                    onClick={handleNextStep}
                    className="flex-1 gradient-accent hover:opacity-90"
                  >
                    Continuer
                  </Button>
                </div>
              </>
            )}

            {/* Step 3: Learning Preferences */}
            {step === 3 && (
              <>
                <div className="space-y-2">
                  <Label>Votre niveau de français</Label>
                  <Select
                    value={formData.niveau}
                    onValueChange={(value) => handleChange('niveau', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez votre niveau" />
                    </SelectTrigger>
                    <SelectContent>
                      {NIVEAUX.map((niveau) => (
                        <SelectItem key={niveau.value} value={niveau.value}>
                          {niveau.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Ne vous inquiétez pas, vous pourrez le modifier plus tard
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Votre langue maternelle</Label>
                  <Select
                    value={formData.langueMaternelle}
                    onValueChange={(value) => handleChange('langueMaternelle', value)}
                  >
                    <SelectTrigger>
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-muted-foreground" />
                        <SelectValue placeholder="Sélectionnez votre langue" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      {LANGUES.map((langue) => (
                        <SelectItem key={langue.value} value={langue.value}>
                          {langue.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handlePrevStep}
                    className="flex-1"
                  >
                    Retour
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 gradient-accent hover:opacity-90"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Création...
                      </>
                    ) : (
                      'Créer mon compte'
                    )}
                  </Button>
                </div>
              </>
            )}
          </form>
        </CardContent>

        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Déjà un compte ?{' '}
            <Link href="/login" className="text-accent hover:underline font-medium">
              Se connecter
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
