import React, { FC } from "react";
import { SafeAreaView, StyleSheet, View, FlatList, ListRenderItem } from "react-native";
import { RootStackScreenProps } from "@src/types/navigation";
import { AntDesign } from "@expo/vector-icons";
import Swipeable from "react-native-gesture-handler/Swipeable";

import Text from "@src/components/Text";
import Item from "@src/interface/Item";
import useItems from "@src/query/useItems";

const ItemListScreen: FC<RootStackScreenProps<"ItemList">> = () => {
  const { data: items, isLoading } = useItems();
  function numberWithCommas(x: string): string {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  const renderItem: ListRenderItem<Item> = ({ item }) => {
    const commasNumber = numberWithCommas(String(item.value));
    return (
      <Swipeable>
        <View style={styles.container}>
          <View style={styles.item}>
            <AntDesign name="like2" size={24} color="black" />
            <Text style={{ fontSize: 20, marginLeft: 10 }}>{item.desc}</Text>
          </View>
          <Text style={styles.value}>{commasNumber}P</Text>
        </View>
      </Swipeable>
    );
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={styles.loading}>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={{ fontSize: 30, color: "#5D5FDA" }}>잘 참았다 꿀!</Text>
      </View>
      <FlatList
        style={styles.ItemContainer}
        data={items}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.desc}
      ></FlatList>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-evenly",
    marginBottom: 20,
  },
  value: {
    backgroundColor: "#F71374",
    color: "white",
    width: "25%",
    textAlign: "center",
    borderRadius: 10,
    padding: 15,
    fontSize: 20,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    width: "70%",
    marginRight: 10,
    padding: 5,
  },
  safeArea: {
    flex: 1,
  },
  ItemContainer: {
    margin: 10,
  },
  loading: {
    fontSize: 80,
  },
});

export default ItemListScreen;
