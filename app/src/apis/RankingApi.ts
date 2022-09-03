import User from "@src/interface/User";

export const getRanking = () =>
  new Promise<User[]>((resolve) => {
    const Ranking: User[] = [
      {
        id: "user-100",
        value: 0,
      },
      {
        id: "user-1800",
        value: 100,
      },
      {
        id: "user-300",
        value: 250,
      },
      {
        id: "user-60",
        value: 240,
      },
      {
        id: "user-700",
        value: 630,
      },
    ];

    setTimeout(() => {
      resolve(Ranking);
    }, 2000);
  });
