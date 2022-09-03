import React, { FC } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";

import SafeAreaView from "@src/components/SafeAreaView";
import { RootStackScreenProps } from "@src/types/navigation";
import CoinBank from "@src/components/CoinBank";
import CoinButton from "@src/components/CoinButton";
import SignBoard from "@src/components/SignBoard";
import ScoreBoard from "@src/components/ScoreBoard";
import Text from "@src/components/Text";

const HomeScreen: FC<RootStackScreenProps<"Home">> = ({ navigation }) => {
  return (
    <SafeAreaView>
      <SignBoard style={styles.signBoard} />
      <ScoreBoard style={styles.scoreBoard} />
      <View style={styles.body}>
        <CoinBank />
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate("Leaderboard");
            }}
          >
            <MaterialIcons name="leaderboard" size={24} color="#9D9FFF" />
            <Text style={styles.buttonText}>리더보드</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { marginLeft: 14 }]}
            onPress={() => {
              navigation.navigate("ItemList");
            }}
          >
            <MaterialCommunityIcons name="archive-check-outline" size={24} color="#9D9FFF" />
            <Text style={styles.buttonText}>인내목록</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.footer}>
        <CoinButton />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  signBoard: {
    marginTop: 30,
  },
  scoreBoard: {
    marginTop: 22,
  },
  actions: {
    flexDirection: "row",
    marginTop: 40,
  },
  button: {
    paddingLeft: 10,
    paddingVertical: 10,
    backgroundColor: "#5D5FDA",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    marginLeft: 10,
    color: "white",
    minWidth: 86,
  },
  body: {
    paddingTop: 30,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  footer: {
    marginVertical: 20,
  },
});

export default HomeScreen;
