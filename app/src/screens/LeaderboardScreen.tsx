import React, { FC } from "react";
import { View, StyleSheet, FlatList, ListRenderItem, Image } from "react-native";
import { RootStackScreenProps } from "@src/types/navigation";
import { useQuery } from "@tanstack/react-query";
import { getRanking } from "@src/apis/RankingApi";
import Text from "@src/components/Text";
import User from "@src/interface/User";
import { SafeAreaView } from "react-native-safe-area-context";

const LeaderboardScreen: FC<RootStackScreenProps<"Leaderboard">> = () => {
  const { isLoading, data: Ranking } = useQuery<User[]>(["Ranking"], getRanking);
  const renderItem: ListRenderItem<User> = (info) => {
    if (info.index === 0) {
      return (
        <>
          <View style={styles.Container}>
            <View style={{ ...styles.rankingBox, backgroundColor: "#F71374" }}>
              <Text style={styles.nametext}>{info.index + 1}</Text>
            </View>
            <View style={styles.dataBox}>
              <Text style={styles.text}>{info.item.id}</Text>
              <Text style={{ ...styles.text, color: "#F71374" }}>{info.item.value}</Text>
            </View>
          </View>
        </>
      );
    }
    return (
      <>
        <View style={styles.Container}>
          <View style={styles.rankingBox}>
            <Text style={styles.nametext}>{info.index + 1}</Text>
          </View>
          <View style={styles.dataBox}>
            <Text style={styles.text}>{info.item.id}</Text>
            <Text style={styles.text}>{info.item.value}</Text>
          </View>
        </View>
      </>
    );
  };
  if (isLoading) return <Text>Loading...</Text>;
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text style={styles.title}>최강 꿀꿀이를 찾아라!</Text>
        <Image source={require("@assets/Ranking.png")} />
      </View>
      <FlatList data={Ranking} renderItem={renderItem} keyExtractor={(item, index) => item.id} />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  Container: {
    marginLeft: 10,
    marginRight: 10,
    flexDirection: "row",
    height: 60,
    marginBottom: 10,
  },
  section: {
    flex: 1,
  },
  dataBox: {
    backgroundColor: "#E4E4E4",
    padding: 10,
    flexDirection: "row",
    borderRadius: 15,
    justifyContent: "space-between",
    alignItems: "center",
    width: "75%",
  },
  rankingBox: {
    backgroundColor: "#8D8D8D",
    padding: 10,
    borderRadius: 15,
    marginRight: 10,
    width: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  nametext: {
    fontSize: 20,
    color: "white",
  },
  text: {
    fontSize: 20,
  },
  title: {
    margin: 15,
    fontSize: 30,
    color: "#5D5FDA",
    textAlign: "center",
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: -50,
  },
});
export default LeaderboardScreen;
