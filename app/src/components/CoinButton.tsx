import React, { FC, memo, useEffect, useState, useRef } from "react";
import { View, StyleProp, ViewStyle, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useDerivedValue,
  useAnimatedReaction,
  withTiming,
  interpolate,
  withSequence,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { FontAwesome5 } from "@expo/vector-icons";

import Text from "@src/components/Text";
import { useRecoilValue } from "recoil";
import coinBankLayoutAtom from "@src/recoil/coinBankLayoutAtom";
import Layout, { Position } from "@src/interface/Layout";
import { getCenterPosition } from "@src/utils/layoutUtils";

interface Props {
  style?: StyleProp<ViewStyle>;
}

const CoinButton: FC<Props> = ({ style }) => {
  const movePositionX = useSharedValue(0);
  const movePositionY = useSharedValue(0);
  const lastTouchedAt = useSharedValue(0);
  const currentAt = useSharedValue(Date.now());
  const scaleDown = useSharedValue(-1);
  const scaleUp = useDerivedValue(() => {
    if (lastTouchedAt.value === 0) {
      return 0;
    }

    if (scaleDown.value !== -1) {
      return scaleDown.value;
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

  const coinRef = useRef<Animated.View>(null);
  const [coinLayout, setCoinLayout] = useState<Layout>({ x: 0, y: 0, width: 0, height: 0 });
  const coinBankLayout = useRecoilValue(coinBankLayoutAtom);

  const moveCoin = () => {
    const coinCenterPosition = getCenterPosition(coinLayout);
    const coinBankCenterPosition = getCenterPosition(coinBankLayout);

    const diffX = coinBankCenterPosition.x - coinCenterPosition.x;
    const diffY = coinBankCenterPosition.y - coinCenterPosition.y;

    scaleDown.value = scaleUp.value;
    scaleDown.value = withTiming(-1, { duration: 500 });

    movePositionX.value = withTiming(diffX, { duration: 500 }, (finished) => {
      if (finished) {
        movePositionX.value = 0;
        lastTouchedAt.value = 0;
      }
    });

    movePositionY.value = withTiming(diffY, { duration: 500 }, (finished) => {
      if (finished) {
        movePositionY.value = 0;
        lastTouchedAt.value = 0;
      }
    });
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      currentAt.value = Date.now();
    }, 10);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const panGesture = Gesture.Tap()
    .runOnJS(true)
    .maxDuration(1000 * 100)
    .onBegin(() => {
      if (lastTouchedAt.value === 0) {
        lastTouchedAt.value = Date.now();
      }
    })
    .onFinalize(() => {
      moveCoin();
    });

  const guideAnimatedStyle = useAnimatedStyle(() => ({
    opacity: touching.value ? 0 : 1,
  }));

  const coinAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: movePositionX.value,
      },
      {
        translateY: movePositionY.value,
      },
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
        <Animated.View
          ref={coinRef}
          style={[styles.button, coinAnimatedStyle]}
          onLayout={() => {
            coinRef.current?.measureInWindow((x, y, width, height) => {
              setCoinLayout({ x, y, height, width });
            });
          }}
        >
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
