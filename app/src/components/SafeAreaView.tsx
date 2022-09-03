import React, { ComponentProps, FC } from "react";
import { SafeAreaView as RNSafeAreaView, StyleSheet, ViewStyle } from "react-native";

const SafeAreaView: FC<ComponentProps<typeof RNSafeAreaView>> = ({ children, style, ...rest }) => (
  <RNSafeAreaView style={StyleSheet.compose<ViewStyle>(styles.container, style)} {...rest}>
    {children}
  </RNSafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D1C18",
  },
});

export default SafeAreaView;
