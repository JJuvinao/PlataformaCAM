import { User, UserRegisro } from "../domain/entities/user.entities";
import { useAuthStore } from "../presentation/store/useAuthStore";

const API_URL = "https://bd-plataforma-cam.onrender.com";

// Función para limpiar token
const cleanToken = (token: string | null): string => {
  if (!token) return "";
  return token.replace(/[^\x00-\x7F]/g, "").trim();
};

export async function crearUsuario(usuario: UserRegisro): Promise<void> {
  try {
    const response = await fetch(`${API_URL}/usuarios`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuario),
    });

    if (!response.ok) {
      throw new Error("Error al crear usuario");
    }
  } catch (error) {
    console.error("Error al crear usuario:", error);
    throw error;
  }
}

export async function crearUsuarioYAutenticacion(
  usuario: User,
  password: string
): Promise<void> {
  try {
    const usuarioConPassword = { ...usuario, password };
    const response = await fetch(`${API_URL}/usuarios/registro`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuarioConPassword),
    });

    if (!response.ok) {
      throw new Error("Error al crear usuario");
    }
  } catch (error) {
    console.error("Error al crear usuario:", error);
    throw error;
  }
}

export const fetchUsuarioPorDocumento = async (
  numeroDocumento: string
): Promise<UserRegisro> => {
  try {
    const token = useAuthStore.getState().accessToken;
    
    if (!token) {
      throw new Error("No hay sesión activa. Por favor, inicie sesión nuevamente.");
    }

    if (!numeroDocumento || numeroDocumento.trim() === "") {
      throw new Error("El número de documento es requerido");
    }

    const cleanTokenValue = cleanToken(token);
    
    if (!cleanTokenValue) {
      throw new Error("Token inválido. Por favor, inicie sesión nuevamente.");
    }

    const response = await fetch(`${API_URL}/usuarios/mi-documento/${numeroDocumento}`, {
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
    console.error("Error en fetchUsuarioPorDocumento:", error);
    throw error;
  }
};

export async function actualizarUsuario(
  userId: string,
  newData: Partial<User>
): Promise<void> {
  try {
    const response = await fetch(`${API_URL}/usuarios/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    });

    if (!response.ok) {
      throw new Error("Usuario no encontrado");
    }
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    throw error;
  }
}
