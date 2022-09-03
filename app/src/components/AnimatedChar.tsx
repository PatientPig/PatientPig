import React, { FC, memo, useCallback, useEffect, useState } from "react";
import { StyleProp, ViewStyle, View, StyleSheet, TextStyle, LayoutChangeEvent } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

import Text from "@src/components/Text";
import { Rectangle } from "@src/interface/Layout";

interface Props {
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  char: string;
}

const chars = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ","];

const AnimatedChar: FC<Props> = ({ style, textStyle, char }) => {
  const [rectengle, setLayout] = useState<Rectangle>({ width: 0, height: 0 });
  const position = useSharedValue(chars.indexOf(char) * rectengle.height);

  useEffect(() => {
    position.value = withTiming(chars.indexOf(char) * rectengle.height, { duration: 500 });
  }, [rectengle, char]);

  const handleLayout = useCallback((e: LayoutChangeEvent) => {
    setLayout({
      width: e.nativeEvent.layout.width,
      height: e.nativeEvent.layout.height,
    });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: -position.value,
      },
    ],
  }));

  if (rectengle.width === 0 || rectengle.height === 0) {
    return (
      <View style={[styles.container, style]} onLayout={handleLayout}>
        <Text style={textStyle}>{char}</Text>
      </View>
    );
  }

  return (
    <View
      style={[
        styles.container,
        {
          width: rectengle.width,
          height: rectengle.height,
          overflow: "hidden",
        },
        style,
      ]}
    >
      <Animated.View style={[{ position: "absolute", left: 0, right: 0, top: 0 }, animatedStyle]}>
        {chars.map((char, index) => (
          <View
            key={index}
            style={{
              width: rectengle.width,
              height: rectengle.height,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={textStyle}>{char}</Text>
          </View>
        ))}
      </Animated.View>
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
