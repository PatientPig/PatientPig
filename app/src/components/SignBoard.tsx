import React, { FC, memo, useMemo, useRef, useState } from "react";
import { StyleProp, View, ViewStyle, StyleSheet } from "react-native";

import Text from "@src/components/Text";
import coinBankLayoutAtom from "@src/recoil/coinBankLayoutAtom";
import { useRecoilValue } from "recoil";
import Layout from "@src/interface/Layout";
import { getCenterPosition } from "@src/utils/layoutUtils";
import useAuthUserId from "@src/hooks/useAuthUserId";

interface Props {
  style?: StyleProp<ViewStyle>;
}

const dotPositions: ViewStyle[] = [
  {
    top: 8,
    left: 9,
  },
  {
    top: 8,
    right: 9,
  },
  {
    bottom: 8,
    left: 9,
  },
  {
    bottom: 8,
    right: 9,
  },
];

const SignBoard: FC<Props> = ({ style }) => {
  const ref = useRef<View>(null);
  const authUserId = useAuthUserId();

  const [signBoardLayout, setSignBoardLayout] = useState<Layout>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const coinBankLayout = useRecoilValue(coinBankLayoutAtom);

  const lineStyle = useMemo<ViewStyle>(() => {
    const coinBankCenterPosition = getCenterPosition(coinBankLayout);

    const singBoardBottom = signBoardLayout.y + signBoardLayout.height;
    const diffY = coinBankCenterPosition.y - singBoardBottom;

    return {
      top: signBoardLayout.height,
      height: Math.max(0, diffY),
    };
  }, [signBoardLayout, coinBankLayout]);

  return (
    <View
      ref={ref}
      style={[styles.container, style]}
      onLayout={() => {
        ref.current?.measure((x, y, width, height, pageX, pageY) => {
          setSignBoardLayout({
            x: pageX,
            y: pageY,
            width,
            height,
          });
        });
      }}
    >
      <Text style={styles.title}>Pig Game</Text>
      <Text style={styles.nickname}>{authUserId}</Text>
      {dotPositions.map((dotPosition, index) => (
        <View key={index} style={StyleSheet.compose(dotPosition, styles.baseDot)} />
      ))}
      <View
        style={[
          styles.outerLine,
          {
            transform: [
              {
                translateX: -95,
              },
            ],
          },
          lineStyle,
        ]}
      />
      <View
        style={[
          styles.innerLine,
          {
            transform: [
              {
                translateX: -40,
              },
            ],
          },
          lineStyle,
        ]}
      />
      <View
        style={[
          styles.innerLine,
          {
            transform: [
              {
                translateX: 40,
              },
            ],
          },
          lineStyle,
        ]}
      />
      <View
        style={[
          styles.outerLine,
          {
            transform: [
              {
                translateX: 95,
              },
            ],
          },
          lineStyle,
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: "stretch",
    borderRadius: 12,
    backgroundColor: "#F71374",
    paddingVertical: 14,
    marginHorizontal: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
    color: "white",
  },
  nickname: {
    marginTop: 6,
    fontSize: 14,
    color: "white",
  },
  baseDot: {
    position: "absolute",
    width: 10,
    height: 10,
    backgroundColor: "white",
    borderRadius: 5,
  },
  outerLine: {
    position: "absolute",
    width: 4,
    backgroundColor: "#DB4785",
    alignSelf: "center",
    top: 0,
  },
  innerLine: {
    position: "absolute",
    top: 0,
    width: 4,
    backgroundColor: "#FFE3EF",
    alignSelf: "center",
  },
});

export default memo(SignBoard);
