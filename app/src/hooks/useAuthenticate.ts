import { useCallback } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import AsyncStorage from "@react-native-async-storage/async-storage";

import authUserAtom from "@src/recoil/authUserAtom";
import authenticatedSelector from "@src/recoil/authenticatedSelector";
import * as AuthAPI from "@src/apis/AuthAPI";

const StorageKey = "@AuthUserId";

function useAuthenticate() {
  const authenticated = useRecoilValue(authenticatedSelector);
  const setAuthUser = useSetRecoilState(authUserAtom);

  const authenticate = useCallback(async () => {
    try {
      const savedId = await AsyncStorage.getItem(StorageKey);

      if (savedId) {
        const user = await AuthAPI.signIn({ id: savedId });

        setAuthUser(user);
      } else {
        const user = await AuthAPI.anonymousSignUp();

        await AsyncStorage.setItem(StorageKey, user.id);

        setAuthUser(user);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  const signUp = useCallback(async (args: { realName: string }) => {
    try {
      const user = await AuthAPI.signUp({ realName: args.realName });

      await AsyncStorage.setItem(StorageKey, user.id);

      setAuthUser(user);
    } catch (err) {
      console.log(err);
    }
  }, []);

  return { authenticated, authenticate, signUp };
}

export default useAuthenticate;
