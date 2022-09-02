import { FC } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { RootStackParamList } from "@src/types/navigation";
import HomeScreen from "@src/screens/HomeScreen";
import LeaderboardScreen from "@src/screens/LeaderboardScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStackScreen: FC = () => (
  <Stack.Navigator initialRouteName="Home">
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="Leaderboard" component={LeaderboardScreen} />
  </Stack.Navigator>
);

export default RootStackScreen;
