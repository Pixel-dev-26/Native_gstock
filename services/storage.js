import * as SecureStore from "expo-secure-store";

const TOKEN_KEY = "user_token";

export const storage = {
  // Enregistrer le token
  saveToken: async (token) => {
    try {
      await SecureStore.setItemAsync(TOKEN_KEY, token);
    } catch (error) {
      console.error("Erreur lors de la sauvegarde du token :", error);
    }
  },

  // Récupérer le token
  getToken: async () => {
    try {
      return await SecureStore.getItemAsync(TOKEN_KEY);
    } catch (error) {
      console.error("Erreur lors de la récupération du token :", error);
      return null;
    }
  },

  // Supprimer le token (ex: déconnexion)
  removeToken: async () => {
    try {
      await SecureStore.deleteItemAsync(TOKEN_KEY);
    } catch (error) {
      console.error("Erreur lors de la suppression du token :", error);
    }
  },
};
