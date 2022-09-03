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

export const anonymousSignUp = async () => {
  const res = await axios.post<string>("/user");

  const user: User = {
    id: res.data,
    value: 0,
  };

  return user;
};

export const signUp = async (args: { realName: string }) => {
  const { realName } = args;

  const res = await axios.put<string>("/user/real", undefined, {
    params: {
      nickname: realName,
    },
  });

  return {
    id: res.data,
    value: 0,
  };
};

export const feed = async (args: { id: string; value: number }) =>
  axios.put("/user/feed", undefined, {
    params: {
      nickname: args.id,
      feed: args.value,
    },
  });
