import { Category } from '../types';
import { Music, Bike, Ticket, Utensils, Palette, Baby, PartyPopper } from 'lucide-react';

export const categories: Category[] = [
  {
    id: 1,
    tituloEs: 'Gastronomía',
    tituloEn: 'Gastronomy',
    descripcionEs: '',
    descripcionEn: '',
    activo: true,
    icon: 'Utensils',
    color: '#d79c41'
  },
  {
    id: 2,
    tituloEs: 'Deporte y Salud',
    tituloEn: 'Sports and Health',
    descripcionEs: '',
    descripcionEn: '',
    activo: true,
    icon: 'Bike',
    color: '#7eb88a'
  },
  {
    id: 3,
    tituloEs: 'Cultura y Educación',
    tituloEn: 'Culture and Education',
    descripcionEs: '',
    descripcionEn: '',
    activo: true,
    icon: 'Ticket',
    color: '#ebd57e'
  },
  {
    id: 4,
    tituloEs: 'Música',
    tituloEn: 'Music',
    descripcionEs: '',
    descripcionEn: '',
    activo: true,
    icon: 'Music',
    color: '#c15d61'
  },
  {
    id: 5,
    tituloEs: 'Entretenimiento',
    tituloEn: 'Entertainment',
    descripcionEs: '',
    descripcionEn: '',
    activo: true,
    icon: 'Palette',
    color: '#5b368b'
  },
  {
    id: 6,
    tituloEs: 'Niños',
    tituloEn: 'Children',
    descripcionEs: '',
    descripcionEn: '',
    activo: true,
    icon: 'Baby',
    color: '#76a7dc'
  },
  {
    id: 7,
    tituloEs: 'Fiestas locales',
    tituloEn: 'Local Festivals',
    descripcionEs: '',
    descripcionEn: '',
    activo: true,
    icon: 'PartyPopper',
    color: '#b69f74'
  },
];

export const getCategoryIcon = (iconName: string) => {
  switch (iconName) {
    case 'Music':
      return Music;
    case 'Bike':
      return Bike;
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