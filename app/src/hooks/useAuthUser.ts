import { useRecoilValue } from "recoil";

import authUserAtom from "@src/recoil/authUserAtom";

function useAuthUser() {
  return useRecoilValue(authUserAtom);
}

export default useAuthUser;
