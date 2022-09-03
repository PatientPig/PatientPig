import User from "@src/interface/User";
import axios from "@src/apis/axios";

export const getRanking = async () => {
  const res = await axios.get<{ nickname: string; pig: number }[]>("/user/ranking");

  const users: User[] = res.data.map(({ nickname, pig }) => ({
    id: nickname,
    value: pig,
  }));

  return users;
};
