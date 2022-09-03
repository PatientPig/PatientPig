import React, { FC } from "react";
import { SafeAreaView, Text } from "react-native";

import { RootStackScreenProps } from "@src/types/navigation";

const ItemListScreen: FC<RootStackScreenProps<"ItemList">> = () => (
  <SafeAreaView>
    <Text>ItemList</Text>
  </SafeAreaView>
);

export default ItemListScreen;
