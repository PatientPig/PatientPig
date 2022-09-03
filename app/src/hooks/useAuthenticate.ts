import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import AsyncStorage from "@react-native-async-storage/async-storage";

import authUserAtom from "@src/recoil/authUserAtom";
import authenticatedSelector from "@src/recoil/authenticatedSelector";
import * as AuthAPI from "@src/apis/AuthAPI";

const StorageKey = "@AuthUserId";

function useAuthUser() {
  const authenticated = useRecoilValue(authenticatedSelector);
  const setAuthUser = useSetRecoilState(authUserAtom);

  useEffect(() => {
    const login = async () => {
      try {
        const savedId = await AsyncStorage.getItem("@AuthUserId");

        if (savedId) {
          const user = await AuthAPI.signIn({ id: savedId });

          setAuthUser(user);
        } else {
          const user = await AuthAPI.signUp();

          await AsyncStorage.setItem(StorageKey, user.id);

          setAuthUser(user);
        }
      } catch (err) {
        console.log(err);
      }
    };

    login();
  }, []);

  return { authenticated };
}

export default useAuthUser;
