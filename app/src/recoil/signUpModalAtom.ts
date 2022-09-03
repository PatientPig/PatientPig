import { atom } from "recoil";

interface SignUpModalAtom {
  showing: boolean;
}

const signUpModalAtom = atom<SignUpModalAtom>({
  key: "@signUpModalAtom",
  default: {
    showing: false,
  },
});

export default signUpModalAtom;
