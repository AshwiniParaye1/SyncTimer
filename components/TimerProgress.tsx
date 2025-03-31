//components/TimerProgress.tsx

import { StyleSheet, View } from "react-native";

export function TimerProgress({ current, total, completed }) {
  const progress = Math.max(0, Math.min(1, current / total));

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.progress,
          { width: `${progress * 100}%` },
          completed && styles.completedProgress
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 4,
    backgroundColor: "#e0e0e0",
    borderRadius: 2,
    overflow: "hidden"
  },
  progress: {
    height: "100%",
    backgroundColor: "#007AFF"
  },
  completedProgress: {
    backgroundColor: "#34C759"
  }
});
