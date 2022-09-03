import React, { FC, useEffect, useRef } from "react";
import { StyleProp, ViewStyle, StyleSheet, Image, Pressable } from "react-native";
import { useSetRecoilState } from "recoil";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

import coinBankCenterPositionAtom from "@src/recoil/coinBankLayoutAtom";
import useSignUpModalController from "@src/hooks/useSignUpModalController";

interface Props {
  style?: StyleProp<ViewStyle>;
}

const CoinBank: FC<Props> = () => {
  const transition = useSharedValue(0);

  const coinBankRef = useRef<Animated.View>(null);
  const setCoinBankCenterPosition = useSetRecoilState(coinBankCenterPositionAtom);

  const { showSignUpModal } = useSignUpModalController();

  useEffect(() => {
    transition.value = withRepeat(
      withSequence(withTiming(1, { duration: 2000 }), withTiming(0, { duration: 2000 })),
      -1
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(transition.value, [0, 1], [1, 1.08]),
      },
    ],
  }));

  return (
    <Pressable
      onLongPress={() => {
        showSignUpModal();
      }}
      delayLongPress={1000}
    >
      <Animated.View
        style={animatedStyle}
        ref={coinBankRef}
        onLayout={() => {
          coinBankRef.current?.measure((x, y, width, height, pageX, pageY) => {
            setCoinBankCenterPosition({
              x: pageX,
              y: pageY,
              width,
              height,
            });
          });
        }}
      >
        <Image source={require("@assets/coin-bank.png")} style={styles.image} />
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 239,
    height: 239,
  },
});

export default CoinBank;
