import React from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Edit } from 'lucide-react';

export const PetSelector: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-2xl p-4 border-t border-gray-200 z-50">
      <div className="container mx-auto max-w-3xl">
        <div className="flex justify-between items-center">
          <p className="text-lg font-semibold text-gray-800">Je cherche un service pour mon :</p>
          <button className="text-sm text-gray-500 flex items-center gap-1 hover:text-primary transition-colors">
            <Edit className="w-4 h-4" />
            Tweak
          </button>
        </div>
        <RadioGroup defaultValue="chien" className="flex space-x-8 mt-2">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="chien" id="r1" className="text-primary" />
            <Label htmlFor="r1" className="text-gray-700">Chien</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="chat" id="r2" className="text-primary" />
            <Label htmlFor="r2" className="text-gray-700">Chat</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};
