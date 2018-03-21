import { AccountTable } from '@/domain/Types'
export const CashFlow = (graph: AccountTable) => {
  return minCashFlow(graph)
}

type Amount = number[]
type Result = {
  debtorIndex: number,
  payAmount: number,
  creditorIndex: number
}

const minCashFlowRec = (amount: Amount, result: Result[]): Result[] => {
    let mxCredit = getIndexMax(amount)
    let mxDebit = getIndexMin(amount)
    if (amount[mxCredit] === 0 && amount[mxDebit] === 0)
        return result
    let min = minOf2(-amount[mxDebit], amount[mxCredit])
    amount[mxCredit] -= min
    amount[mxDebit] += min
    //console.info("Person " + ( mxDebit+ 1) + " pays " + min + " to " + "Person " + ( mxCredit+ 1));
    result.push({
      debtorIndex: mxDebit,
      payAmount: min,
      creditorIndex: mxCredit
    })
    return minCashFlowRec(amount, result)
}

const initialAmount = (numberOfFriends: number) => {
  let amount = []
  while (numberOfFriends-- > 0) {
    amount.push(0)
  }
  return amount
}

const minCashFlow = (graph: AccountTable): Result[] => {
    let numberOfFriends = graph.length
    let amount = initialAmount(numberOfFriends)
    for (let creditorIndex = 0; creditorIndex < numberOfFriends; creditorIndex++){
      for (let debtorIndex = 0; debtorIndex < numberOfFriends; debtorIndex++){
        const credit = graph[debtorIndex][creditorIndex]
        const debit = graph[creditorIndex][debtorIndex]
        amount[creditorIndex] += (credit - debit)
      }
    }
    return minCashFlowRec(amount, [])
}

const getIndexMin = (amount: Amount): number {
    let minIndex = 0
    amount.forEach((value, index) => {
      if (value < amount[minIndex]) {
          minIndex = index
      }
    })
    return minIndex
}

const getIndexMax = (amount: Amount): number => {
    var maxInd = 0
    amount.forEach((value, index) => {
      if (value > amount[maxInd]){
          maxInd = index
      }
    })
    return maxInd
}

const minOf2 = (x: number, y: number): number => (x < y) ? x : y
