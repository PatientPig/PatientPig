import User from "@src/interface/User";
import axios from "@src/apis/axios";

export const signIn = async (args: { id: string }) => {
  const { id } = args;

  const res = await axios.get<number>("/user", { params: { nickname: id } });

  const user: User = {
    id: args.id,
    value: res.data,
  };

  return user;
};

export const signUp = async () => {
  const res = await axios.post<string>("/user");

  const user: User = {
    id: res.data,
    value: 0,
  };

  return user;
};
