import { atom } from "recoil";

interface CoinBankLayoutAtom {
  x: number;
  y: number;
  width: number;
  height: number;
}

const coinBankLayoutAtom = atom<CoinBankLayoutAtom>({
  key: "@coinBankLayoutAtom",
  default: {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  },
});

export default coinBankLayoutAtom;
