//app/(tabs)/history.tsx

import { useTimerHistory } from "@/hooks/useTimerHistory";
import { Calendar, Clock } from "lucide-react-native";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

export default function HistoryScreen() {
  const { history } = useTimerHistory();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Timer History</Text>
        <Text style={styles.subtitle}>Track your completed timers</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        {history.length === 0 ? (
          <View style={styles.emptyState}>
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1584208124218-0e1d62bfcb48?w=400&q=80"
              }}
              style={styles.emptyStateImage}
            />
            <Text style={styles.emptyStateText}>No completed timers yet</Text>
            <Text style={styles.emptyStateSubtext}>
              Complete a timer to see it here
            </Text>
          </View>
        ) : (
          history.map((item, index) => (
            <View key={index} style={styles.historyItem}>
              <View style={styles.itemHeader}>
                <View style={styles.categoryBadge}>
                  <Text style={styles.categoryText}>{item.category}</Text>
                </View>
                <Text style={styles.completionDate}>
                  {new Date(item.completionTime).toLocaleDateString()}
                </Text>
              </View>

              <Text style={styles.timerName}>{item.name}</Text>

              <View style={styles.details}>
                <View style={styles.detailItem}>
                  <Clock size={16} color="#666" />
                  <Text style={styles.detailText}>
                    {Math.floor(item.duration / 60)} minutes
                  </Text>
                </View>
                <View style={styles.detailItem}>
                  <Calendar size={16} color="#666" />
                  <Text style={styles.detailText}>
                    {new Date(item.completionTime).toLocaleTimeString()}
                  </Text>
                </View>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa"
  },
  header: {
    padding: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee"
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginBottom: 4
  },
  subtitle: {
    fontSize: 16,
    color: "#666"
  },
  scrollView: {
    flex: 1,
    padding: 16
  },
  emptyState: {
    alignItems: "center",
    padding: 40
  },
  emptyStateImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 24
  },
  emptyStateText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginBottom: 8
  },
  emptyStateSubtext: {
    fontSize: 16,
    color: "#666",
    textAlign: "center"
  },
  historyItem: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12
  },
  categoryBadge: {
    backgroundColor: "#e8f2ff",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8
  },
  categoryText: {
    color: "#007AFF",
    fontSize: 14,
    fontWeight: "600"
  },
  completionDate: {
    color: "#666",
    fontSize: 14
  },
  timerName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginBottom: 12
  },
  details: {
    flexDirection: "row",
    gap: 16
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6
  },
  detailText: {
    color: "#666",
    fontSize: 14
  }
});
