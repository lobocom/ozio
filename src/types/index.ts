export interface Category {
  id: number;
  tituloEs: string;
  tituloEn: string;
  descripcionEs: string;
  descripcionEn: string;
  activo: boolean;
  color: string;
  icon: string;
}

export interface Country {
  id: number;
  code: string;
  name: string;
}

export interface Province {
  id: number;
  name: string;
  iso: string;
  country: Country;
}

export interface Eventor {
  id: number;
  email: string;
  activo: boolean;
  nombre: string;
  apellidos: string;
  empresa: string;
  comentario: string;
  pendienteRevision: boolean;
  emailVerificado: boolean;
}

export interface ResourceUris {
  optimized: string;
  thumbnail: string;
}

export interface Resource {
  id: number;
  active: boolean;
  name: string;
  file: string;
  contentType: string;
  uri: string;
  uris: ResourceUris;
  etag: string;
  type: string;
  generatedAt: string;
}

export interface Tic {
  id: number;
  tituloEs: string;
  tituloEn: string;
  descripcionEs: string;
  descripcionEn: string;
  activo: boolean;
}

export interface Evento {
  id: number;
  tituloEs: string;
  tituloEn: string;
  descripcionEs: string;
  descripcionEn: string;
  activo: boolean;
  fechaInicio: string;
  fechaFin: string;
  direccion: string;
  localidad: string;
  cp: string;
  precio: number;
  gratuito: boolean;
  contactoTelefono: string;
  contactoEmail: string;
  contactoWeb: string;
  latitud: string;
  longitud: string;
  distanciaUsuario?: number;
  province: Province;
  categoriaPrincipal: Category;
  categoriaSecundaria?: Category;
  eventor: Eventor;
  resources: Resource[];
  tics: Tic[];
  pendienteRevision: boolean;
}

export interface ApiResponse {
  data: Evento[];
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}
export interface Location {
  id: string;
  name: string;
  coordinates: Coordinates | null;
}

export interface EventoReminder {
  eventoId: number;
  reminderDate: string;
  createdAt: string;
}

export interface RemindersStorage {
  [eventoId: number]: EventoReminder;
}