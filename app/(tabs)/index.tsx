//app/(tabs)/index.tsx

import { AddTimerModal } from "@/components/AddTimerModal";
import { TimerList } from "@/components/TimerList";
import { useTimers } from "@/hooks/useTimers";
import { Plus } from "lucide-react-native";
import { useCallback, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";

export default function TimersScreen() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { timers, addTimer, updateTimer, deleteTimer } = useTimers();

  const handleAddTimer = useCallback(
    (timer) => {
      addTimer(timer);
      setIsModalVisible(false);
    },
    [addTimer]
  );

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <TimerList
          timers={timers}
          onUpdateTimer={updateTimer}
          onDeleteTimer={deleteTimer}
        />
      </ScrollView>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => setIsModalVisible(true)}
      >
        <Plus color="white" size={24} />
      </TouchableOpacity>

      <AddTimerModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onAdd={handleAddTimer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  scrollView: {
    flex: 1
  },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 20,
    backgroundColor: "#007AFF",
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4
  }
});
