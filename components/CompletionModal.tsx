import { Check } from "lucide-react-native";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export function CompletionModal({ timer, onClose }) {
  if (!timer) return null;

  return (
    <Modal
      visible={true}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <Check size={40} color="#34C759" />
          </View>

          <Text style={styles.congratsText}>Congratulations!</Text>
          <Text style={styles.timerName}>{timer.name}</Text>
          <Text style={styles.message}>
            You've completed your timer in the {timer.category} category.
          </Text>

          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    maxWidth: 400,
    alignItems: "center"
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#E8FAE8",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20
  },
  congratsText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#34C759",
    marginBottom: 8
  },
  timerName: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 12,
    textAlign: "center"
  },
  message: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 24
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    width: "100%"
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center"
  }
});
