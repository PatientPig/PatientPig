import Item from "@src/interface/Item";

export const getItems = () =>
  new Promise<Item[]>((resolve) => {
    const dummyItems: Item[] = [
      {
        desc: "잠자는것을 참음",
        value: 100,
      },
      {
        desc: "밥먹는것을 참음",
        value: 50,
      },
      {
        desc: "잠자고 밥먹는것을 참아버렸음",
        value: 120,
      },
      {
        desc: "게임을 참...았다....",
        value: 110,
      },
    ];

    setTimeout(() => {
      resolve(dummyItems);
    }, 1000);
  });
