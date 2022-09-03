import React, { FC, memo, useEffect, useState, useRef, useCallback } from "react";
import { View, StyleProp, ViewStyle, StyleSheet, Image } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useDerivedValue,
  runOnJS,
} from "react-native-reanimated";
import { useRecoilValue } from "recoil";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

import Text from "@src/components/Text";
import coinBankLayoutAtom from "@src/recoil/coinBankLayoutAtom";
import Layout from "@src/interface/Layout";
import { getCenterPosition } from "@src/utils/layoutUtils";
import useQuestionModalController from "@src/hooks/useQuestionModalController";
import FlyingCoin, { Props as FlyingCoinProps } from "@src/components/FlyingCoin";
import useUserAddValueMutation from "@src/query/useUserAddValueMutation";

interface Props {
  style?: StyleProp<ViewStyle>;
}

const CoinButton: FC<Props> = ({ style }) => {
  const [coinQueue, setCoinQueue] = useState<
    Pick<FlyingCoinProps, "id" | "initScale" | "value" | "transition">[]
  >([]);

  const { showQuestionModal } = useQuestionModalController();
  const userAddValueMutation = useUserAddValueMutation();

  const handleFinish: Exclude<FlyingCoinProps["onFinish"], undefined> = useCallback((args) => {
    setCoinQueue((prev) => prev.filter(({ id }) => id !== args.id));

    if (args.value >= 1000) {
      showQuestionModal({ value: args.value });
    } else {
      userAddValueMutation.mutate({ value: args.value });
    }
  }, []);

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

  const coinRef = useRef<Animated.View>(null);
  const [coinLayout, setCoinLayout] = useState<Layout>({ x: 0, y: 0, width: 0, height: 0 });
  const coinBankLayout = useRecoilValue(coinBankLayoutAtom);

  const moveCoin = () => {
    const coinCenterPosition = getCenterPosition(coinLayout);
    const coinBankCenterPosition = getCenterPosition(coinBankLayout);

    const diffX = coinBankCenterPosition.x - coinCenterPosition.x;
    const diffY = coinBankCenterPosition.y - coinCenterPosition.y;
    const duration = currentAt.value - lastTouchedAt.value;

    runOnJS(setCoinQueue)((prev) => [
      ...prev,
      {
        id: `${Math.random()}`,
        value: duration,
        initScale: 1 + scaleUp.value,
        transition: {
          x: diffX,
          y: diffY,
        },
      },
    ]);

    lastTouchedAt.value = 0;
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
        scale: 1 + scaleUp.value,
      },
    ],
  }));

  return (
    <View style={[styles.container, style]}>
      <Animated.View style={[styles.guide, guideAnimatedStyle]}>
        <Text style={styles.guideText}>TOUCHE ME!</Text>
      </Animated.View>
      <View
        onLayout={() => {
          coinRef.current?.measure((x, y, width, height, pageX, pageY) => {
            setCoinLayout({ x: pageX, y: pageY, height, width });
          });
        }}
      >
        <GestureDetector gesture={panGesture}>
          <Animated.View ref={coinRef} style={coinAnimatedStyle}>
            <Image source={require("@assets/coin.png")} style={{ width: 70, height: 70 }} />
          </Animated.View>
        </GestureDetector>
        {coinQueue.map(({ id, initScale, value, transition }) => (
          <FlyingCoin
            key={id}
            id={id}
            value={value}
            initScale={initScale}
            transition={transition}
            style={styles.flyingCoin}
            onFinish={handleFinish}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  guide: {
    alignItems: "center",
    marginBottom: 10,
  },
  guideText: {
    fontSize: 25,
    color: "white",
  },
  flyingCoin: {
    position: "absolute",
    alignSelf: "center",
  },
});

export default memo(CoinButton);
