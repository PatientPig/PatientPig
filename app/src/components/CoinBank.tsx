import React, { FC, useRef } from "react";
import { View, StyleProp, ViewStyle, StyleSheet, Image } from "react-native";
import { useSetRecoilState } from "recoil";

import coinBankCenterPositionAtom from "@src/recoil/coinBankLayoutAtom";

interface Props {
  style?: StyleProp<ViewStyle>;
}

const CoinBank: FC<Props> = () => {
  const coinBankRef = useRef<View>(null);
  const setCoinBankCenterPosition = useSetRecoilState(coinBankCenterPositionAtom);

  return (
    <View
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
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 239,
    height: 258,
  },
});

export default CoinBank;
