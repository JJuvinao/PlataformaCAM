import { RolUsuario, User } from "../domain/entities/user.entities";

const API_URL = "https://bd-plataforma-cam.onrender.com";

export interface LoginResponse {
  access_token: string;
  token_type: string;
  usuario: User;
  roles: string;
}

export const registerUser = async (
  tipoDocumento: string,
  numeroDocumento: string,
  nombres: string,
  apellidos: string,
  telefono: string,
  correo: string,
  password: string,
  roles: RolUsuario
): Promise<string | null> => {
  try {
    const response = await fetch(`${API_URL}/usuarios/registro`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "accept": "application/json",
      },
      body: JSON.stringify({
        tipoDocumento,
        numeroDocumento,
        nombres,
        apellidos,
        telefono,
        correo,
        password,
        roles,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Error al registrar usuario");
    }

    const data = await response.json();
    return data.id || data.numeroDocumento;
  } catch (error: any) {
    console.log("Error en registro:", error);
    throw error;
  }
};

export const login = async (
  correo: string,
  password: string
): Promise<LoginResponse> => {
  try {
    const response = await fetch(`${API_URL}/usuarios/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "accept": "application/json",
      },
      body: JSON.stringify({
        correo,
        password,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.detail || "El correo o contraseña no son válidos."
      );
    }

    const data: LoginResponse = await response.json();
    return data;
  } catch (error: any) {
    console.log("Error en login:", error);
    throw error;
  }
};

export const resetPassword = async (email: string): Promise<void> => {
  throw new Error("Reset password not implemented. Contact your administrator.");
};

export const logout = async (): Promise<void> => {
  // Clear local session
  // If you have an API logout endpoint, call it here
  console.log("Usuario desconectado");
};

export const onAuthStateChangedListener = (
  callback: (user: any | null) => void
): (() => void) => {
  throw new Error("Auth state listener not implemented.");
};
