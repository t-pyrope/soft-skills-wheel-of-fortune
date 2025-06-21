import AntDesign from "@expo/vector-icons/AntDesign";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";

export const CustomSelect = ({
  options,
  label,
  value,
  onSelect,
}: {
  options: { label: string; value: number }[];
  label: string;
  value: string | number;
  onSelect: (newVal: string | number) => void;
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const selectedLabel =
    options.find((option) => option.value === value)?.label ?? "";

  const handleSelect = (value: number | string) => {
    onSelect(value);
    setModalVisible(false);
  };

  return (
    <View>
      <ThemedText style={styles.label}>{label}:</ThemedText>

      <TouchableOpacity
        style={styles.selectBox}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.selectText}>{selectedLabel}</Text>
        <AntDesign name="down" size={20} color="black" />
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setModalVisible(false)}
          activeOpacity={1}
        >
          <View style={styles.modalContent}>
            {options.map((item) => (
              <TouchableOpacity
                key={item.value}
                style={styles.option}
                onPress={() => handleSelect(item.value)}
              >
                <Text style={styles.optionText}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    marginBottom: 6,
  },
  selectBox: {
    borderWidth: 1,
    borderColor: Colors.light.lightGray,
    padding: 12,
    paddingRight: 16,
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  selectText: {
    fontSize: 16,
    color: "#333",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "#00000088",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 10,
    width: "70%",
    paddingVertical: 10,
    elevation: 5,
  },
  option: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  optionText: {
    fontSize: 16,
  },
});
