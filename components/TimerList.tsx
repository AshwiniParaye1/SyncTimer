//components/TimerList.tsx

import { useTimerHistory } from "@/hooks/useTimerHistory";
import {
  ChevronDown,
  ChevronRight,
  Pause,
  Play,
  RotateCcw
} from "lucide-react-native";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CompletionModal } from "./CompletionModal";
import { HalfwayAlert } from "./HalfwayAlert";
import { TimerProgress } from "./TimerProgress";

export function TimerList({ timers, onUpdateTimer, onDeleteTimer }) {
  const [expandedCategories, setExpandedCategories] = useState(new Set());
  const [completedTimer, setCompletedTimer] = useState(null);
  const [halfwayTimer, setHalfwayTimer] = useState(null);
  const { addToHistory } = useTimerHistory();

  const groupedTimers: Record<string, typeof timers> = timers.reduce(
    (acc: Record<string, typeof timers>, timer) => {
      if (!acc[timer.category]) {
        acc[timer.category] = [];
      }
      acc[timer.category].push(timer);
      return acc;
    },
    {}
  );

  const toggleCategory = (category) => {
    setExpandedCategories((current) => {
      const newSet = new Set(current);
      if (newSet.has(category)) {
        newSet.delete(category);
      } else {
        newSet.add(category);
      }
      return newSet;
    });
  };

  const handleAction = (timerId, action) => {
    const timer = timers.find((t) => t.id === timerId);
    if (!timer) return;

    switch (action) {
      case "start":
        onUpdateTimer({ ...timer, status: "running" });
        break;
      case "pause":
        onUpdateTimer({ ...timer, status: "paused" });
        break;
      case "reset":
        onUpdateTimer({
          ...timer,
          status: "paused",
          remainingTime: timer.duration
        });
        break;
      case "complete":
        onUpdateTimer({
          ...timer,
          status: "completed",
          remainingTime: 0
        });
        setCompletedTimer(timer);
        addToHistory(timer);
        break;
      case "halfway":
        if (timer.halfwayAlert) {
          setHalfwayTimer(timer);
        }
        break;
    }
  };

  const checkTimerStatus = (timer) => {
    if (timer.status === "running") {
      if (timer.remainingTime <= 0) {
        handleAction(timer.id, "complete");
      } else if (
        timer.halfwayAlert &&
        timer.remainingTime === Math.floor(timer.duration / 2)
      ) {
        handleAction(timer.id, "halfway");
      }
    }
  };

  return (
    <View style={styles.container}>
      {Object.entries(groupedTimers).map(([category, categoryTimers]) => (
        <View key={category} style={styles.categorySection}>
          <TouchableOpacity
            style={styles.categoryHeader}
            onPress={() => toggleCategory(category)}
          >
            <View style={styles.categoryTitleContainer}>
              {expandedCategories.has(category) ? (
                <ChevronDown size={20} color="#007AFF" />
              ) : (
                <ChevronRight size={20} color="#007AFF" />
              )}
              <Text style={styles.categoryTitle}>{category}</Text>
            </View>
            <View style={styles.categoryActions}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() =>
                  categoryTimers.forEach((timer) =>
                    handleAction(timer.id, "start")
                  )
                }
              >
                <Play size={16} color="#007AFF" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() =>
                  categoryTimers.forEach((timer) =>
                    handleAction(timer.id, "pause")
                  )
                }
              >
                <Pause size={16} color="#007AFF" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() =>
                  categoryTimers.forEach((timer) =>
                    handleAction(timer.id, "reset")
                  )
                }
              >
                <RotateCcw size={16} color="#007AFF" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>

          {expandedCategories.has(category) &&
            categoryTimers.map((timer) => {
              checkTimerStatus(timer);
              return (
                <View
                  key={timer.id}
                  style={[
                    styles.timerItem,
                    timer.status === "completed" && styles.completedTimer
                  ]}
                >
                  <View style={styles.timerInfo}>
                    <Text
                      style={[
                        styles.timerName,
                        timer.status === "completed" && styles.completedText
                      ]}
                    >
                      {timer.name}
                    </Text>
                    <Text
                      style={[
                        styles.timerTime,
                        timer.status === "completed" && styles.completedText
                      ]}
                    >
                      {Math.floor(timer.remainingTime / 60)}:
                      {String(timer.remainingTime % 60).padStart(2, "0")}
                    </Text>
                  </View>

                  <TimerProgress
                    current={timer.remainingTime}
                    total={timer.duration}
                    completed={timer.status === "completed"}
                  />

                  <View style={styles.timerActions}>
                    {timer.status !== "completed" && (
                      <>
                        {timer.status !== "running" ? (
                          <TouchableOpacity
                            onPress={() => handleAction(timer.id, "start")}
                            style={styles.actionButton}
                          >
                            <Play size={20} color="#007AFF" />
                          </TouchableOpacity>
                        ) : (
                          <TouchableOpacity
                            onPress={() => handleAction(timer.id, "pause")}
                            style={styles.actionButton}
                          >
                            <Pause size={20} color="#007AFF" />
                          </TouchableOpacity>
                        )}
                        <TouchableOpacity
                          onPress={() => handleAction(timer.id, "reset")}
                          style={styles.actionButton}
                        >
                          <RotateCcw size={20} color="#007AFF" />
                        </TouchableOpacity>
                      </>
                    )}
                  </View>
                </View>
              );
            })}
        </View>
      ))}

      <CompletionModal
        timer={completedTimer}
        onClose={() => setCompletedTimer(null)}
      />

      <HalfwayAlert
        timer={halfwayTimer}
        onClose={() => setHalfwayTimer(null)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16
  },
  categorySection: {
    marginBottom: 24,
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  categoryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f8f9fa"
  },
  categoryTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: "bold"
  },
  categoryActions: {
    flexDirection: "row",
    gap: 8
  },
  timerItem: {
    backgroundColor: "#fff",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0"
  },
  completedTimer: {
    backgroundColor: "#f8f8f8"
  },
  timerInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8
  },
  timerName: {
    fontSize: 16,
    fontWeight: "600"
  },
  completedText: {
    color: "#888",
    textDecorationLine: "line-through"
  },
  timerTime: {
    fontSize: 16,
    fontWeight: "600",
    color: "#007AFF"
  },
  timerActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 8,
    marginTop: 8
  },
  actionButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2
  }
});
