import { FC } from "react";
import { StyleSheet, StatusBar } from "react-native";
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
import SignUpModal from "@src/components/SignUpModal";

const queryClient = new QueryClient();

const App: FC = () => {
  const { fontsLoaded, onLayoutRootView } = useFonts();

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#0D1C18" />
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <SafeAreaProvider onLayout={onLayoutRootView}>
            <AuthContainer>
              <NavigationContainer>
                <GestureHandlerRootView style={styles.rnghRoot}>
                  <BottomSheetModalProvider>
                    <RootStackScreen />
                    <QuestionModal />
                    <SignUpModal />
                  </BottomSheetModalProvider>
                </GestureHandlerRootView>
              </NavigationContainer>
            </AuthContainer>
          </SafeAreaProvider>
        </QueryClientProvider>
      </RecoilRoot>
    </>
  );
};

const styles = StyleSheet.create({
  rnghRoot: {
    flex: 1,
  },
});

export default App;
