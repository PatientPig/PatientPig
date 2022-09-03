import { selector } from "recoil";

import authUserAtom from "@src/recoil/authUserAtom";

const authUserIdSelector = selector({
  key: "@authUserIdSelector",
  get: ({ get }) => {
    const authUser = get(authUserAtom);

    return authUser?.id;
  },
});

export default authUserIdSelector;
