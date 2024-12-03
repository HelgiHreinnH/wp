import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import type { Database } from '@/integrations/supabase/types';

type Facility = Database['public']['Tables']['Facilities']['Row'];

interface CardFrontProps extends Pick<
  Facility,
  | 'Facility'
  | 'Subtitle'
  | 'Description'
  | 'Task Category'
  | 'Approx. Square Meters'
  | 'Approx. Users'
> {
  onFlip?: (e: React.MouseEvent) => void;
  imageId?: string;
}

const CardFront: React.FC<CardFrontProps> = ({
  Facility: facility,
  Subtitle: subtitle,
  Description: description,
  'Task Category': taskCategory,
  'Approx. Square Meters': sqmApprox,
  'Approx. Users': usersApprox,
  onFlip,
  imageId = 'photo-1488590528505-98d2b5aba04b'
}) => {
  const navigate = useNavigate();

  const handleShowMore = (e: React.MouseEvent) => {
    if (onFlip) {
      onFlip(e);
    } else {
      navigate('/card-back');
    }
  };

  return (
    <Card className="w-full h-full hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="pb-0">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">{facility}</h1>
      </CardHeader>

      <div className="w-full h-48 overflow-hidden">
        <img 
          src={`https://images.unsplash.com/photo-${imageId}`} 
          alt={facility || 'Facility image'} 
          className="w-full h-full object-cover"
        />
      </div>

      <CardContent className="pt-6">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-700">{subtitle}</h2>
          <p className="text-gray-600 leading-relaxed">{description}</p>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-700 mb-2">Task Category</h3>
            <p className="text-gray-600">{taskCategory}</p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-700 mb-2">Space Details</h3>
            <div className="space-y-2">
              <p className="text-gray-600">Area: {sqmApprox} m²</p>
              <p className="text-gray-600">Capacity: {usersApprox} users</p>
            </div>
          </div>
        </div>
        
        <button
          onClick={handleShowMore}
          className="w-full bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-colors duration-300 mt-6"
        >
          Show More Details
        </button>
      </CardContent>
    </Card>
  );
};

export default CardFront;