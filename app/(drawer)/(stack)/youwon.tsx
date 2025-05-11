import Ionicons from "@expo/vector-icons/Ionicons";
import { router, useNavigationContainerRef } from "expo-router";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAppContext } from "@/contexts/AppContext";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { StarRating } from "@/components/Rating";
import { i18n } from "@/i18n/config";
import { app } from "@/firebaseConfig";
import { Task } from "@/types/Task";
import { DEFINITIONS } from "@/constants/softSkills";

const db = getFirestore(app);

export default function YouWon() {
  const [taskId, setTaskId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { prize, setOpenedTasks, openedTasks, setPrize, decreaseLimit, limit } =
    useAppContext();
  const navigationContainer = useNavigationContainerRef();
  const isNavigationReady = navigationContainer.isReady();

  const task = openedTasks.find((task) => task.id === taskId);

  useEffect(() => {
    const fetchRandomDoc = async () => {
      const q = query(collection(db, "tasks"), where("parentId", "==", prize));

      try {
        const querySnapshot = await getDocs(q);
        const savedTaskIds = openedTasks.map((task) => task.id);

        const docs = querySnapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() })) // Получаем массив документов
          .filter((doc) => !savedTaskIds.includes(doc.id));

        if (docs.length === 0) {
          setTaskId(null);
        } else {
          const randomIndex = Math.floor(Math.random() * docs.length);
          const newTask = {
            ...(docs[randomIndex] as Task),
            done: false,
            rating: 0,
            addedOn: Date.now(),
          };
          const newSavedTasks = [...openedTasks, newTask];
          await setOpenedTasks(newSavedTasks);
          setTaskId(newTask.id);
          decreaseLimit();
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (prize) {
      fetchRandomDoc();
    }
  }, [prize]);

  useEffect(() => {
    if (prize === null && isNavigationReady) {
      router.replace("/");
    }
  }, [prize, isNavigationReady]);

  useEffect(() => {
    return () => {
      setIsLoading(true);
      setTaskId(null);
      setPrize(null);
    };
  }, []);

  const handleToggleDone = async () => {
    if (!task) return;
    const newOpenedTasks = [
      ...openedTasks.filter((t) => t.id !== task.id),
      { ...task, done: !task.done },
    ];

    await setOpenedTasks(newOpenedTasks);
  };

  const handleSetRating = async (newRating: number) => {
    if (!task) return;

    const newOpenedTasks = [
      ...openedTasks.filter((t) => t.id !== task.id),
      { ...task, rating: newRating },
    ];

    await setOpenedTasks(newOpenedTasks);
  };

  const handleClose = () => {
    router.back();
  };

  if (isLoading || prize === null) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#3e14b1" />
      </SafeAreaView>
    );
  }

  if (!isLoading && taskId === null && prize) {
    return (
      <SafeAreaView style={styles.container}>
        <ThemedText>
          {i18n.t("wheel.noTask.noMoreTasks", {
            skill: DEFINITIONS[prize - 1].title,
          })}
        </ThemedText>
        <ThemedText>{i18n.t("wheel.noTask.tryLater")}</ThemedText>
        <TouchableOpacity
          style={[styles.button, styles.closeButton]}
          onPress={handleClose}
        >
          <ThemedText>{i18n.t("wheel.close")}</ThemedText>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ThemedText style={styles.prizeText}>
        {i18n.t("wheel.youWon", { skill: DEFINITIONS[prize - 1].title })}
      </ThemedText>
      <ThemedText type="subtitle">{task?.text[i18n.locale as "en"]}</ThemedText>
      <ThemedText>{i18n.t("wheel.taskWillBeAdded")}</ThemedText>
      <StarRating rating={task?.rating ?? 0} setRating={handleSetRating} />
      <ThemedView style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[styles.button, styles.doneButton]}
          onPress={handleToggleDone}
        >
          <Ionicons name="checkmark-circle" size={32} color="white" />
          <ThemedText>
            {task?.done
              ? i18n.t("wheel.unmarkAsDone")
              : i18n.t("wheel.markAsDone")}
          </ThemedText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.closeButton]}
          onPress={handleClose}
        >
          <ThemedText>{i18n.t("wheel.close")}</ThemedText>
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
    backgroundColor: "#bfbbec",
    gap: 10,
  },
  closeButton: {
    borderWidth: 2,
    borderColor: "#3e14b1",
  },
});
