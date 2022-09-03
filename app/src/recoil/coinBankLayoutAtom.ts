import { atom } from "recoil";

interface CoinBankLayoutAtom {}

const coinBankLayoutAtom = atom<CoinBankLayoutAtom>({
  key: "@coinBankLayoutAtom",
  default: {},
});

export default coinBankLayoutAtom;
