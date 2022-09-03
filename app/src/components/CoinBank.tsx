import React, { FC, useRef } from "react";
import { View, StyleProp, ViewStyle, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
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
      style={styles.icon}
      onLayout={() => {
        coinBankRef.current?.measureInWindow((x, y, width, height) => {
          setCoinBankCenterPosition({
            x,
            y,
            width,
            height,
          });
        });
      }}
    >
      <FontAwesome5 name="piggy-bank" size={100} color="#EE6983" />
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    transform: [
      {
        rotateY: "180deg",
      },
    ],
  },
});

export default CoinBank;
