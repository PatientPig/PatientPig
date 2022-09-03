import React, { FC } from "react";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";

const BackButton: FC = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      activeOpacity={1}
      hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
      onPress={() => {
        if (navigation.canGoBack()) {
          navigation.goBack();
        }
      }}
    >
      <MaterialIcons name="arrow-back-ios" size={24} color="black" />
    </TouchableOpacity>
  );
};

export default BackButton;
