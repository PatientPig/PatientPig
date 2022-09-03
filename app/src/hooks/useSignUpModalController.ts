import { useCallback } from "react";
import { useResetRecoilState, useSetRecoilState } from "recoil";

import signUpModalAtom from "@src/recoil/signUpModalAtom";

function useSignUpModalController() {
  const setSignUpModalState = useSetRecoilState(signUpModalAtom);
  const resetSignUpModalState = useResetRecoilState(signUpModalAtom);

  const showSignUpModal = useCallback(() => {
    setSignUpModalState((prev) => ({
      ...prev,
      showing: true,
    }));
  }, []);

  return {
    showSignUpModal,
    hideSignUpModal: resetSignUpModalState,
  };
}

export default useSignUpModalController;
