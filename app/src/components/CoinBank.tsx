import React, { FC, useRef } from "react";
import { View, StyleProp, ViewStyle, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

interface Props {
  style?: StyleProp<ViewStyle>;
}

const CoinBank: FC<Props> = () => {
  const coinBankRef = useRef<View>(null);

  return (
    <View
      ref={coinBankRef}
      style={styles.icon}
      onLayout={(e) => {
        coinBankRef.current?.measure(console.log);
        console.log(e.nativeEvent.layout);
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
