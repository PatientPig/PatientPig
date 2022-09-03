import { atom } from "recoil";

import User from "@src/interface/User";

const authUserAtom = atom<User | null>({
  key: "@authUserAtom",
  default: null,
});

export default authUserAtom;
