import questionModalAtom from "@src/recoil/questionModalAtom";
import { useCallback } from "react";
import { useResetRecoilState, useSetRecoilState } from "recoil";

function useQuestionModalController() {
  const setQuestionModalState = useSetRecoilState(questionModalAtom);
  const resetQuestionModalState = useResetRecoilState(questionModalAtom);

  const showQuestionModal = useCallback((args: { value: number }) => {
    setQuestionModalState((prev) => ({
      ...prev,
      showing: true,
      value: args.value,
    }));
  }, []);

  return {
    showQuestionModal,
    hideQuestionModal: resetQuestionModalState,
  };
}

export default useQuestionModalController;
