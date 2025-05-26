import { Event } from '../types';
import { addDays } from 'date-fns';

// Create dates for different events
const today = new Date();
const tomorrow = addDays(today, 1);
const dayAfter = addDays(today, 2);
const threeDaysFromNow = addDays(today, 3);
const weekFromNow = addDays(today, 7);

export const events: Event[] = [
  {
    id: 1,
    tituloEs: 'Concierto de Rock en Vivo',
    tituloEn: 'Live Rock Concert',
    descripcionEs: 'Disfruta de las mejores bandas de rock en un ambiente increíble',
    descripcionEn: 'Enjoy the best rock bands in an amazing atmosphere',
    activo: true,
    fechaInicio: today.toISOString(),
    fechaFin: addDays(today, 1).toISOString(),
    direccion: 'Sala Caracol',
    localidad: 'Madrid',
    cp: '28010',
    precio: 25.0,
    gratuito: false,
    contactoTelefono: '+34 666 777 888',
    contactoEmail: 'info@salacaracol.com',
    contactoWeb: 'https://www.salacaracol.com',
    latitud: '40.4168',
    longitud: '-3.7038',
    province: {
      id: 28,
      name: 'MADRID',
      iso: 'ES-M',
      country: {
        id: 70,
        code: 'ES',
        name: 'España'
      }
    },
    categoriaPrincipal: {
      id: 1,
      tituloEs: 'Música',
      tituloEn: 'Music',
      descripcionEs: '',
      descripcionEn: '',
      activo: true
    },
    eventor: {
      id: 1,
      email: 'organizador@eventos.com',
      activo: true,
      nombre: 'Juan',
      apellidos: 'García',
      empresa: 'Eventos Rock',
      comentario: '',
      pendienteRevision: false,
      emailVerificado: true
    },
    resources: [
      {
        id: 1,
        active: true,
        name: 'concierto.jpg',
        file: 'concierto.jpg',
        contentType: 'image/jpeg',
        uri: '/concierto.jpg',
        uris: {
          optimized: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg',
          thumbnail: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg'
        },
        etag: '',
        type: 'IMAGEN',
        generatedAt: today.toISOString()
      }
    ],
    tics: [
      {
        id: 1,
        tituloEs: 'Parking cercano',
        tituloEn: 'Nearby parking',
        descripcionEs: '',
        descripcionEn: '',
        activo: true
      }
    ],
    pendienteRevision: false
  },
  {
    id: 2,
    tituloEs: 'Festival de Comida Callejera',
    tituloEn: 'Street Food Festival',
    descripcionEs: 'Prueba los mejores platos de la gastronomía local',
    descripcionEn: 'Try the best local gastronomy dishes',
    activo: true,
    fechaInicio: tomorrow.toISOString(),
    fechaFin: addDays(tomorrow, 2).toISOString(),
    direccion: 'Plaza Mayor',
    localidad: 'Barcelona',
    cp: '08001',
    precio: 0,
    gratuito: true,
    contactoTelefono: '+34 666 999 000',
    contactoEmail: 'info@foodfest.com',
    contactoWeb: 'https://www.foodfest.com',
    latitud: '41.3851',
    longitud: '2.1734',
    province: {
      id: 8,
      name: 'BARCELONA',
      iso: 'ES-B',
      country: {
        id: 70,
        code: 'ES',
        name: 'España'
      }
    },
    categoriaPrincipal: {
      id: 4,
      tituloEs: 'Gastronomía',
      tituloEn: 'Gastronomy',
      descripcionEs: '',
      descripcionEn: '',
      activo: true
    },
    eventor: {
      id: 2,
      email: 'organizador@foodfest.com',
      activo: true,
      nombre: 'María',
      apellidos: 'López',
      empresa: 'Food Festival BCN',
      comentario: '',
      pendienteRevision: false,
      emailVerificado: true
    },
    resources: [
      {
        id: 2,
        active: true,
        name: 'food.jpg',
        file: 'food.jpg',
        contentType: 'image/jpeg',
        uri: '/food.jpg',
        uris: {
          optimized: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg',
          thumbnail: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg'
        },
        etag: '',
        type: 'IMAGEN',
        generatedAt: today.toISOString()
      }
    ],
    tics: [
      {
        id: 2,
        tituloEs: 'Aire Libre',
        tituloEn: 'Outdoors',
        descripcionEs: '',
        descripcionEn: '',
        activo: true
      }
    ],
    pendienteRevision: false
  }
];