import { useMutation } from "@tanstack/react-query";

import * as ItemAPI from "@src/apis/ItemAPI";
import { useSetRecoilState } from "recoil";
import authUserAtom from "@src/recoil/authUserAtom";
import useAuthUserId from "@src/hooks/useAuthUserId";

function useItemCreateMutation() {
  const authUserId = useAuthUserId();
  const setAuthUser = useSetRecoilState(authUserAtom);

  const mutation = useMutation(
    async (args: { value: number; text: string }) => {
      const { value, text } = args;

      if (!authUserId) {
        throw new Error("Unauthorized");
      }

      return ItemAPI.createItem({ value, text, id: authUserId });
    },
    {
      onSuccess: (data, { value }) => {
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

export default useItemCreateMutation;
