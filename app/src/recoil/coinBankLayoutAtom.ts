import { atom } from "recoil";

import Layout from "@src/interface/Layout";

const coinBankLayoutAtom = atom<Layout>({
  key: "@coinBankLayoutAtom",
  default: {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  },
});

export default coinBankLayoutAtom;
