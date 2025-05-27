import { Category } from '../types';
import { Music, Beer, Ticket, Utensils, Palette, Baby, PartyPopper } from 'lucide-react';

export const categories: Category[] = [
  {
    id: 1,
    tituloEs: 'Gastronomía',
    tituloEn: 'Gastronomy',
    descripcionEs: '',
    descripcionEn: '',
    activo: true,
    icon: 'Utensils',
    color: '#8b5cf6'
  },
  {
    id: 2,
    tituloEs: 'Deporte y Salud',
    tituloEn: 'Sports and Health',
    descripcionEs: '',
    descripcionEn: '',
    activo: true,
    icon: 'Beer',
    color: '#ec4899'
  },
  {
    id: 3,
    tituloEs: 'Cultura',
    tituloEn: 'Culture',
    descripcionEs: '',
    descripcionEn: '',
    activo: true,
    icon: 'Ticket',
    color: '#f97316'
  },
  {
    id: 4,
    tituloEs: 'Música',
    tituloEn: 'Music',
    descripcionEs: '',
    descripcionEn: '',
    activo: true,
    icon: 'Music',
    color: '#10b981'
  },
  {
    id: 5,
    tituloEs: 'Entretenimiento',
    tituloEn: 'Entertainment',
    descripcionEs: '',
    descripcionEn: '',
    activo: true,
    icon: 'Palette',
    color: '#3b82f6'
  },
  {
    id: 6,
    tituloEs: 'Niños',
    tituloEn: 'Children',
    descripcionEs: '',
    descripcionEn: '',
    activo: true,
    icon: 'Baby',
    color: '#3b82f6'
  },
  {
    id: 7,
    tituloEs: 'Fiestas locales',
    tituloEn: 'Local Festivals',
    descripcionEs: '',
    descripcionEn: '',
    activo: true,
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

export const findCategoryById = (id: number): Category | undefined => {
  return categories.find(category => category.id === id);
};