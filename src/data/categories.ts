import { Category } from '../types';
import { Music, Beer, Ticket, Utensils, Palette, Baby, PartyPopper } from 'lucide-react';

export const categories: Category[] = [
  {
    id: '1',
    name: 'Gastronomía',
    icon: 'Utensils',
    color: '#8b5cf6'
  },
  {
    id: '2',
    name: 'Deporte y Salud',
    icon: 'Beer',
    color: '#ec4899'
  },
  {
    id: '3',
    name: 'Cultura',
    icon: 'Ticket',
    color: '#f97316'
  },
  {
    id: '4',
    name: 'Música',
    icon: 'Music',
    color: '#10b981'
  },
  {
    id: '5',
    name: 'Entretenimiento',
    icon: 'Palette',
    color: '#3b82f6'
  },
  {
    id: '6',
    name: 'Niños',
    icon: 'Baby',
    color: '#3b82f6'
  },
  {
    id: '7',
    name: 'Fiestas locales',
    icon: 'PartyPopper',
    color: '#3b82f6'
  },
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
    case 'Baby':
      return Baby;
    case 'PartyPopper':
      return PartyPopper;
    default:
      return Ticket;
  }
};

export const findCategoryById = (id: string): Category | undefined => {
  return categories.find(category => category.id === id);
};