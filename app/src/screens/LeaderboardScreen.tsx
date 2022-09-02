import React, { FC } from "react";
import { View, Text } from "react-native";

import { RootStackScreenProps } from "@src/types/navigation";

const LeaderboardScreen: FC<RootStackScreenProps<"Leaderboard">> = () => (
  <View>
    <Text>Leaderboard</Text>
  </View>
);

export default LeaderboardScreen;
