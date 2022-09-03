import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

import authUserAtom from "@src/recoil/authUserAtom";
import authenticatedSelector from "@src/recoil/authenticatedSelector";
import * as AuthAPI from "@src/apis/AuthAPI";

function useAuthUser() {
  const authenticated = useRecoilValue(authenticatedSelector);
  const setAuthUser = useSetRecoilState(authUserAtom);

  useEffect(() => {
    AuthAPI.authenticate().then(setAuthUser);
  }, []);

  return { authenticated };
}

export default useAuthUser;
