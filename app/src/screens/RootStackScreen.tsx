import { FC } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { RootStackParamList } from "@src/types/navigation";
import HomeScreen from "@src/screens/HomeScreen";
import LeaderboardScreen from "@src/screens/LeaderboardScreen";
import ItemListScreen from "@src/screens/ItemListScreen";
import BackButton from "@src/components/BackButton";

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStackScreen: FC = () => (
  <Stack.Navigator
    initialRouteName="Home"
    screenOptions={{
      headerShadowVisible: false,
      headerTitleStyle: {
        fontFamily: "DungGeunMo",
      },
    }}
  >
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="Leaderboard"
      component={LeaderboardScreen}
      options={{
        headerTitle: "리더보드",
        headerLeft: () => <BackButton />,
      }}
    />
    <Stack.Screen
      name="ItemList"
      component={ItemListScreen}
      options={{
        headerTitle: "인내목록",
        headerLeft: () => <BackButton />,
      }}
    />
  </Stack.Navigator>
);

export default RootStackScreen;
