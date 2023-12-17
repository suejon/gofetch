type Word = {
  word: string;
  offset: number;
  root: string | null;
  lang: string | null;
  index: number;
  entries: {
    name: string;
    type: string;
    value: string;
  }[];
};
