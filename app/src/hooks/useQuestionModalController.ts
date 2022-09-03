import questionModalAtom from "@src/recoil/questionModalAtom";
import { useCallback } from "react";
import { useSetRecoilState } from "recoil";

function useQuestionModalController() {
  const setQuestionModalState = useSetRecoilState(questionModalAtom);

  const showQuestionModal = useCallback(() => {
    setQuestionModalState((prev) => ({
      ...prev,
      showing: true,
    }));
  }, []);

  const hideQuestionModal = useCallback(() => {
    setQuestionModalState((prev) => ({
      ...prev,
      showing: false,
    }));
  }, []);

  return {
    showQuestionModal,
    hideQuestionModal,
  };
}

export default useQuestionModalController;
