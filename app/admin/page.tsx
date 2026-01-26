"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { pb } from "@/lib/pocketbase";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert } from "@/components/ui/alert";

interface User {
  id: string;
  email: string;
  username: string;
  name: string;
  role: string;
  isValidated: boolean;
}

export default function AdminUserValidationPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        router.replace("/login");
      } else if (user.role !== "admin") {
        router.replace("/");
      }
    }
  }, [user, authLoading, router]);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await pb.collection("users").getFullList<User>({
        filter: "isValidated = false",
        sort: "-created"
      });
      setUsers(result);
    } catch {
      setError("Erreur lors du chargement des utilisateurs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleValidate = async (userId: string) => {
    setError(null);
    setSuccess(null);
    try {
      await pb.collection("users").update(userId, { isValidated: true });
      setSuccess("Utilisateur validé avec succès.");
      setUsers((prev) => prev.filter((u) => u.id !== userId));
    } catch {
      setError("Erreur lors de la validation de l'utilisateur.");
    }
  };

  if (authLoading || !user || user.role !== "admin") {
    return <div className="min-h-screen flex items-center justify-center">Chargement...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-accent/5 via-background to-primary/5 px-4 py-8">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Validation des nouveaux comptes</CardTitle>
        </CardHeader>
        <CardContent>
          {error && <Alert variant="destructive">{error}</Alert>}
          {success && <Alert variant="default">{success}</Alert>}
          {loading ? (
            <div>Chargement...</div>
          ) : users.length === 0 ? (
            <div>Aucun utilisateur en attente de validation.</div>
          ) : (
            <table className="w-full mt-4 border">
              <thead>
                <tr className="bg-muted">
                  <th className="p-2">Email</th>
                  <th className="p-2">Nom</th>
                    <th className="p-2">Nom d&apos;utilisateur</th>
                  <th className="p-2">Rôle</th>
                  <th className="p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-t">
                    <td className="p-2">{user.email}</td>
                    <td className="p-2">{user.name}</td>
                    <td className="p-2">{user.username}</td>
                    <td className="p-2">{user.role}</td>
                    <td className="p-2">
                      <Button onClick={() => handleValidate(user.id)} size="sm">
                        Valider
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
