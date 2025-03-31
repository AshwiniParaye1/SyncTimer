//components/AddTimerModal.tsx

import { useState } from "react";
import {
  Modal,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from "react-native";

export function AddTimerModal({ visible, onClose, onAdd }) {
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [category, setCategory] = useState("");
  const [halfwayAlert, setHalfwayAlert] = useState(false);

  const handleAdd = () => {
    if (!name || !duration || !category) return;

    onAdd({
      id: Date.now().toString(),
      name,
      duration: parseInt(duration, 10),
      remainingTime: parseInt(duration, 10),
      category,
      status: "paused",
      halfwayAlert
    });

    setName("");
    setDuration("");
    setCategory("");
    setHalfwayAlert(false);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.content}>
              <Text style={styles.title}>Add New Timer</Text>

              <TextInput
                style={styles.input}
                placeholder="Timer Name"
                value={name}
                onChangeText={setName}
                placeholderTextColor="#999"
              />

              <TextInput
                style={styles.input}
                placeholder="Duration (seconds)"
                value={duration}
                onChangeText={(text) => {
                  if (/^\d*$/.test(text)) {
                    setDuration(text);
                  }
                }}
                keyboardType="numeric"
                placeholderTextColor="#999"
              />

              <TextInput
                style={styles.input}
                placeholder="Category"
                value={category}
                onChangeText={setCategory}
                placeholderTextColor="#999"
              />

              <View style={styles.alertContainer}>
                <Text style={styles.alertText}>Enable halfway alert</Text>
                <Switch
                  value={halfwayAlert}
                  onValueChange={setHalfwayAlert}
                  trackColor={{ false: "#ddd", true: "#007AFF" }}
                />
              </View>

              <View style={styles.buttons}>
                <TouchableOpacity
                  style={[styles.button, styles.cancelButton]}
                  onPress={onClose}
                >
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.button, styles.addButton]}
                  onPress={handleAdd}
                >
                  <Text style={[styles.buttonText, styles.addButtonText]}>
                    Add Timer
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center"
  },
  content: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 24,
    width: "90%",
    maxWidth: 400
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#1a1a1a"
  },
  input: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: "#f8f9fa",
    color: "#1a1a1a"
  },
  alertContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
    paddingHorizontal: 4
  },
  alertText: {
    fontSize: 16,
    color: "#1a1a1a"
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12
  },
  button: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: "center"
  },
  cancelButton: {
    backgroundColor: "#f1f3f5"
  },
  addButton: {
    backgroundColor: "#007AFF"
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a1a"
  },
  addButtonText: {
    color: "white"
  }
});
