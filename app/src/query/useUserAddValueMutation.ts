import { useSetRecoilState } from "recoil";
import { useMutation } from "@tanstack/react-query";

import * as AuthAPI from "@src/apis/AuthAPI";
import useAuthUserId from "@src/hooks/useAuthUserId";
import authUserAtom from "@src/recoil/authUserAtom";

function useUserAddValueMutation() {
  const authUserId = useAuthUserId();
  const setAuthUser = useSetRecoilState(authUserAtom);

  const mutation = useMutation(
    (args: { value: number }) => {
      if (!authUserId) {
        throw new Error("Unauthorized");
      }

      return AuthAPI.feed({ id: authUserId, value: args.value });
    },
    {
      onMutate: ({ value }) => {
        setAuthUser((prev) => {
          if (!prev) {
            return prev;
          }

          return {
            ...prev,
            value: prev.value + value,
          };
        });
      },
    }
  );

  return mutation;
}

export default useUserAddValueMutation;
