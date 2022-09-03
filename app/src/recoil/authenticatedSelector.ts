import { selector } from "recoil";
import authUserAtom from "./authUserAtom";

const authenticatedSelector = selector<boolean>({
  key: "@authenticatedSelector",
  get: ({ get }) => {
    const authUser = get(authUserAtom);

    return authUser !== null;
  },
});

export default authenticatedSelector;
