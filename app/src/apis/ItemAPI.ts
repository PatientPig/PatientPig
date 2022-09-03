import Item from "@src/interface/Item";
import axios from "@src/apis/axios";

export const getItems = async (args: { id: string }) => {
  const { id } = args;

  const res = await axios.get<
    {
      content: string;
      time: number;
    }[]
  >("/coin", {
    params: { nickname: id },
  });

  const items: Item[] = res.data.map(({ content, time }) => ({
    desc: content,
    value: time,
  }));

  return items;
};

export const createItem = (args: { id: string; value: number; text: string }) => {
  const { id, value, text } = args;

  return axios.post("/coin", {
    content: text,
    nickname: id,
    time: value,
  });
};
