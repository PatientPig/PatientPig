import React, { FC } from "react";
import { View, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";

import { RootStackScreenProps } from "@src/types/navigation";
import CoinBank from "@src/components/CoinBank";
import CoinButton from "@src/components/CoinButton";
import Text from "@src/components/Text";

const HomeScreen: FC<RootStackScreenProps<"Home">> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => {
            navigation.navigate("Leaderboard");
          }}
        >
          <Text style={{ fontSize: 25 }}>리더보드</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => {
            navigation.navigate("ItemList");
          }}
        >
          <Text style={{ fontSize: 25 }}>인내목록</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
        <CoinBank />
      </View>
      <View style={styles.footer}>
        <CoinButton />
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
    justifyContent: "center",
    flexDirection: "row",
  },
  headerButton: {
    marginHorizontal: 20,
    paddingHorizontal: 10,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: "black",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  body: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  footer: {
    marginVertical: 20,
  },
});

export default HomeScreen;
