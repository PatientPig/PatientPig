import React, { FC, memo, useEffect } from "react";
import { View, StyleProp, ViewStyle, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useDerivedValue,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { FontAwesome5 } from "@expo/vector-icons";

import Text from "@src/components/Text";

interface Props {
  style?: StyleProp<ViewStyle>;
}

const CoinButton: FC<Props> = ({ style }) => {
  const lastTouchedAt = useSharedValue(0);
  const currentAt = useSharedValue(Date.now());
  const scaleUp = useDerivedValue(() => {
    if (lastTouchedAt.value === 0) {
      return 0;
    }

    const diff = Math.max(0, (currentAt.value - lastTouchedAt.value) / 1000);

    return diff;
  });
  const touching = useDerivedValue(() => {
    if (lastTouchedAt.value === 0) {
      return false;
    }

    return true;
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      currentAt.value = Date.now();
    }, 10);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const panGesture = Gesture.Tap()
    .maxDuration(1000 * 100)
    .onBegin(() => {
      lastTouchedAt.value = Date.now();
    })
    .onFinalize(() => {
      lastTouchedAt.value = 0;
    });

  const guideAnimatedStyle = useAnimatedStyle(() => ({
    opacity: touching.value ? 0 : 1,
  }));

  const coinAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: 1 + scaleUp.value,
      },
    ],
  }));

  return (
    <View style={[styles.container, style]}>
      <Animated.View style={[styles.guide, guideAnimatedStyle]}>
        <Text style={{ fontSize: 25 }}>TOUCHE ME</Text>
        <FontAwesome5 name="sort-down" size={24} color="black" />
      </Animated.View>
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.button, coinAnimatedStyle]}>
          <FontAwesome5 name="bitcoin" size={70} color="#f1c40f" />
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  guide: {
    alignItems: "center",
  },
  button: {
    marginTop: 15,
  },
});

export default memo(CoinButton);
