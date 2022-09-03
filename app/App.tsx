import { FC } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

import useFonts from "@src/hooks/useFonts";
import RootStackScreen from "@src/screens/RootStackScreen";
import QuestionModal from "@src/components/QuestionModal";
import AuthContainer from "@src/components/AuthContainer";

const queryClient = new QueryClient();

const App: FC = () => {
  const { fontsLoaded, onLayoutRootView } = useFonts();

  if (!fontsLoaded) {
    return null;
  }

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider onLayout={onLayoutRootView}>
          <AuthContainer>
            <NavigationContainer>
              <GestureHandlerRootView style={styles.rnghRoot}>
                <BottomSheetModalProvider>
                  <RootStackScreen />
                  <QuestionModal />
                </BottomSheetModalProvider>
              </GestureHandlerRootView>
            </NavigationContainer>
          </AuthContainer>
        </SafeAreaProvider>
      </QueryClientProvider>
    </RecoilRoot>
  );
};

const styles = StyleSheet.create({
  rnghRoot: {
    flex: 1,
  },
});

export default App;
