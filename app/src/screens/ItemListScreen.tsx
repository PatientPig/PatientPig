import React, { FC } from "react";
import { SafeAreaView, StyleSheet, View, FlatList, ListRenderItem } from "react-native";
import { RootStackScreenProps } from "@src/types/navigation";
import { getItems } from "@src/apis/ItemAPI";
import Text from "@src/components/Text";
import Item from "@src/interface/Item";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
const ItemListScreen: FC<RootStackScreenProps<"ItemList">> = () => {
  const renderItem: ListRenderItem<Item> = (info) => {
    return (
      <>
        <View style={styles.item}>
          <AntDesign name="like2" size={24} color="#0288D1" />
          <Text style={{ fontSize: 10 }}>{info.item.desc}</Text>
        </View>
      </>
    );
  };
  const { isLoading, data: Items } = useQuery<Item[]>(["Items"], getItems);
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
        <FontAwesome5 name="piggy-bank" size={45} color="#EE6983" />
        <Text style={{ fontSize: 40 }}>잘 참았다 꿀!</Text>
      </View>
      <FlatList
        style={styles.ItemContainer}
        data={Items}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.desc}
      ></FlatList>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-evenly",
  },
  item: {
    alignItems: "center",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    width: "90%",
    margin: 10,
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
