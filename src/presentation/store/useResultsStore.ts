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
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../config";

interface Examen {
  id: string;
  hemograma: {
    hb: string;
    hematocrito: string;
  };
  presionArterial: {
    sistolica: string;
    diastolica: string;
  };
  fecha: any; // Campo de fecha
}

interface EstadoExamenes {
  identificacion: string;
  hemograma: Hemograma;
  presionArterial: PresionArterial;
  glicemia: Glicemia;
  coprologico: Coprologico;
  uroanalisis: Uroanalisis;
  electrolitos: Electrolitos;
  perfilLipidico: perfilLipidico;
  perfiltiroideo: perfilTiroideo;

  actualizarIdentificacion: (data: string) => void;
  actualizarHemograma: (data: Partial<Hemograma>) => void;
  actualizarPresionArterial: (data: Partial<PresionArterial>) => void;
  actualizarGlicemia: (data: Partial<Glicemia>) => void;
  actualizarCoprologico: (data: Partial<Coprologico>) => void;
  actualizarUroanalisis: (data: Partial<Uroanalisis>) => void;
  actualizarElectrolitos: (data: Partial<Electrolitos>) => void;
  actualizarPerfilLipidico: (data: Partial<perfilLipidico>) => void;
  actualizarPerfilTiroideo: (data: Partial<perfilTiroideo>) => void;
  // guardarDatosEnFirebase: () => Promise<void>;
  guardarDatosEnFirebase: (onSuccess: any) => Promise<void>;
}

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

export const generarRecomendacionesCoprologico = (
  data: Coprologico
): string => {
  let recomendaciones = "";

  const colorHeces = data.colorHeces;
  const consistencia = data.consistencia;
  const ph = parseFloat(data.ph || "0");
  const sangreOculta = data.sangreOculta;
  const parasitos = data.parasitos;
  const leucocitos = parseFloat(data.leucocitos || "0");
  const eritrocitos = parseFloat(data.eritrocitos || "0");
  const grasaFecal = data.grasaFecal;

  if (colorHeces !== "marrón") {
    recomendaciones += "Color de heces: Posible malabsorción o sangrado.\n";
  }

  if (consistencia !== "normal") {
    recomendaciones += "Consistencia: Posible problema gastrointestinal.\n";
  }

  if (ph < 5.5) {
    recomendaciones += "pH fecal: Posible intolerancia a lactosa.\n";
  }

  if (sangreOculta === "positivo") {
    recomendaciones += "Sangre oculta: Posible hemorragia gastrointestinal.\n";
  }
  if (parasitos === "positivo") {
    recomendaciones += "Parásitos: Posible infección parasitaria.\n";
  }

  if (leucocitos > 1) {
    recomendaciones +=
      "Leucocitos: Posible infección o inflamación intestinal.\n";
  }
  if (eritrocitos > 1) {
    recomendaciones +=
      "Eritrocitos: Posible infección o inflamación intestinal.\n";
  }
  if (grasaFecal === "positiva") {
    recomendaciones += "Grasa fecal: Posible malabsorción.\n";
  }

  return recomendaciones.length > 0
    ? recomendaciones
    : "Todos los resultados están dentro de los rangos normales.";
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

  return recomendaciones.length > 0
    ? recomendaciones
    : "Todos los resultados están dentro de los rangos normales.";
};

export const generarRecomendacionesPresionArterial = (
  data: PresionArterial
): string => {
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

  return recomendaciones.length > 0
    ? recomendaciones
    : "Todos los resultados están dentro de los rangos normales.";
};

export const generarRecomendacionesUroanalisis = (
  data: Uroanalisis
): string => {
  let recomendaciones = "";

  const aspecto = data.aspecto;
  const color = data.color;
  const densidad = parseFloat(data.densidad || "0");
  const ph = parseFloat(data.ph || "0");
  const proteinas = data.proteinas;
  const glucosa = data.glucosa;
  const cetonas = data.cetona;
  const bilirrubina = data.bilirrubina;
  const urobilinogeno = parseFloat(data.urobilinogeno || "0");
  const globulosrojos = parseFloat(data.globulosRojos || "0");
  const globulosblancos = parseFloat(data.globulosBlancos || "0");
  const cilindros = parseFloat(data.cilindros || "0");
  if (aspecto !== "limpio") {
    recomendaciones += "Aspecto anormal de la orina.\n";
  }
  if (color !== "amarillo claro") {
    recomendaciones += "Color anormal de la orina.\n";
  }

  if (densidad < 1.005 || densidad > 1.03) {
    recomendaciones += "Densidad anormal de la orina.\n";
  }

  if (ph < 4.5 || ph > 8) {
    recomendaciones += "pH urinario anormal.\n";
  }

  if (proteinas === "positivo") {
    recomendaciones +=
      "Proteínas positivas: Posible daño renal o infección urinaria.\n";
  }

  if (glucosa === "positivo") {
    recomendaciones += "Glucosa positiva: Posible diabetes.\n";
  }

  if (cetonas === "positivo") {
    recomendaciones +=
      "Cetonas positivas: Posible cetosis o diabetes mal controlada.\n";
  }

  if (bilirrubina === "positivo") {
    recomendaciones += "Bilirrubina positiva: Posible disfunción hepática.\n";
  }

  if (urobilinogeno > 1.0) {
    recomendaciones += "Urobilinógeno elevado: Posible daño hepático.\n";
  }

  if (globulosrojos > 0) {
    recomendaciones +=
      "Globulos Rojos elevados: Posible hemorragia o inflamación.\n";
  }
  if (globulosblancos > 0) {
    recomendaciones += "Globulos Blancos elevados: Posible infección.\n";
  }
  if (cilindros > 0) {
    recomendaciones +=
      "Cilindros presentes: Posible daño renal o deshidratación.\n";
  }

  return recomendaciones.length > 0
    ? recomendaciones
    : "Todos los resultados están dentro de los rangos normales.";
};

export const generarRecomendacionesPerfilTiroideo = (
  data: perfilTiroideo
): string => {
  let recomendaciones = "";

  const tsh = parseFloat(data.tsh);
  const t3 = parseFloat(data.t3);
  const t4Libre = parseFloat(data.t4Libre);

  if (tsh > 4.0) {
    recomendaciones += "TSH alta: Posible hipotiroidismo.\n";
  } else if (tsh < 0.4) {
    recomendaciones += "TSH baja: Posible hipertiroidismo.\n";
  }

  if (t3 < 100 || t3 > 200 || t4Libre < 0.7 || t4Libre > 1.9) {
    recomendaciones += "T3 y T4 alterados: Posible disfunción tiroidea.\n";
  }

  return (
    recomendaciones ||
    "Todos los resultados están dentro de los rangos normales."
  );
};

export const generarRecomendacionesPerfilLipidico = (
  data: perfilLipidico
): string => {
  let recomendacioneslipidico = "";

  const trigliceridos = parseFloat(data.trigliceridos || "0");
  const colesterol = parseFloat(data.colesterol || "0");
  const hdl = parseFloat(data.hdl || "0");
  const ldl = parseFloat(data.ldl || "0");

  if (trigliceridos > 150) {
    recomendacioneslipidico +=
      "Triglicéridos elevados: Riesgo de enfermedad cardiovascular.\n";
  }

  if (colesterol > 200) {
    recomendacioneslipidico +=
      "Colesterol elevado: Posible riesgo de enfermedad cardiovascular.\n";
  }

  if (hdl < 40) {
    recomendacioneslipidico +=
      "HDL bajo: Posible riesgo cardiovascular elevado.\n";
  }

  if (ldl > 130) {
    recomendacioneslipidico += "LDL alto: Posible riesgo cardiovascular.\n";
  }

  return recomendacioneslipidico;
};

export const generarRecomendacionesElectrolitos = (
  data: Electrolitos
): string => {
  let recomendacionesElectrolitos = "";

  const sodio = parseFloat(data.sodio || "0");
  const cloro = parseFloat(data.cloro || "0");

  if (sodio < 135) {
    recomendacionesElectrolitos +=
      "Sodio bajo: Riesgo de hiponatremia, puede causar confusión, fatiga y mareos.\n";
  } else if (sodio > 145) {
    recomendacionesElectrolitos +=
      "Sodio elevado: Riesgo de hipernatremia, puede causar deshidratación o hipertensión.\n";
  }

  if (cloro < 96) {
    recomendacionesElectrolitos +=
      "Cloro bajo: Puede indicar hipocloremia, posible desbalance electrolítico.\n";
  } else if (cloro > 106) {
    recomendacionesElectrolitos +=
      "Cloro elevado: Puede indicar hipercloremia, relacionado con deshidratación o acidosis metabólica.\n";
  }

  return recomendacionesElectrolitos;
};

export const useExamenStore = create<EstadoExamenes>((set, get) => ({
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
  actualizarIdentificacion: (data) => set({ identificacion: data }),

  actualizarHemograma: (data) =>
    set((state) => ({
      hemograma: {
        ...state.hemograma,
        ...data,
        // recomendaciones: generarRecomendacionesHemograma(data as Hemograma),
      },
    })),

  actualizarPresionArterial: (nuevosValores) =>
    set((state) => ({
      presionArterial: {
        ...state.presionArterial,
        ...nuevosValores,
        // recomendaciones: generarRecomendacionesPresionArterial(
        //   data as PresionArterial
        // ),
      },
    })),

  actualizarGlicemia: (nuevosValores) =>
    set((state) => ({
      glicemia: {
        ...state.glicemia,
        ...nuevosValores,
        // recomendaciones: generarRecomendacionesGlicemia(data as Glicemia),
      },
    })),

  actualizarCoprologico: (nuevosValores) =>
    set((state) => ({
      coprologico: {
        ...state.coprologico,
        ...nuevosValores,
        // recomendaciones: generarRecomendacionesCoprologico(data as Coprologico),
      },
    })),

  actualizarUroanalisis: (nuevosValores) =>
    set((state) => ({
      uroanalisis: {
        ...state.uroanalisis,
        ...nuevosValores,
        // recomendaciones: generarRecomendacionesUroanalisis(data as Uroanalisis),
      },
    })),

  actualizarElectrolitos: (nuevosValores) =>
    set((state) => ({
      electrolitos: {
        ...state.electrolitos,
        ...nuevosValores,
        // recomendaciones:
        //   parseFloat(data.sodio || "0") < 135
        //     ? "Hiponatremia."
        //     : "Resultados normales.",
      },
    })),

  actualizarPerfilLipidico: (nuevosValores) =>
    set((state) => ({
      perfilLipidico: {
        ...state.perfilLipidico,
        ...nuevosValores,
      },
    })),

  actualizarPerfilTiroideo: (nuevosValores) =>
    set((state) => ({
      perfiltiroideo: {
        ...state.perfiltiroideo,
        ...nuevosValores,
        // recomendaciones: generarRecomendacionesPerfilTiroideo(
        //   data as perfilTiroideo
        // ),
      },
    })),
  guardarDatosEnFirebase: async (onSuccess: any) => {
    const {
      identificacion,
      hemograma,
      presionArterial,
      glicemia,
      coprologico,
      uroanalisis,
      electrolitos,
      perfilLipidico,
      perfiltiroideo,
    } = get();

    const data = {
      identificacion,
      hemograma,
      presionArterial,
      glicemia,
      coprologico,
      uroanalisis,
      electrolitos,
      perfilLipidico,
      perfiltiroideo,
      fecha: new Date(),
    };

    try {
      const datos = await addDoc(collection(db, "examenes"), data);
      if (datos) {
        set({
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
        });
        if (onSuccess) onSuccess();
      }
    } catch (error) {
      throw new Error("Error al guardar los datos");
    }
  },
}));
