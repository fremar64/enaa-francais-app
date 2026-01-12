'use client';

/**
 * Composant ExportData
 * Export CSV/JSON des progressions
 * 
 * Conforme à la gouvernance des données CEREDIS
 * L'enseignant peut exporter les données de sa classe uniquement
 */

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { 
  Download, 
  FileJson, 
  FileSpreadsheet,
  Users,
  User,
  Calendar,
  CheckCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ExportConfig, ExportResult, SyntheseEleve } from '@/types/teacher-dashboard';

interface ExportDataProps {
  eleves: SyntheseEleve[];
  eleveSelectionne: SyntheseEleve | null;
  onExport: (config: ExportConfig) => ExportResult;
}

export function ExportData({ eleves, eleveSelectionne, onExport }: ExportDataProps) {
  const [open, setOpen] = useState(false);
  const [format, setFormat] = useState<'csv' | 'json'>('csv');
  const [scope, setScope] = useState<'classe' | 'eleve'>('classe');
  const [includeDetails, setIncludeDetails] = useState(false);
  const [includePreuves, setIncludePreuves] = useState(false);
  const [exportResult, setExportResult] = useState<ExportResult | null>(null);

  const handleExport = () => {
    const config: ExportConfig = {
      format,
      scope,
      eleveId: scope === 'eleve' && eleveSelectionne ? eleveSelectionne.id : undefined,
      includeDetails,
      includePreuves
    };
    
    const result = onExport(config);
    setExportResult(result);
    
    // Fermer après un délai
    setTimeout(() => {
      setOpen(false);
      setExportResult(null);
    }, 2000);
  };

  const formatSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} octets`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} Ko`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} Mo`;
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Exporter les données
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Download className="h-5 w-5 text-primary" />
            Export des données de progression
          </DialogTitle>
          <DialogDescription>
            Exportez les données de votre classe au format CSV ou JSON.
            Les données exportées sont conformes au référentiel CEREDIS.
          </DialogDescription>
        </DialogHeader>

        {exportResult ? (
          <div className="py-8 text-center">
            <CheckCircle className="h-16 w-16 mx-auto text-emerald-500 mb-4" />
            <h3 className="text-lg font-medium mb-2">Export réussi !</h3>
            <p className="text-sm text-muted-foreground">
              {exportResult.filename} ({formatSize(exportResult.size)})
            </p>
          </div>
        ) : (
          <div className="space-y-6 py-4">
            {/* Format */}
            <div className="space-y-3">
              <Label>Format d'export</Label>
              <RadioGroup 
                value={format} 
                onValueChange={(v) => setFormat(v as 'csv' | 'json')}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="csv" id="csv" />
                  <Label htmlFor="csv" className="flex items-center gap-2 cursor-pointer">
                    <FileSpreadsheet className="h-4 w-4 text-green-600" />
                    CSV (Excel)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="json" id="json" />
                  <Label htmlFor="json" className="flex items-center gap-2 cursor-pointer">
                    <FileJson className="h-4 w-4 text-blue-600" />
                    JSON
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Scope */}
            <div className="space-y-3">
              <Label>Périmètre</Label>
              <RadioGroup 
                value={scope} 
                onValueChange={(v) => setScope(v as 'classe' | 'eleve')}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="classe" id="classe" />
                  <Label htmlFor="classe" className="flex items-center gap-2 cursor-pointer">
                    <Users className="h-4 w-4" />
                    Toute la classe ({eleves.length} élèves)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem 
                    value="eleve" 
                    id="eleve" 
                    disabled={!eleveSelectionne}
                  />
                  <Label 
                    htmlFor="eleve" 
                    className={cn(
                      "flex items-center gap-2 cursor-pointer",
                      !eleveSelectionne && "opacity-50"
                    )}
                  >
                    <User className="h-4 w-4" />
                    {eleveSelectionne 
                      ? `${eleveSelectionne.prenom} ${eleveSelectionne.nom}`
                      : 'Sélectionnez un élève'
                    }
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Options */}
            <div className="space-y-3">
              <Label>Options</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="details" 
                    checked={includeDetails}
                    onCheckedChange={(v) => setIncludeDetails(v as boolean)}
                  />
                  <Label htmlFor="details" className="text-sm cursor-pointer">
                    Inclure les détails (historique des scores)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="preuves" 
                    checked={includePreuves}
                    onCheckedChange={(v) => setIncludePreuves(v as boolean)}
                    disabled={format === 'csv'}
                  />
                  <Label 
                    htmlFor="preuves" 
                    className={cn(
                      "text-sm cursor-pointer",
                      format === 'csv' && "opacity-50"
                    )}
                  >
                    Inclure les preuves (JSON uniquement)
                  </Label>
                </div>
              </div>
            </div>

            {/* Aperçu */}
            <div className="bg-muted/50 rounded-lg p-3 space-y-2">
              <p className="text-xs font-medium text-muted-foreground uppercase">Aperçu de l'export</p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">
                  {format.toUpperCase()}
                </Badge>
                <Badge variant="outline">
                  {scope === 'classe' ? `${eleves.length} élèves` : '1 élève'}
                </Badge>
                {includeDetails && (
                  <Badge variant="outline">+ Historique</Badge>
                )}
                {includePreuves && format === 'json' && (
                  <Badge variant="outline">+ Preuves</Badge>
                )}
              </div>
            </div>
          </div>
        )}

        <DialogFooter>
          {!exportResult && (
            <>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Annuler
              </Button>
              <Button onClick={handleExport} className="gap-2">
                <Download className="h-4 w-4" />
                Télécharger
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Bouton rapide pour export classe CSV
export function QuickExportButton({ onExport }: { onExport: (config: ExportConfig) => void }) {
  return (
    <Button 
      variant="outline" 
      size="sm"
      className="gap-2"
      onClick={() => onExport({
        format: 'csv',
        scope: 'classe',
        includeDetails: false,
        includePreuves: false
      })}
    >
      <FileSpreadsheet className="h-4 w-4" />
      Export CSV
    </Button>
  );
}

export default ExportData;
