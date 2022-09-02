import React, { FC } from "react";
import { View, Button, StyleSheet, TouchableOpacity, SafeAreaView, Text } from "react-native";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from "react-native-reanimated";

import { RootStackScreenProps } from "@src/types/navigation";

const HomeScreen: FC<RootStackScreenProps<"Home">> = ({ navigation }) => {
  const randomWidth = useSharedValue(10);

  const config = {
    duration: 500,
    easing: Easing.bezier(0.5, 0.01, 0, 1),
  };

  const style = useAnimatedStyle(() => {
    return {
      width: withTiming(randomWidth.value, config),
    };
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate("Leaderboard");
          }}>
          <Text style={{ fontFamily: "DungGeunMo", fontSize: 30 }}>리더보드</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}>
        <Animated.View
          style={[{ width: 100, height: 80, backgroundColor: "black", margin: 30 }, style]}
        />
        <Button
          title="toggle"
          onPress={() => {
            randomWidth.value = Math.random() * 350;
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    marginTop: 30,
    alignItems: "center",
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: "black",
  },
});

export default HomeScreen;
