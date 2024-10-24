export type LoginUser = {
  correo: string;
  password: string;
};

// Definición de tipos para los exámenes
export interface Hemograma {
  hb?: string;
  hematocrito?: string;
  leucocitos?: string;
  neutrofilos?: string;
  plaquetas?: string;
  globulosRojos?: string;
  recomendaciones: string;
}

export interface PresionArterial {
  sistolica: string;
  diastolica: string;
  recomendaciones: string;
}

export interface Glicemia {
  ayuno: string;
  postprandial: string;
  hemoglobinaGlicosilada: string;
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
  globulosRojos: string;
  globulosBlancos: string;
  cilindros: string;
  recomendaciones: string;
}

export interface Electrolitos {
  sodio: string;
  cloro: string;
  recomendaciones: string;
}

export interface perfilTiroideo {
  tsh: string;
  t3: string;
  t4Libre: string;
  recomendaciones: string;
}
export interface perfilLipidico {
  trigliceridos: string;
  colesterol: string;
  hdl: string;
  ldl: string;
  recomendacioneslipidico: string;
}
