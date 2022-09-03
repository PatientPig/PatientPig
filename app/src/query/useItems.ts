import { useQuery } from "@tanstack/react-query";

import QueryKeys from "@src/query/QueryKeys";
import * as ItemAPI from "@src/apis/ItemAPI";
import useAuthUserId from "@src/hooks/useAuthUserId";

function useItems() {
  const authUserId = useAuthUserId();

  return useQuery(QueryKeys.getItems(), async () => {
    if (!authUserId) {
      throw new Error("Unauthorized");
    }

    return ItemAPI.getItems({ id: authUserId });
  });
}

export default useItems;
