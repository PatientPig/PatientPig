import { useMutation } from "@tanstack/react-query";

import * as ItemAPI from "@src/apis/ItemAPI";

function useItemCreateMutation() {
  const mutation = useMutation((args: { value: number; text: string }) => {
    const { value, text } = args;

    return ItemAPI.createItem({ value, text });
  });

  return mutation;
}

export default useItemCreateMutation;
