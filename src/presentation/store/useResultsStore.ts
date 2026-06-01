// src/store/useResultsStore.ts
import { create } from "zustand";
import {
  Hemograma,
  PresionArterial,
  Glicemia,
  Coprologico,
  Uroanalisis,
  Electrolitos,
  perfilLipidico,
  perfilTiroideo,
} from "../../types";
import {
  fetchMisExamenes,
  fetchExamenesPorIdentificacion,
  crearExamen,
  ExamenResponse,
  CrearExamenRequest,
} from "../../actions/results.actions";

// Funciones de recomendaciones
export const generarRecomendacionesHemograma = (data: Hemograma): string => {
  let recomendaciones = "";

  const hb = parseFloat(data.hb || "0");
  const hematocrito = parseFloat(data.hematocrito || "0");
  const leucocitos = parseFloat(data.leucocitos || "0");
  const neutrofilos = parseFloat(data.neutrofilos || "0");
  const plaquetas = parseFloat(data.plaquetas || "0");
  const globulosRojos = parseFloat(data.globulosRojos || "0");

  if (hb < 12) {
    recomendaciones +=
      "Hemoglobina: Posible anemia, se recomienda consultar a un médico.\n";
  } else if (hb > 18) {
    recomendaciones +=
      "Hemoglobina: Posible policitemia, se recomienda consultar a un médico.\n";
  }

  if (hematocrito < 36) {
    recomendaciones +=
      "Hematocrito: Posible anemia, se recomienda consultar a un médico.\n";
  } else if (hematocrito > 52) {
    recomendaciones +=
      "Hematocrito: Posible deshidratación o enfermedad pulmonar, se recomienda consultar a un médico.\n";
  }

  if (leucocitos < 4000) {
    recomendaciones +=
      "Leucocitos: Posible leucopenia, se recomienda consultar a un médico.\n";
  } else if (leucocitos > 10000) {
    recomendaciones +=
      "Leucocitos: Posible leucocitosis, se recomienda consultar a un médico.\n";
  }

  if (neutrofilos < 2000) {
    recomendaciones +=
      "Neutrófilos: Posible neutropenia, se recomienda consultar a un médico.\n";
  } else if (neutrofilos > 7500) {
    recomendaciones +=
      "Neutrófilos: Posible infección o inflamación, se recomienda consultar a un médico.\n";
  }

  if (plaquetas < 150000) {
    recomendaciones +=
      "Plaquetas: Posible trombocitopenia, se recomienda consultar a un médico.\n";
  } else if (plaquetas > 450000) {
    recomendaciones +=
      "Plaquetas: Posible trombocitosis, se recomienda consultar a un médico.\n";
  }

  if (globulosRojos < 4.2) {
    recomendaciones +=
      "Glóbulos Rojos: Posible anemia, se recomienda consultar a un médico.\n";
  } else if (globulosRojos > 6.1) {
    recomendaciones +=
      "Glóbulos Rojos: Posible policitemia, se recomienda consultar a un médico.\n";
  }

  return recomendaciones.length > 0
    ? recomendaciones
    : "Todos los resultados están dentro de los rangos normales.";
};

export const generarRecomendacionesPresionArterial = (data: PresionArterial): string => {
  let recomendaciones = "";

  const sistolica = parseFloat(data.sistolica || "0");
  const diastolica = parseFloat(data.diastolica || "0");

  if (sistolica >= 140 || diastolica >= 90) {
    recomendaciones +=
      "Presión alta: Posible hipertensión, se recomienda control médico.\n";
  } else if (sistolica < 90 || diastolica < 60) {
    recomendaciones +=
      "Presión baja: Posible hipotensión, se recomienda evaluar síntomas.\n";
  } else {
    recomendaciones += "Presión arterial: Normal.\n";
  }

  return recomendaciones;
};

export const generarRecomendacionesGlicemia = (data: Glicemia): string => {
  let recomendaciones = "";

  const ayuno = parseFloat(data.ayuno || "0");
  const postprandial = parseFloat(data.postprandial || "0");
  const hemoglobinaGlicosilada = parseFloat(data.hemoglobinaGlicosilada || "0");

  if (ayuno < 70) {
    recomendaciones +=
      "Glicemia en ayuno: Posible hipoglucemia, se recomienda consultar a un médico.\n";
  } else if (ayuno > 100) {
    recomendaciones +=
      "Glicemia en ayuno: Posible pre-diabetes o diabetes, se recomienda consultar a un médico.\n";
  }

  if (postprandial >= 140) {
    recomendaciones +=
      "Glicemia postprandial: Posible pre-diabetes o diabetes, se recomienda consultar a un médico.\n";
  }

  if (hemoglobinaGlicosilada >= 6.5) {
    recomendaciones +=
      "Hemoglobina Glicosilada: Posible diabetes, se recomienda consultar a un médico.\n";
  } else if (hemoglobinaGlicosilada >= 5.7) {
    recomendaciones +=
      "Hemoglobina Glicosilada: Posible pre-diabetes, se recomienda monitorear y consultar a un médico.\n";
  }

  return recomendaciones;
};

export const generarRecomendacionesCoprologico = (data: Coprologico): string => {
  let recomendaciones = "";
  
  if (data.colorHeces && data.colorHeces !== "marrón") {
    recomendaciones += "Color de heces: Posible malabsorción o sangrado.\n";
  }
  if (data.consistencia && data.consistencia !== "normal") {
    recomendaciones += "Consistencia: Posible problema gastrointestinal.\n";
  }
  if (data.sangreOculta === "positivo") {
    recomendaciones += "Sangre oculta: Posible hemorragia gastrointestinal.\n";
  }
  if (data.parasitos === "positivo") {
    recomendaciones += "Parásitos: Posible infección parasitaria.\n";
  }
  
  return recomendaciones || "Todos los resultados están dentro de los rangos normales.";
};

export const generarRecomendacionesUroanalisis = (data: Uroanalisis): string => {
  let recomendaciones = "";
  
  if (data.proteinas === "positivo") {
    recomendaciones += "Proteínas positivas: Posible daño renal o infección urinaria.\n";
  }
  if (data.glucosa === "positivo") {
    recomendaciones += "Glucosa positiva: Posible diabetes.\n";
  }
  if (data.cetona === "positivo") {
    recomendaciones += "Cetonas positivas: Posible cetosis o diabetes mal controlada.\n";
  }
  if (data.bilirrubina === "positivo") {
    recomendaciones += "Bilirrubina positiva: Posible disfunción hepática.\n";
  }
  
  return recomendaciones || "Todos los resultados están dentro de los rangos normales.";
};

export const generarRecomendacionesElectrolitos = (data: Electrolitos): string => {
  let recomendaciones = "";
  
  const sodio = parseFloat(data.sodio || "0");
  const cloro = parseFloat(data.cloro || "0");

  if (sodio < 135) {
    recomendaciones += "Sodio bajo: Riesgo de hiponatremia.\n";
  } else if (sodio > 145) {
    recomendaciones += "Sodio elevado: Riesgo de hipernatremia.\n";
  }

  if (cloro < 96) {
    recomendaciones += "Cloro bajo: Posible desbalance electrolítico.\n";
  } else if (cloro > 106) {
    recomendaciones += "Cloro elevado: Posible deshidratación o acidosis metabólica.\n";
  }

  return recomendaciones || "Electrolitos dentro de rangos normales.";
};

export const generarRecomendacionesPerfilTiroideo = (data: perfilTiroideo): string => {
  let recomendaciones = "";
  
  const tsh = parseFloat(data.tsh || "0");
  
  if (tsh > 4.0) {
    recomendaciones += "TSH alta: Posible hipotiroidismo.\n";
  } else if (tsh < 0.4) {
    recomendaciones += "TSH baja: Posible hipertiroidismo.\n";
  }

  return recomendaciones || "Función tiroidea normal.";
};

export const generarRecomendacionesPerfilLipidico = (data: perfilLipidico): string => {
  let recomendaciones = "";
  
  const colesterol = parseFloat(data.colesterol || "0");
  const trigliceridos = parseFloat(data.trigliceridos || "0");
  const hdl = parseFloat(data.hdl || "0");
  const ldl = parseFloat(data.ldl || "0");

  if (colesterol > 200) {
    recomendaciones += "Colesterol elevado: Posible riesgo cardiovascular.\n";
  }
  if (trigliceridos > 150) {
    recomendaciones += "Triglicéridos elevados: Riesgo de enfermedad cardiovascular.\n";
  }
  if (hdl < 40) {
    recomendaciones += "HDL bajo: Posible riesgo cardiovascular elevado.\n";
  }
  if (ldl > 130) {
    recomendaciones += "LDL alto: Posible riesgo cardiovascular.\n";
  }

  return recomendaciones || "Perfil lipídico dentro de rangos normales.";
};

// Interfaz del store
interface EstadoExamenes {
  // Estado del formulario
  identificacion: string;
  hemograma: Hemograma;
  presionArterial: PresionArterial;
  glicemia: Glicemia;
  coprologico: Coprologico;
  uroanalisis: Uroanalisis;
  electrolitos: Electrolitos;
  perfilLipidico: perfilLipidico;
  perfiltiroideo: perfilTiroideo;
  
  // Estado de lista de exámenes
  examenes: ExamenResponse[];
  examenesFiltrados: ExamenResponse[];
  
  // Estados de UI
  loading: boolean;
  error: string | null;

  // Acciones del formulario
  actualizarIdentificacion: (data: string) => void;
  actualizarHemograma: (data: Partial<Hemograma>) => void;
  actualizarPresionArterial: (data: Partial<PresionArterial>) => void;
  actualizarGlicemia: (data: Partial<Glicemia>) => void;
  actualizarCoprologico: (data: Partial<Coprologico>) => void;
  actualizarUroanalisis: (data: Partial<Uroanalisis>) => void;
  actualizarElectrolitos: (data: Partial<Electrolitos>) => void;
  actualizarPerfilLipidico: (data: Partial<perfilLipidico>) => void;
  actualizarPerfilTiroideo: (data: Partial<perfilTiroideo>) => void;
  
  // Acciones de API
  listarMisExamenes: () => Promise<ExamenResponse[]>;
  buscarExamenesPorIdentificacion: (identificacion: string) => Promise<ExamenResponse[]>;
  guardarExamen: () => Promise<ExamenResponse>;
  
  // Utilidades
  resetForm: () => void;
  limpiarExamenes: () => void;
  limpiarFiltro: () => void;
}

// Estado inicial del formulario
const initialFormState = {
  identificacion: "",
  hemograma: {
    hb: "",
    hematocrito: "",
    leucocitos: "",
    neutrofilos: "",
    plaquetas: "",
    globulosRojos: "",
    recomendaciones: "",
  },
  presionArterial: {
    sistolica: "",
    diastolica: "",
    recomendaciones: "",
  },
  glicemia: {
    ayuno: "",
    postprandial: "",
    hemoglobinaGlicosilada: "",
    recomendaciones: "",
  },
  coprologico: {
    colorHeces: "",
    consistencia: "",
    ph: "",
    sangreOculta: "",
    parasitos: "",
    leucocitos: "",
    eritrocitos: "",
    grasaFecal: "",
    recomendaciones: "",
  },
  uroanalisis: {
    aspecto: "",
    color: "",
    densidad: "",
    ph: "",
    proteinas: "",
    glucosa: "",
    cetona: "",
    bilirrubina: "",
    urobilinogeno: "",
    globulosRojos: "",
    globulosBlancos: "",
    cilindros: "",
    recomendaciones: "",
  },
  perfiltiroideo: {
    tsh: "",
    t3: "",
    t4Libre: "",
    recomendaciones: "",
  },
  perfilLipidico: {
    trigliceridos: "",
    colesterol: "",
    hdl: "",
    ldl: "",
    recomendacioneslipidico: "",
  },
  electrolitos: {
    sodio: "",
    cloro: "",
    recomendaciones: "",
  },
};

export const useExamenStore = create<EstadoExamenes>((set, get) => ({
  // Estado inicial
  ...initialFormState,
  examenes: [],
  examenesFiltrados: [],
  loading: false,
  error: null,

  // Acciones del formulario
  actualizarIdentificacion: (data) => set({ identificacion: data }),

  actualizarHemograma: (data) =>
    set((state) => ({
      hemograma: { ...state.hemograma, ...data },
    })),

  actualizarPresionArterial: (data) =>
    set((state) => ({
      presionArterial: { ...state.presionArterial, ...data },
    })),

  actualizarGlicemia: (data) =>
    set((state) => ({
      glicemia: { ...state.glicemia, ...data },
    })),

  actualizarCoprologico: (data) =>
    set((state) => ({
      coprologico: { ...state.coprologico, ...data },
    })),

  actualizarUroanalisis: (data) =>
    set((state) => ({
      uroanalisis: { ...state.uroanalisis, ...data },
    })),

  actualizarElectrolitos: (data) =>
    set((state) => ({
      electrolitos: { ...state.electrolitos, ...data },
    })),

  actualizarPerfilLipidico: (data) =>
    set((state) => ({
      perfilLipidico: { ...state.perfilLipidico, ...data },
    })),

  actualizarPerfilTiroideo: (data) =>
    set((state) => ({
      perfiltiroideo: { ...state.perfiltiroideo, ...data },
    })),

  // Acciones de API
  listarMisExamenes: async () => {
    set({ loading: true, error: null });
    try {
      const examenes = await fetchMisExamenes();
      set({ examenes, examenesFiltrados: examenes, loading: false });
      return examenes;
    } catch (error: any) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  buscarExamenesPorIdentificacion: async (identificacion: string) => {
    set({ loading: true, error: null });
    try {
      const examenes = await fetchExamenesPorIdentificacion(identificacion);
      set({ examenesFiltrados: examenes, loading: false });
      return examenes;
    } catch (error: any) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },


  guardarExamen: async () => {
    set({ loading: true, error: null });
    
    try {
      const state = get();
      
      if (!state.identificacion || state.identificacion.trim() === "") {
        throw new Error("La identificación del paciente es requerida");
      }

      const examenData: CrearExamenRequest = {
        identificacion: state.identificacion.trim(),
        hemograma: state.hemograma,
        presionArterial: state.presionArterial,
        glicemia: state.glicemia,
        coprologico: state.coprologico,
        uroanalisis: state.uroanalisis,
        electrolitos: state.electrolitos,
        perfilLipidico: state.perfilLipidico,
        perfilTiroideo: state.perfiltiroideo,
      };

      const nuevoExamen = await crearExamen(examenData);
      
      const examenesActuales = get().examenes;
      set({ 
        examenes: [nuevoExamen, ...examenesActuales],
        examenesFiltrados: [nuevoExamen, ...examenesActuales],
        loading: false 
      });
      
      set({ ...initialFormState });
      
      return nuevoExamen;
    } catch (error: any) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  // Utilidades
  resetForm: () => {
    set(initialFormState);
  },

  limpiarExamenes: () => {
    set({ examenes: [], examenesFiltrados: [] });
  },

  limpiarFiltro: () => {
    const examenes = get().examenes;
    set({ examenesFiltrados: examenes });
  },
}));