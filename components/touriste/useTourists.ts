import { touristService } from "@/services/touristService";
import { useCallback, useEffect, useState } from "react";
import { getTouristErrorMessage } from "./error";
import { Tourist, TouristInput } from "./types";

export function useTourists() {
  const [tourists, setTourists] = useState<Tourist[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const loadTourists = useCallback(async (refresh = false) => {
    if (refresh) setIsRefreshing(true);
    else setIsLoading(true);
    setErrorMessage(null);

    try {
      setTourists(await touristService.getAll());
    } catch (error) {
      setErrorMessage(getTouristErrorMessage(error));
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadTourists();
  }, [loadTourists]);

  const saveTourist = async (
    tourist: Tourist | null,
    touristData: TouristInput,
  ) => {
    if (!touristData.name || !touristData.email) {
      setErrorMessage("Le nom et l’email sont obligatoires.");
      return false;
    }

    setIsSaving(true);
    setErrorMessage(null);
    try {
      const savedTourist = tourist
        ? await touristService.update(tourist.id, touristData)
        : await touristService.create(touristData);

      setTourists((currentTourists) =>
        tourist
          ? currentTourists.map((currentTourist) =>
              currentTourist.id === savedTourist.id
                ? savedTourist
                : currentTourist,
            )
          : [savedTourist, ...currentTourists],
      );
      return true;
    } catch (error) {
      setErrorMessage(getTouristErrorMessage(error));
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  const deleteTourist = async (tourist: Tourist) => {
    try {
      await touristService.remove(tourist.id);
      setTourists((currentTourists) =>
        currentTourists.filter(
          (currentTourist) => currentTourist.id !== tourist.id,
        ),
      );
    } catch (error) {
      setErrorMessage(getTouristErrorMessage(error));
    }
  };

  return {
    tourists,
    isLoading,
    isRefreshing,
    isSaving,
    errorMessage,
    setErrorMessage,
    loadTourists,
    saveTourist,
    deleteTourist,
  };
}
