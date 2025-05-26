import { Category } from '../types';
import { Music, Beer, Ticket, Utensils, Palette } from 'lucide-react';

export const categories: Category[] = [
  {
    id: '1',
    name: 'Música',
    icon: 'Music',
    color: '#8b5cf6'
  },
  {
    id: '2',
    name: 'Fiestas',
    icon: 'Beer',
    color: '#ec4899'
  },
  {
    id: '3',
    name: 'Teatro',
    icon: 'Ticket',
    color: '#f97316'
  },
  {
    id: '4',
    name: 'Gastronomía',
    icon: 'Utensils',
    color: '#10b981'
  },
  {
    id: '5',
    name: 'Arte',
    icon: 'Palette',
    color: '#3b82f6'
  }
];

export const getCategoryIcon = (iconName: string) => {
  switch (iconName) {
    case 'Music':
      return Music;
    case 'Beer':
      return Beer;
    case 'Ticket':
      return Ticket;
    case 'Utensils':
      return Utensils;
    case 'Palette':
      return Palette;
    default:
      return Ticket;
  }
};

export const findCategoryById = (id: string): Category | undefined => {
  return categories.find(category => category.id === id);
};