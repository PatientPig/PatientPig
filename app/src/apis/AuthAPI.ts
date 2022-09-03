import User from "@src/interface/User";

export const authenticate = () =>
  new Promise<User>((resolve) => {
    const initUser: User = {
      id: "user-100",
      value: 0,
    };

    setTimeout(() => {
      resolve(initUser);
    }, 2000);
  });
