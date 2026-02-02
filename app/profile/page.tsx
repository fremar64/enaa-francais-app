'use client';

import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { AuthenticatedLayout } from "@/components/layout/AuthenticatedLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Mail, Calendar, Shield } from "lucide-react";

function ProfileContent() {
  const { user } = useAuth();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Mon Profil</h1>
        <p className="text-muted-foreground mt-2">
          Gérez vos informations personnelles
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Informations personnelles
          </CardTitle>
          <CardDescription>Vos données de profil</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-2">
                <Mail className="h-4 w-4" />
                Email
              </label>
              <p className="text-gray-900">{user?.email}</p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-2">
                <User className="h-4 w-4" />
                Nom
              </label>
              <p className="text-gray-900">{user?.name || 'Non renseigné'}</p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-2">
                <User className="h-4 w-4" />
                Username
              </label>
              <p className="text-gray-900">{user?.username || 'Non renseigné'}</p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-2">
                <Shield className="h-4 w-4" />
                Rôle
              </label>
              <p className="text-gray-900 capitalize">{user?.role}</p>
            </div>

            {user?.niveau_actuel && (
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2">
                  Niveau actuel
                </label>
                <p className="text-gray-900">{user.niveau_actuel}</p>
              </div>
            )}

            {user?.created_at && (
              <div>
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-2">
                  <Calendar className="h-4 w-4" />
                  Membre depuis
                </label>
                <p className="text-gray-900">
                  {new Date(user.created_at).toLocaleDateString('fr-FR')}
                </p>
              </div>
            )}
          </div>

          {user?.is_validated !== undefined && (
            <div className="pt-4 border-t">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700">Statut du compte:</span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  user.is_validated 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {user.is_validated ? '✓ Validé' : '⏳ En attente'}
                </span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <AuthenticatedLayout>
        <ProfileContent />
      </AuthenticatedLayout>
    </ProtectedRoute>
  );
}
