import React, { FC, useState } from "react";
import { Modal, StyleSheet, TextInput, View, TouchableOpacity } from "react-native";
import { useRecoilValue } from "recoil";

import Text from "@src/components/Text";
import signUpModalAtom from "@src/recoil/signUpModalAtom";
import useSignUpModalController from "@src/hooks/useSignUpModalController";
import useAuthenticate from "@src/hooks/useAuthenticate";

const SignUpModal: FC = () => {
  const [realName, setRealName] = useState("");
  const [fetching, setFetching] = useState(false);

  const { showing } = useRecoilValue(signUpModalAtom);
  const { hideSignUpModal } = useSignUpModalController();
  const { signUp } = useAuthenticate();

  const confirm = async () => {
    try {
      if (fetching) {
        return;
      }
      setFetching(true);

      const trimedRealName = realName.trim();

      if (trimedRealName.length > 0) {
        await signUp({ realName: trimedRealName });

        hideSignUpModal();
      }
    } finally {
      setFetching(false);
    }
  };

  return (
    <Modal transparent visible={showing}>
      <TouchableOpacity
        activeOpacity={1}
        style={[styles.backdrop, { zIndex: -1 }]}
        onPress={() => {
          hideSignUpModal();
        }}
      >
        <TouchableOpacity activeOpacity={1} style={styles.container} onPress={() => {}}>
          <View style={styles.header}>
            <Text style={styles.title}>환영한다 꿀!</Text>
          </View>
          <View style={styles.body}>
            <TextInput
              numberOfLines={1}
              style={styles.textInput}
              placeholder="name..."
              onChangeText={setRealName}
            />
          </View>
          <View style={styles.footer}>
            <TouchableOpacity style={styles.confirmButton} disabled={fetching} onPress={confirm}>
              <Text style={styles.confirmButtonText}>시작하기</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    alignSelf: "stretch",
    marginHorizontal: 40,
    borderRadius: 14,
    backgroundColor: "white",
  },
  header: {
    marginTop: 30,
    marginHorizontal: 20,
  },
  title: {
    fontSize: 30,
  },
  textInput: {
    marginHorizontal: 20,
    backgroundColor: "#f4f4f4",
    marginVertical: 14,
    borderRadius: 6,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
    textAlignVertical: "top",
    fontFamily: "DungGeunMo",
    fontSize: 20,
  },
  body: {
    marginTop: 14,
  },
  footer: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  confirmButton: {
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
});

export default SignUpModal;
