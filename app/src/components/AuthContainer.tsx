import React, { FC } from "react";
import LottieView from "lottie-react-native";

import useAuthenticate from "@src/hooks/useAuthenticate";
import { SafeAreaView } from "react-native";

interface Props {
  children: React.ReactElement | null;
}

const AuthContainer: FC<Props> = ({ children }) => {
  const { authenticated } = useAuthenticate();

  if (!authenticated) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <LottieView
          autoPlay
          style={{
            width: 200,
            height: 200,
          }}
          source={require("@assets/lotties/global-loader.json")}
        />
      </SafeAreaView>
    );
  }

  return children;
};

export default AuthContainer;
