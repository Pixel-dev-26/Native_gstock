import { isAxiosError } from "axios";

type ValidationError = {
  loc?: (string | number)[];
  msg?: string;
};

export function getTouristErrorMessage(error: unknown): string {
  if (!isAxiosError(error)) {
    return "Une erreur est survenue. Veuillez réessayer.";
  }

  if (error.code === "ERR_NETWORK") {
    return "Impossible de joindre le serveur. Vérifiez votre connexion.";
  }

  if (error.code === "ECONNABORTED" || error.code === "ETIMEDOUT") {
    return "Le serveur met trop de temps à répondre. Veuillez réessayer.";
  }

  const data = error.response?.data as
    | { message?: unknown; detail?: unknown }
    | undefined;

  if (typeof data?.message === "string") {
    return data.message;
  }

  if (typeof data?.detail === "string") {
    return data.detail;
  }

  if (Array.isArray(data?.detail)) {
    return (
      data.detail
        .map((item: ValidationError | string) => {
          if (typeof item === "string") return item;

          const field = item.loc?.at(-1);
          return field && item.msg ? `${field}: ${item.msg}` : item.msg;
        })
        .filter(Boolean)
        .join("\n") || "Les données envoyées sont invalides."
    );
  }

  if (error.response?.status === 422) {
    return "Les données envoyées sont invalides.";
  }

  return "Une erreur est survenue. Veuillez réessayer.";
}
