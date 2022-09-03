import { atom } from "recoil";

interface QuestionModalAtom {
  showing: boolean;
}

const questionModalAtom = atom<QuestionModalAtom>({
  key: "@questionModalAtom",
  default: {
    showing: false,
  },
});

export default questionModalAtom;
