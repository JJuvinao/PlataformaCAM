// import { create } from "zustand";
// import {
//   Hemograma,
//   PresionArterial,
//   Glicemia,
//   Coprologico,
//   Uroanalisis,
//   Electrolitos,
//   Creatinina,
//   PerfilTiroideo,
//   PerfilLipidico,
// } from "../../types";

// interface EstadoExamenes {
//   hemograma: Hemograma;
//   presionArterial: PresionArterial;
//   glicemia: Glicemia;
//   coprologico: Coprologico;
//   uroanalisis: Uroanalisis;
//   electrolitos: Electrolitos;
//   creatinina: Creatinina;
//   perfilTiroideo: PerfilTiroideo;
//   perfilLipidico: PerfilLipidico;

//   actualizarHemograma: (data: Partial<Hemograma>) => void;
//   actualizarPresionArterial: (data: Partial<PresionArterial>) => void;
//   actualizarGlicemia: (data: Partial<Glicemia>) => void;
//   actualizarCoprologico: (data: Partial<Coprologico>) => void;
//   actualizarUroanalisis: (data: Partial<Uroanalisis>) => void;
//   actualizarElectrolitos: (data: Partial<Electrolitos>) => void;
//   actualizarCreatinina: (data: Partial<Creatinina>) => void;
//   actualizarPerfilTiroideo: (data: Partial<PerfilTiroideo>) => void;
//   actualizarPerfilLipidico: (data: Partial<PerfilLipidico>) => void;
// }

// // Funciones para generar recomendaciones
// const generarRecomendacionesHemograma = (data: Partial<Hemograma>): string => {
//   let recomendacion = "";
//   const hb = parseFloat(data.hb || "0");
//   const hematocrito = parseFloat(data.hematocrito || "0");
//   const leucocitos = parseFloat(data.leucocitos || "0");

//   if (hb < 12) recomendacion += "Hemoglobina baja, posible anemia. ";
//   if (hb > 16) recomendacion += "Hemoglobina alta, posible deshidratación. ";
//   if (hematocrito < 40) recomendacion += "Hematocrito bajo, posible anemia. ";
//   if (hematocrito > 52)
//     recomendacion += "Hematocrito alto, posible deshidratación. ";
//   if (leucocitos < 4000)
//     recomendacion += "Leucocitos bajos, posible infección viral. ";
//   if (leucocitos > 11000)
//     recomendacion += "Leucocitos altos, posible infección bacteriana. ";

//   return recomendacion || "Resultados normales.";
// };

// const generarRecomendacionesPresionArterial = (
//   data: Partial<PresionArterial>
// ): string => {
//   const sistolica = parseFloat(data.sistolica || "0");
//   const diastolica = parseFloat(data.diastolica || "0");

//   if (sistolica > 140 || diastolica > 90) return "Posible hipertensión.";
//   if (sistolica < 90 || diastolica < 60) return "Posible hipotensión.";
//   return "Presión arterial normal.";
// };

// // Mismo patrón para las otras recomendaciones
// export const useExamenStore = create<EstadoExamenes>((set) => ({
//   hemograma: {
//     hb: "",
//     hematocrito: "",
//     leucocitos: "",
//     recomendaciones: "",
//   },
//   presionArterial: {
//     sistolica: "",
//     diastolica: "",
//     recomendaciones: "",
//   },
//   glicemia: {
//     ayuno: "",
//     postprandial: "",
//     hemoglobinaGlicosilada: "",
//     recomendaciones: "",
//   },
//   coprologico: {
//     colorHeces: "",
//     consistencia: "",
//     ph: "",
//     sangreOculta: "",
//     parasitos: "",
//     leucocitos: "",
//     eritrocitos: "",
//     grasaFecal: "",
//     recomendaciones: "",
//   },
//   uroanalisis: {
//     aspecto: "",
//     color: "",
//     densidad: "",
//     ph: "",
//     proteinas: "",
//     glucosa: "",
//     cetona: "",
//     bilirrubina: "",
//     urobilinogeno: "",
//     sedimento: {
//       globulosRojos: "",
//       globulosBlancos: "",
//       cilindros: "",
//     },
//     recomendaciones: "",
//   },
//   electrolitos: {
//     sodio: "",
//     cloro: "",
//     recomendaciones: "",
//   },
//   creatinina: {
//     nivel: "",
//     recomendaciones: "",
//   },
//   perfilTiroideo: {
//     tsh: "",
//     t3: "",
//     t4Libre: "",
//     recomendaciones: "",
//   },
//   perfilLipidico: {
//     trigliceridos: "",
//     colesterol: "",
//     hdl: "",
//     ldl: "",
//     recomendaciones: "",
//   },

//   actualizarHemograma: (data) =>
//     set((state) => ({
//       hemograma: {
//         ...state.hemograma,
//         ...data,
//         recomendaciones: generarRecomendacionesHemograma(data),
//       },
//     })),

//   actualizarPresionArterial: (data) =>
//     set((state) => ({
//       presionArterial: {
//         ...state.presionArterial,
//         ...data,
//         recomendaciones: generarRecomendacionesPresionArterial(data),
//       },
//     })),

//   actualizarGlicemia: (data) =>
//     set((state) => ({
//       glicemia: {
//         ...state.glicemia,
//         ...data,
//         recomendaciones:
//           parseFloat(data.ayuno || "0") > 110
//             ? "Nivel de glicemia en ayuno alto, posible diabetes."
//             : "Nivel de glicemia normal.",
//       },
//     })),

//   actualizarCoprologico: (data) =>
//     set((state) => ({
//       coprologico: {
//         ...state.coprologico,
//         ...data,
//         recomendaciones:
//           data.colorHeces !== "Marrón"
//             ? "Color de heces anormal."
//             : "Resultados normales.",
//       },
//     })),

//   actualizarUroanalisis: (data) =>
//     set((state) => ({
//       uroanalisis: {
//         ...state.uroanalisis,
//         ...data,
//         recomendaciones:
//           data.color !== "Amarillo claro"
//             ? "Color de orina anormal."
//             : "Resultados normales.",
//       },
//     })),

//   actualizarElectrolitos: (data) =>
//     set((state) => ({
//       electrolitos: {
//         ...state.electrolitos,
//         ...data,
//         recomendaciones:
//           parseFloat(data.sodio || "0") < 135
//             ? "Niveles bajos de sodio."
//             : parseFloat(data.sodio || "0") > 145
//             ? "Niveles altos de sodio."
//             : "Niveles de sodio normales.",
//       },
//     })),

//   actualizarCreatinina: (data) =>
//     set((state) => ({
//       creatinina: {
//         ...state.creatinina,
//         ...data,
//         recomendaciones:
//           parseFloat(data.nivel || "0") > 1.2
//             ? "Niveles altos de creatinina, posible fallo renal."
//             : "Niveles normales de creatinina.",
//       },
//     })),

//   actualizarPerfilTiroideo: (data) =>
//     set((state) => ({
//       perfilTiroideo: {
//         ...state.perfilTiroideo,
//         ...data,
//         recomendaciones:
//           parseFloat(data.tsh || "0") > 4.0
//             ? "TSH alta, posible hipotiroidismo."
//             : "TSH normal.",
//       },
//     })),

//   actualizarPerfilLipidico: (data) =>
//     set((state) => ({
//       perfilLipidico: {
//         ...state.perfilLipidico,
//         ...data,
//         recomendaciones:
//           parseFloat(data.trigliceridos || "0") > 150
//             ? "Triglicéridos altos."
//             : "Triglicéridos normales.",
//       },
//     })),
// }));
