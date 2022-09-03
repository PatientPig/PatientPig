import { useMutation } from "@tanstack/react-query";

import * as ItemAPI from "@src/apis/ItemAPI";
import { useSetRecoilState } from "recoil";
import authUserAtom from "@src/recoil/authUserAtom";

function useItemCreateMutation() {
  const setAuthUser = useSetRecoilState(authUserAtom);

  const mutation = useMutation(
    (args: { value: number; text: string }) => {
      const { value, text } = args;

      return ItemAPI.createItem({ value, text });
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
