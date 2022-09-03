import React, { FC, useRef, useMemo, useEffect, useCallback, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useRecoilValue } from "recoil";
import {
  BottomSheetModal,
  useBottomSheetDynamicSnapPoints,
  BottomSheetView,
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";

import Text from "@src/components/Text";
import questionModalAtom from "@src/recoil/questionModalAtom";
import useQuestionModalController from "@src/hooks/useQuestionModalController";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { numberWithCommas } from "@src/utils/formatUtils";
import useItemCreateMutation from "@src/query/useItemCreateMutation";

const QuestionModal: FC = () => {
  const ref = useRef<BottomSheetModal>(null);

  const { bottom } = useSafeAreaInsets();

  const { showing, value } = useRecoilValue(questionModalAtom);
  const { hideQuestionModal } = useQuestionModalController();

  const itemCreateMutate = useItemCreateMutation();

  const initialSnapPoints = useMemo(() => ["CONTENT_HEIGHT"], []);

  const { animatedHandleHeight, animatedSnapPoints, animatedContentHeight, handleContentLayout } =
    useBottomSheetDynamicSnapPoints(initialSnapPoints);

  useEffect(() => {
    if (showing) {
      ref.current?.present();
    } else {
      ref.current?.dismiss();
    }
  }, [showing]);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        pressBehavior="none"
      />
    ),
    []
  );

  const [text, setText] = useState("");
  const disableConfirmButton = text.trim().length === 0;

  const confirm = () => {
    itemCreateMutate.mutate({
      value,
      text,
    });
    hideQuestionModal();
  };

  const handleDismiss = useCallback(() => {
    hideQuestionModal();
    setText("");
  }, []);

  return (
    <BottomSheetModal
      ref={ref}
      index={0}
      snapPoints={animatedSnapPoints}
      handleHeight={animatedHandleHeight}
      contentHeight={animatedContentHeight}
      keyboardBehavior="interactive"
      keyboardBlurBehavior="restore"
      android_keyboardInputMode="adjustResize"
      handleComponent={null}
      enableOverDrag={false}
      enablePanDownToClose={false}
      onDismiss={handleDismiss}
      backdropComponent={renderBackdrop}
    >
      <BottomSheetView
        style={[styles.container, { paddingBottom: bottom ? bottom + 15 : 30 }]}
        onLayout={handleContentLayout}
      >
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => {
            hideQuestionModal();
          }}
        >
          <AntDesign name="close" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.header}>
          <MaterialCommunityIcons name="pig" size={50} color="#e84393" />
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{`잘 참았다 ${numberWithCommas(value)}P!`}</Text>
            <Text style={styles.title}>이번엔 어떤걸 참았꿀?</Text>
          </View>
        </View>
        <BottomSheetTextInput
          style={styles.textInput}
          placeholder="잘 참은 나에게 한마디를..."
          multiline
          onChangeText={setText}
        />
        <TouchableOpacity
          style={[styles.confirmButton, disableConfirmButton && styles.disabledConfirmButton]}
          activeOpacity={0.8}
          disabled={disableConfirmButton}
          onPress={confirm}
        >
          <Text style={styles.confirmButtonText}>이걸 참았꿀</Text>
        </TouchableOpacity>
      </BottomSheetView>
    </BottomSheetModal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F8EFD4",
    borderTopRightRadius: 14,
    borderTopLeftRadius: 14,
  },
  header: {
    marginTop: 30,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  titleContainer: {
    marginLeft: 8,
  },
  title: {
    flex: 1,
    fontSize: 20,
  },
  textInput: {
    marginHorizontal: 20,
    height: 160,
    backgroundColor: "#FEF9EF",
    marginVertical: 14,
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 14,
    textAlignVertical: "top",
    fontFamily: "DungGeunMo",
    fontSize: 20,
  },
  confirmButton: {
    marginTop: 30,
    marginHorizontal: 20,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ED6663",
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  confirmButtonText: {
    fontSize: 20,
    color: "white",
  },
  disabledConfirmButton: {
    backgroundColor: "#CFD2CF",
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 18,
    zIndex: 100,
  },
});

export default QuestionModal;
