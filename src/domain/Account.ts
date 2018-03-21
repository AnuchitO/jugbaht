interface Transaction {
  payer: string;
  owes: string[];
  amount: number;
}

export const GenerateAccountTable = (transactions: Transaction): number[][] => {
  return [[transactions[0].amount]]
}

export const InitialAccountTable = (members: string[]) => {
  if (members.length <= 1) {
    return [[0]]
  }

  let accountTable = []
  for (let i = 0; i < members.length; i++){
    let x = []
    for (let j = 0; j < members.length; j++){
      x.push(0)
    }
    accountTable.push(x)
  }

  return accountTable
}
