import { useAuthStore } from "../presentation/store/useAuthStore";
// Configuración de la API
const API_URL = "https://bd-plataforma-cam.onrender.com"; 

// Función para limpiar token
const cleanToken = (token: string | null): string => {
  if (!token) return "";
  return token.replace(/[^\x00-\x7F]/g, "").trim();
};

// Interface para los exámenes
export interface ExamenResponse {
  id: string;
  identificacion: string;
  usuario_id: number;
  fecha_examen: string | null;
  fecha_registro: string;
  hemograma: any;
  presionArterial: any;
  glicemia: any;
  coprologico: any;
  uroanalisis: any;
  electrolitos: any;
  perfilTiroideo: any;
  perfilLipidico: any;
}

// Interface para crear examen
export interface CrearExamenRequest {
  identificacion: string;
  hemograma?: any;
  presionArterial?: any;
  glicemia?: any;
  coprologico?: any;
  uroanalisis?: any;
  electrolitos?: any;
  perfilTiroideo?: any;
  perfilLipidico?: any;
}

/**
 * Obtiene todos los exámenes del usuario autenticado
 */
export const fetchMisExamenes = async (): Promise<ExamenResponse[]> => {
  try {
    const token = useAuthStore.getState().accessToken;
    
    if (!token) {
      throw new Error("No hay sesión activa. Por favor, inicie sesión nuevamente.");
    }

    const cleanTokenValue = cleanToken(token);
    
    if (!cleanTokenValue) {
      throw new Error("Token inválido. Por favor, inicie sesión nuevamente.");
    }

    const response = await fetch(`${API_URL}/examenes/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${cleanTokenValue}`,
      },
    });

    if (!response.ok) {
      let errorMessage = `Error ${response.status}: ${response.statusText}`;
      try {
        const errorData = await response.json();
        errorMessage = errorData.detail || errorMessage;
      } catch (e) {
        // Si no se puede parsear, usar mensaje por defecto
      }
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en fetchMisExamenes:", error);
    throw error;
  }
};

/**
 * Obtiene exámenes por identificación del paciente
 */
export const fetchExamenesPorIdentificacion = async (
  identificacion: string
): Promise<ExamenResponse[]> => {
  try {
    const token = useAuthStore.getState().accessToken;
    
    if (!token) {
      throw new Error("No hay sesión activa. Por favor, inicie sesión nuevamente.");
    }

    if (!identificacion || identificacion.trim() === "") {
      throw new Error("La identificación del paciente es requerida");
    }

    const cleanTokenValue = cleanToken(token);
    
    if (!cleanTokenValue) {
      throw new Error("Token inválido. Por favor, inicie sesión nuevamente.");
    }

    const response = await fetch(`${API_URL}/examenes/paciente/${identificacion}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${cleanTokenValue}`,
      },
    });

    if (!response.ok) {
      let errorMessage = `Error ${response.status}: ${response.statusText}`;
      try {
        const errorData = await response.json();
        errorMessage = errorData.detail || errorMessage;
      } catch (e) {
      }
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("❌ Error en fetchExamenesPorIdentificacion:", error);
    throw error;
  }
};

/**
 * Crea un nuevo examen
 */
export const crearExamen = async (
  examenData: CrearExamenRequest
): Promise<ExamenResponse> => {
  try {
    const token = useAuthStore.getState().accessToken;
    
    if (!token) {
      throw new Error("No hay sesión activa. Por favor, inicie sesión nuevamente.");
    }

    const cleanTokenValue = cleanToken(token);
    
    if (!cleanTokenValue) {
      throw new Error("Token inválido. Por favor, inicie sesión nuevamente.");
    }

    const response = await fetch(`${API_URL}/examenes/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${cleanTokenValue}`,
      },
      body: JSON.stringify(examenData),
    });

    if (!response.ok) {
      let errorMessage = `Error ${response.status}: ${response.statusText}`;
      try {
        const errorData = await response.json();
        errorMessage = errorData.detail || errorMessage;
      } catch (e) {
        // Si no se puede parsear, usar mensaje por defecto
      }
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en crearExamen:", error);
    throw error;
  }
};