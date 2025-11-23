"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {

  Gift,
  Tag,
  CreditCard,
  Ticket,
  Shirt,
  Trophy,
  Save,
  Trash2,
  Plus,
} from "lucide-react";
import { PriceItemType } from "@/app/types";
import { IconMap } from "@/consts";
import { updatePrizes } from "@/app/actions/update-prizes";
import { toast } from "sonner";

const prizeIcons = {
  Gift,
  Tag,
  CreditCard,
  Ticket,
  Shirt,
  Trophy,
};

interface Prize {
  id: number;
  name: string;
  icon: keyof typeof prizeIcons;
  color: string;
}

interface EditPrizesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  prizes: PriceItemType[];
}

export function EditPrizesModal({
  open,
  onOpenChange,
  prizes: pPrizes,
}: EditPrizesModalProps) {
  const sPrizes = pPrizes?.map((p, i) => {
    const icon = p.description as keyof typeof prizeIcons;
    return {
      id: i++,
      name: p.price,
      icon,
      color: p.color,
    };
  });
  const [prizes, setPrizes] = useState<Prize[]>(sPrizes);

  // Update local state when props change
  useEffect(() => {
    if (open) {
      const newPrizes = pPrizes?.map((p, i) => {
        const icon = p.description as keyof typeof prizeIcons;
        return {
          id: i++,
          name: p.price,
          icon,
          color: p.color,
        };
      });
      setPrizes(newPrizes || []);
    }
  }, [open, pPrizes]);

  const handlePrizeNameChange = (id: number, newName: string) => {
    setPrizes((prev) =>
      prev.map((prize) =>
        prize.id === id ? { ...prize, name: newName } : prize
      )
    );
  };

  const handleDeletePrize = (id: number) => {
    if (prizes.length <= 3) {
      toast.error("Mindestens 3 Preise müssen vorhanden sein!");
      return;
    }
    setPrizes((prev) => prev.filter((p) => p.id !== id));
  };

  const handleAddPrize = () => {
    if (prizes.length >= 6) {
      toast.error("Maximal 6 Preise erlaubt!");
      return;
    }
    const newId = Math.max(...prizes.map((p) => p.id), 0) + 1;
    setPrizes((prev) => [
      ...prev,
      {
        id: newId,
        name: "",
        icon: "Gift",
        color: "#ec4899", // Default pink color
      },
    ]);
  };

  const handleSave = async () => {
    const savingPrizes: PriceItemType[] = prizes.map((p) => {
      return {
        price: p.name,
        description: p.icon,
        color: p.color,
      };
    });
    try {
      updatePrizes({ items: savingPrizes });
      toast.success(
        "Preis aktualisiert! 🎉 Ab sofort gelten die neuen Preise 💶✨",
        {
          style: {
            background: "#f59e0b",
            color: "white",
            border: "none",
          },
          duration: 4000,
        }
      );
    } catch (e) {
      console.log("error during update");
    } finally {
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-black/95 border-white/30 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white">
            Preise bearbeiten
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {prizes.map((prize) => {
            const Icon = IconMap[prize.icon] || Gift;
            return (
              <div
                key={prize.id}
                className="flex items-center gap-4 p-4 rounded-lg border border-white/20 bg-white/5 hover:bg-white/10 transition-colors"
              >
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDeletePrize(prize.id)}
                  className="text-white/40 hover:text-red-400 hover:bg-white/5"
                >
                  <Trash2 className="w-5 h-5" />
                </Button>

                <div
                  className="flex items-center justify-center w-12 h-12 rounded-lg flex-shrink-0"
                  style={{ backgroundColor: prize.color }}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>

                <div className="flex-1">
                  <label className="text-xs text-white/60 mb-1 block">
                    Preis Name
                  </label>
                  <Input
                    value={prize.name}
                    onChange={(e) =>
                      handlePrizeNameChange(prize.id, e.target.value)
                    }
                    className="bg-white/10 border-white/30 text-white placeholder:text-white/40 focus:border-white/50"
                    placeholder="Preis Name eingeben..."
                  />
                </div>
              </div>
            );
          })}
        </div>

        {prizes.length < 6 && (
          <Button
            onClick={handleAddPrize}
            variant="outline"
            className="w-full mt-4 border-dashed border-white/30 bg-white/5 hover:bg-white/10 text-white/60 hover:text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Preis hinzufügen
          </Button>
        )}

        <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-white/20">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="bg-white/10 border-white/30 text-white hover:bg-white/20"
          >
            Abbrechen
          </Button>
          <Button
            onClick={handleSave}
            className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white"
          >
            <Save className="w-4 h-4 mr-2" />
            Speichern
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
