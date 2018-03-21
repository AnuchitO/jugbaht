export type Transaction = {
  payer: string;
  owes: string[];
  amount: number;
};

export type AccountTable = number[][];
export type AccountIndex = { [key: string]: number; };
