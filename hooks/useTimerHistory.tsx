import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

const HISTORY_STORAGE_KEY = "@timer_history";

type HistoryEntry = {
  name: string;
  category: string;
  duration: number;
  completionTime: string;
};

export function useTimerHistory() {
  const [history, setHistory] = useState<HistoryEntry[]>([]); // ✅ Explicitly typed state

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const stored = await AsyncStorage.getItem(HISTORY_STORAGE_KEY);
      if (stored) {
        setHistory(JSON.parse(stored) as HistoryEntry[]); // ✅ Cast to expected type
      }
    } catch (error) {
      console.error("Error loading history:", error);
    }
  };

  const addToHistory = async (timer: {
    name: string;
    category: string;
    duration: number;
  }) => {
    const historyEntry: HistoryEntry = {
      name: timer.name,
      category: timer.category,
      duration: timer.duration,
      completionTime: new Date().toISOString()
    };

    const newHistory = [...history, historyEntry];
    setHistory(newHistory);

    try {
      await AsyncStorage.setItem(
        HISTORY_STORAGE_KEY,
        JSON.stringify(newHistory)
      );
    } catch (error) {
      console.error("Error saving history:", error);
    }
  };

  return {
    history,
    addToHistory
  };
}
