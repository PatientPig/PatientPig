import { useQuery } from "@tanstack/react-query";

import QueryKeys from "@src/query/QueryKeys";
import * as RankingAPI from "@src/apis/RankingApi";

function useRanking() {
  return useQuery(QueryKeys.getRanking(), () => RankingAPI.getRanking());
}

export default useRanking;
