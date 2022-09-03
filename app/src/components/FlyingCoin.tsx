import React, { FC, memo, useEffect } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
  interpolate,
} from "react-native-reanimated";
import { StyleProp, ViewStyle, Image } from "react-native";

export interface Props {
  id: string;
  value: number;
  initScale: number;
  transition: {
    x: number;
    y: number;
  };
  onFinish?: (args: { id: string; value: number }) => void;
  style?: StyleProp<ViewStyle>;
}

const AnimationTime = 400;

const FlyingCoin: FC<Props> = ({ id, initScale, value, transition: { x, y }, onFinish, style }) => {
  const movePositionX = useSharedValue(0);
  const movePositionY = useSharedValue(0);
  const scale = useSharedValue(initScale);

  useEffect(() => {
    scale.value = withTiming(0, { duration: AnimationTime });
    movePositionX.value = withTiming(x, { duration: AnimationTime }, (finished) => {
      if (finished && onFinish) {
        runOnJS(onFinish)({ id, value });
      }
    });

    movePositionY.value = withTiming(y, { duration: AnimationTime });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(scale.value, [1, 0.3, 0], [1, 0.7, 0]),
    transform: [
      {
        translateY: movePositionY.value,
      },
      {
        scale: scale.value,
      },
    ],
  }));

  return (
    <Animated.View style={[style, animatedStyle]}>
      <Image source={require("@assets/coin.png")} style={{ width: 70, height: 70 }} />
    </Animated.View>
  );
};

export default memo(FlyingCoin);
