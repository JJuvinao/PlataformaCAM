export type LoginUser = {
  correo: string;
  password: string;
};

// Definición de tipos para los exámenes
export interface Hemograma {
  hb: string;
  hematocrito: string;
  plaquetas: string;
  globulosRojos: string;
  calcio: string;
  creatinina: string;
  recomendaciones: string;
}

export interface PresionArterial {
  sistolica: string;
  diastolica: string;
  recomendaciones: string;
}

export interface Glicemia {
  nivel: string;
  recomendaciones: string;
}

export interface Coprologico {
  colorHeces: string;
  consistencia: string;
  ph: string;
  sangreOculta: string;
  parasitos: string;
  leucocitos: string;
  eritrocitos: string;
  grasaFecal: string;
  recomendaciones: string;
}

export interface Uroanalisis {
  aspecto: string;
  color: string;
  densidad: string;
  ph: string;
  proteinas: string;
  glucosa: string;
  cetona: string;
  bilirrubina: string;
  urobilinogeno: string;
  sedimento: {
    globulosRojos: string;
    globulosBlancos: string;
    cilindros: string;
  };
  recomendaciones: string;
}

export interface Potasio {
  rango: string;
  recomendaciones: string;
}
