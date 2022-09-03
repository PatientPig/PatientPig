import React, { FC } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  ListRenderItem,
  Image,
  StatusBar,
  SafeAreaView,
} from "react-native";

import Text from "@src/components/Text";
import { RootStackScreenProps } from "@src/types/navigation";
import User from "@src/interface/User";
import useRanking from "@src/query/useRanking";
import useAuthUserId from "@src/hooks/useAuthUserId";
import Loader from "@src/components/Loader";

const LeaderboardScreen: FC<RootStackScreenProps<"Leaderboard">> = () => {
  const { isLoading, data: users } = useRanking();
  const authUserId = useAuthUserId();

  const renderItem: ListRenderItem<User> = ({ index, item }) => {
    const isFirstItem = index === 0;

    return (
      <View style={styles.Container}>
        <View style={[styles.rankingBox, isFirstItem && { backgroundColor: "#F71374" }]}>
          <Text style={styles.nametext}>{index + 1}</Text>
        </View>
        <View style={styles.dataBox}>
          <Text style={styles.text}>{`${item.id}${authUserId === item.id ? "(나)" : ""}`}</Text>
          <Text style={[styles.text, isFirstItem && { color: "#F71374" }]}>{item.value}</Text>
        </View>
      </View>
    );
  };

  if (isLoading) {
    return (
      <Loader style={{ backgroundColor: "white" }}>
        <Text style={{ fontSize: 30 }}>Loading...</Text>
      </Loader>
    );
  }

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <FlatList
          data={users}
          renderItem={renderItem}
          keyExtractor={(item, index) => item.id}
          ListHeaderComponent={
            <View style={styles.header}>
              <Text style={styles.title}>최강 꿀꿀이를 찾아라!</Text>
              <Image source={require("@assets/Ranking.png")} />
            </View>
          }
        />
      </SafeAreaView>
    </>
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
