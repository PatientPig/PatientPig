import { FC } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NavigationContainer } from "@react-navigation/native";

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
            <RootStackScreen />
          </NavigationContainer>
        </SafeAreaProvider>
      </RecoilRoot>
    </QueryClientProvider>
  );
};

export default App;
