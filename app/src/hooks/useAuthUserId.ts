import authUserIdSelector from "@src/recoil/authUserIdSelector";
import { useRecoilValue } from "recoil";

function useAuthUserId() {
  return useRecoilValue(authUserIdSelector);
}

export default useAuthUserId;
