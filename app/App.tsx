import { FC } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import useFonts from "@src/hooks/useFonts";
import RootStackScreen from "@src/screens/RootStackScreen";

const queryClient = new QueryClient();

const App: FC = () => {
  const { fontsLoaded, onLayoutRootView } = useFonts();

  if (!fontsLoaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <SafeAreaProvider onLayout={onLayoutRootView}>
          <NavigationContainer>
            <GestureHandlerRootView style={styles.rnghRoot}>
              <RootStackScreen />
            </GestureHandlerRootView>
          </NavigationContainer>
        </SafeAreaProvider>
      </RecoilRoot>
    </QueryClientProvider>
  );
};

const styles = StyleSheet.create({
  rnghRoot: {
    flex: 1,
  },
});

export default App;
