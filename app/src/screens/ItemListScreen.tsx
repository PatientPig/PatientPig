import React, { FC } from "react";
import { SafeAreaView, StyleSheet, View, FlatList, ListRenderItem, StatusBar } from "react-native";
import { RootStackScreenProps } from "@src/types/navigation";

import Loader from "@src/components/Loader";
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
      <View style={styles.container}>
        <View style={styles.item}>
          <Text numberOfLines={3} style={{ fontSize: 16 }}>
            {item.desc}
          </Text>
        </View>
        <Text style={styles.value}>{commasNumber}P</Text>
      </View>
    );
  };

  if (isLoading) {
    return <Loader style={{ backgroundColor: "white" }} />;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <FlatList
        style={styles.ItemContainer}
        data={items}
        renderItem={renderItem}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={{ fontSize: 30, color: "#5D5FDA" }}>잘 참았다 꿀!</Text>
          </View>
        }
        keyExtractor={(item, index) => item.desc}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 14,
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-evenly",
    marginBottom: 20,
  },
  value: {
    color: "#F71374",
    textAlign: "center",
    borderRadius: 10,
    fontSize: 14,
  },
  item: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderColor: "black",
    marginRight: 10,
    padding: 5,
  },
  safeArea: {
    flex: 1,
    backgroundColor: "white",
  },
  ItemContainer: {
    margin: 10,
  },
});

export default ItemListScreen;
