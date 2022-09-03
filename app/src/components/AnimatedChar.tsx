import React, { FC, memo } from "react";
import { StyleProp, ViewStyle, View, StyleSheet, TextStyle } from "react-native";

import Text from "@src/components/Text";

interface Props {
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  char: string;
}

const AnimatedChar: FC<Props> = ({ style, textStyle, char }) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={textStyle}>{char}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default memo(AnimatedChar);
