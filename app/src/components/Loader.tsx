import React, { FC } from "react";
import { SafeAreaView, StyleProp, ViewStyle } from "react-native";
import LottieView from "lottie-react-native";

interface Props {
  style?: StyleProp<ViewStyle>;
  children?: React.ReactElement;
}

const Loader: FC<Props> = ({ style, children }) => (
  <SafeAreaView
    style={[
      {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      },
      style,
    ]}
  >
    <LottieView
      autoPlay
      style={{
        width: 200,
        height: 200,
      }}
      source={require("@assets/lotties/global-loader.json")}
    />
    {children}
  </SafeAreaView>
);

export default Loader;
