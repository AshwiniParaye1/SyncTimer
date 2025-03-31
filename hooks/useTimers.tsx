import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

const TIMERS_STORAGE_KEY = "@timers";

type Timer = {
  id: string;
  name: string;
  duration: number;
  remainingTime: number;
  category: string;
  status: "running" | "paused" | "completed";
};

export function useTimers() {
  const [timers, setTimers] = useState<Timer[]>([]); // ✅ Explicitly typed state

  useEffect(() => {
    loadTimers();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimers((currentTimers) =>
        currentTimers.map((timer) => {
          if (timer.status !== "running") return timer;

          const newRemainingTime = Math.max(0, timer.remainingTime - 1);
          if (newRemainingTime === 0) {
            return { ...timer, status: "completed" };
          }

          return { ...timer, remainingTime: newRemainingTime };
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    saveTimers(timers);
  }, [timers]);

  const loadTimers = async () => {
    try {
      const stored = await AsyncStorage.getItem(TIMERS_STORAGE_KEY);
      if (stored) {
        setTimers(JSON.parse(stored) as Timer[]); // ✅ Cast to expected type
      }
    } catch (error) {
      console.error("Error loading timers:", error);
    }
  };

  const saveTimers = async (timers: Timer[]) => {
    try {
      await AsyncStorage.setItem(TIMERS_STORAGE_KEY, JSON.stringify(timers));
    } catch (error) {
      console.error("Error saving timers:", error);
    }
  };

  const addTimer = (timer: Timer) => {
    setTimers((current) => [...current, timer]);
  };

  const updateTimer = (updatedTimer: Timer) => {
    setTimers((current) =>
      current.map((timer) =>
        timer.id === updatedTimer.id ? updatedTimer : timer
      )
    );
  };

  const deleteTimer = (timerId: string) => {
    setTimers((current) => current.filter((timer) => timer.id !== timerId));
  };

  return {
    timers,
    addTimer,
    updateTimer,
    deleteTimer
  };
}
