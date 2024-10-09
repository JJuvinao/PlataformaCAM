import { create } from "zustand";
import {
  Hemograma,
  PresionArterial,
  Glicemia,
  Coprologico,
  Uroanalisis,
  Potasio,
} from "../../types";

interface EstadoExamenes {
  hemograma: Hemograma;
  presionArterial: PresionArterial;
  glicemia: Glicemia;
  coprologico: Coprologico;
  uroanalisis: Uroanalisis;
  potasio: Potasio;

  actualizarHemograma: (data: Partial<Hemograma>) => void;
  actualizarPresionArterial: (data: Partial<PresionArterial>) => void;
  actualizarGlicemia: (data: Partial<Glicemia>) => void;
  actualizarCoprologico: (data: Partial<Coprologico>) => void;
  actualizarUroanalisis: (data: Partial<Uroanalisis>) => void;
  actualizarPotasio: (data: Partial<Potasio>) => void;
}

const generarRecomendacionesHemograma = (data: Partial<Hemograma>): string => {
  let recomendacion = "";

  if (parseFloat(data.hb || "0") < 12) {
    recomendacion += "Hemoglobina baja, posible anemia. ";
  } else if (parseFloat(data.hb || "0") > 16) {
    recomendacion +=
      "Hemoglobina alta, posible deshidratación o problemas pulmonares. ";
  }

  if (parseFloat(data.hematocrito || "0") < 40) {
    recomendacion +=
      "Hematocrito bajo, revisar por posibles problemas de anemia o deficiencia de hierro. ";
  } else if (parseFloat(data.hematocrito || "0") > 52) {
    recomendacion +=
      "Hematocrito alto, podría indicar deshidratación o problemas respiratorios. ";
  }

  if (parseFloat(data.plaquetas || "0") < 150000) {
    recomendacion +=
      "Plaquetas bajas, riesgo de sangrado o problemas en la médula ósea. ";
  } else if (parseFloat(data.plaquetas || "0") > 450000) {
    recomendacion += "Plaquetas altas, posible inflamación o infección. ";
  }

  return recomendacion || "Resultados dentro del rango normal.";
};

const generarRecomendacionesPresionArterial = (
  data: Partial<PresionArterial>
): string => {
  const sistolica = parseFloat(data.sistolica || "0");
  const diastolica = parseFloat(data.diastolica || "0");

  if (sistolica > 140 || diastolica > 90) {
    return "Presión arterial alta, riesgo de hipertensión.";
  } else if (sistolica < 90 || diastolica < 60) {
    return "Presión arterial baja, riesgo de hipotensión.";
  }
  return "Presión arterial normal.";
};

export const useExamenStore = create<EstadoExamenes>((set) => ({
  hemograma: {
    hb: "",
    hematocrito: "",
    plaquetas: "",
    globulosRojos: "",
    calcio: "",
    creatinina: "",
    recomendaciones: "",
  },
  presionArterial: {
    sistolica: "",
    diastolica: "",
    recomendaciones: "",
  },
  glicemia: {
    nivel: "",
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
    sedimento: {
      globulosRojos: "",
      globulosBlancos: "",
      cilindros: "",
    },
    recomendaciones: "",
  },
  potasio: {
    rango: "",
    recomendaciones: "",
  },

  actualizarHemograma: (data) =>
    set((state) => ({
      hemograma: {
        ...state.hemograma,
        ...data,
        recomendaciones: generarRecomendacionesHemograma(data),
      },
    })),
  actualizarPresionArterial: (data) =>
    set((state) => ({
      presionArterial: {
        ...state.presionArterial,
        ...data,
        recomendaciones: generarRecomendacionesPresionArterial(data),
      },
    })),
  actualizarGlicemia: (data) =>
    set((state) => ({
      glicemia: {
        ...state.glicemia,
        ...data,
        recomendaciones:
          data.nivel && parseFloat(data.nivel) > 110
            ? "Nivel de glicemia alto, riesgo de diabetes."
            : "Nivel de glicemia normal.",
      },
    })),
  actualizarCoprologico: (data) =>
    set((state) => ({
      coprologico: {
        ...state.coprologico,
        ...data,
        recomendaciones:
          data.colorHeces !== "Marrón"
            ? "Color de heces anormal, posible problema digestivo."
            : "Resultados dentro del rango normal.",
      },
    })),
  actualizarUroanalisis: (data) =>
    set((state) => ({
      uroanalisis: {
        ...state.uroanalisis,
        ...data,
        recomendaciones:
          data.color !== "Amarillo claro"
            ? "Color de orina anormal, posible problema renal o de hidratación."
            : "Resultados dentro del rango normal.",
      },
    })),
  actualizarPotasio: (data) =>
    set((state) => ({
      potasio: {
        ...state.potasio,
        ...data,
        recomendaciones:
          parseFloat(data.rango || "0") < 3.5
            ? "Niveles de potasio bajos, posible hipokalemia."
            : parseFloat(data.rango || "0") > 5.0
            ? "Niveles de potasio altos, posible hiperkalemia."
            : "Niveles de potasio normales.",
      },
    })),
}));
