import React, { FC } from "react";
import { View, StyleSheet, FlatList, ListRenderItem } from "react-native";
import { RootStackScreenProps } from "@src/types/navigation";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQuery } from "@tanstack/react-query";
import { getRanking } from "@src/apis/RankingApi";
import Text from "@src/components/Text";
import User from "@src/interface/User";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const LeaderboardScreen: FC<RootStackScreenProps<"Leaderboard">> = () => {
  const { isLoading, data: Ranking } = useQuery(["Ranking"], getRanking);
  const renderItem: ListRenderItem<User> = (info) => (
    <View style={styles.Container}>
      <View style={styles.nameBox}>
        <View style={{ ...styles.circle, top: 5, left: 5 }}></View>
        <View style={{ ...styles.circle, top: 5, right: 5 }}></View>
        <View style={{ ...styles.circle, bottom: 5, left: 5 }}></View>
        <View style={{ ...styles.circle, bottom: 5, right: 5 }}></View>
        <Text style={styles.nametext}>{info.item.id}</Text>
      </View>
      <View style={styles.scoreBox}>
        <Text style={styles.text}>{info.item.value}</Text>
      </View>
    </View>
  );
  if (isLoading) return <Text>Loading...</Text>;
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <MaterialCommunityIcons name="trophy" size={24} color="black" />
        <Text style={styles.title}>최강 꿀꿀이를 찾아라!</Text>
      </View>
      <FlatList data={Ranking} renderItem={renderItem} keyExtractor={(item, index) => item.id} />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  Container: {
    backgroundColor: "#FFCF72",
    borderRadius: 5,
    padding: 10,
    margin: 10,
    flexDirection: "row",
  },
  scoreBox: {
    backgroundColor: "#E4E4E4",
    padding: 10,
    borderRadius: 5,
    minWidth: "55%",
  },
  nameBox: {
    backgroundColor: "#DB5F6A",
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
    minWidth: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  nametext: {
    fontSize: 20,
    color: "white",
  },
  text: {
    fontSize: 30,
  },
  title: {
    fontSize: 30,
    textAlign: "center",
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  circle: {
    backgroundColor: "white",
    borderRadius: 12,
    width: 3,
    height: 3,
    position: "absolute",
  },
});
export default LeaderboardScreen;
