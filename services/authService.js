import { jwtDecode } from "jwt-decode";
import api from "./api";
import { storage } from "./storage";

const prefix = "/v1/auth";

const isTokenExpired = (token) => {
  try {
    const decoded = jwtDecode(token);
    return decoded.exp * 1000 < Date.now();
  } catch {
    return true;
  }
};

export const authService = {
  login: async (email, password) => {
    try {
      const response = await api.post(`${prefix}/login`, { email, password });

      // Extraction de l'access_token généré par FastAPI
      const { access_token } = response.data;

      // Sauvegarde sécurisée du token
      if (access_token) {
        await storage.saveToken(access_token);
      }

      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.detail ||
        "Erreur lors de la connexion. Veuillez réessayer.";
      throw new Error(errorMessage);
    }
  },

  logout: async () => {
    // Supprime le token localement lors de la déconnexion
    await storage.removeToken();
  },

  verifySession: async () => {
    const token = await storage.getToken();

    // 1. Vérification si le token existe et n'est pas expiré localement
    if (!token || isTokenExpired(token)) {
      await storage.removeToken();
      return null;
    }

    // 2. Validation auprès du serveur FastAPI
    try {
      // L'intercepteur Axios injecte automatiquement 'Authorization: Bearer <token>'
      const response = await api.get(`${prefix}/me`);
      return response.data; // Renvoie les infos de l'utilisateur
    } catch (error) {
      // Si le serveur renvoie 401 (token invalide/révoqué), on nettoie
      await storage.removeToken();
      return null;
    }
  },
};
