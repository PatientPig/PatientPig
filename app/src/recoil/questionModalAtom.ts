import { atom } from "recoil";

interface QuestionModalAtom {
  showing: boolean;
  value: number;
}

const questionModalAtom = atom<QuestionModalAtom>({
  key: "@questionModalAtom",
  default: {
    showing: false,
    value: 0,
  },
});

export default questionModalAtom;
