import useAuthUser from "@src/hooks/useAuthUser";
import React, { FC, memo, useMemo } from "react";
import { StyleProp, ViewStyle, View, StyleSheet } from "react-native";

import { numberWithCommas } from "@src/utils/formatUtils";
import AnimatedChar from "@src/components/AnimatedChar";

interface Props {
  style?: StyleProp<ViewStyle>;
}

const ScoreBoard: FC<Props> = ({ style }) => {
  const authUser = useAuthUser();

  const scoreCharList = useMemo<string[]>(() => {
    const value = authUser?.value || 0;
    const str = numberWithCommas(value);
    const paddedStr = str.padStart(7, "0");
    return paddedStr.split("");
  }, [authUser]);

  return (
    <View style={[styles.container, style]}>
      <View style={styles.listContainer}>
        {scoreCharList.map((char, index) => (
          <React.Fragment key={index}>
            <AnimatedChar
              key={index}
              char={char}
              style={styles.animatedChar}
              textStyle={styles.animatedCharTextStyle}
            />
            {index < scoreCharList.length - 1 && <View style={styles.divider} />}
          </React.Fragment>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFCF72",
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 12,
    marginHorizontal: 48,
  },
  listContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    overflow: "hidden",
  },
  animatedChar: {
    flex: 1,
    backgroundColor: "white",
    paddingVertical: 12,
  },
  animatedCharTextStyle: {
    fontSize: 30,
  },
  divider: {
    width: 1,
    backgroundColor: "#B9B9B9",
    alignSelf: "stretch",
  },
});

export default memo(ScoreBoard);
