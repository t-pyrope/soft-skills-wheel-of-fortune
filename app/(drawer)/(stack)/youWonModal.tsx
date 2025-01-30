import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAppContext } from "@/contexts/AppContext";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { i18n } from "@/i18n/config";
import { app } from "@/firebaseConfig";
import { Task } from "@/types/Task";
import { DEFINITIONS } from "@/constants/softSkills";

const db = getFirestore(app);

export default function YouWonModal() {
  const [task, setTask] = useState<Task | null>(null);
  const { prize } = useAppContext();

  useEffect(() => {
    const fetchRandomDoc = async () => {
      const q = query(collection(db, "tasks"), where("parentId", "==", prize));

      try {
        const querySnapshot = await getDocs(q);
        const savedTasksJSON =
          (await AsyncStorage.getItem("savedTasks")) ?? "[]";
        const savedTasks = JSON.parse(savedTasksJSON);

        const docs = querySnapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() })) // Получаем массив документов
          .filter((doc) => !savedTasks.includes(doc.id));

        if (docs.length === 0) {
          setTask(null);
        } else {
          const randomIndex = Math.floor(Math.random() * docs.length);
          const newTask = docs[randomIndex] as Task;
          const newSavedTasks = [...savedTasks, newTask.id];
          await AsyncStorage.setItem(
            "savedTasks",
            JSON.stringify(newSavedTasks),
          );
          setTask(newTask);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchRandomDoc();
  }, [prize]);

  return (
    <SafeAreaView style={styles.container}>
      {prize !== null ? (
        <ThemedText style={styles.prizeText}>
          {i18n.t("wheel.youWon", { skill: DEFINITIONS[prize].title })}
        </ThemedText>
      ) : null}
      <ThemedText type="subtitle">{task?.text?.ru}</ThemedText>
      <ThemedText>Задание будет добавлено в ваш список заданий</ThemedText>
      <ThemedView style={styles.buttonsContainer}>
        <TouchableOpacity style={[styles.button, styles.doneButton]}>
          <Ionicons name="checkmark-circle" size={32} color="white" />
          <ThemedText>Отметить как сделанное</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.closeButton]}>
          <ThemedText>Закрыть</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    gap: 20,
  },
  prizeText: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    height: 50,
    textAlign: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    gap: 20,
    backgroundColor: "transparent",
  },
  button: {
    borderRadius: 15,
    paddingBlock: 5,
    paddingInline: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  doneButton: {
    backgroundColor: "#06cc2b",
  },
  closeButton: {
    borderWidth: 2,
    borderColor: "#06cc2b",
  },
});
