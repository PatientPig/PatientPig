import React, { forwardRef } from "react";
import { Text as RNText, TextProps, StyleSheet } from "react-native";

const Text = forwardRef<RNText, TextProps>(({ style, children, ...rest }, ref) => (
  <RNText
    ref={ref}
    style={StyleSheet.compose(
      {
        fontFamily: "DungGeunMo",
      },
      style
    )}
    {...rest}
  >
    {children}
  </RNText>
));

export default Text;
