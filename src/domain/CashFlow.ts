export const CashFlow = (graph) => {
  return minCashFlow(graph)
}

const minCashFlowRec = (amount, result) => {
    let mxCredit = getMax(amount)
    let mxDebit = getMin(amount)
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

const minCashFlow = (graph) => {
    let numberOfFriends = graph.length
    let amount = initialAmount(numberOfFriends)
    for (let creditorIndex = 0; creditorIndex < numberOfFriends; creditorIndex++){
      for (let debtorIndex = 0; debtorIndex < numberOfFriends; debtorIndex++){
        const credit = graph[debtorIndex][creditorIndex]
        const debit = graph[creditorIndex][debtorIndex]
        amount[creditorIndex] += (credit - debit)
      }
    }
    return minCashFlowRec(amount, []);
}

const getMin = function (arr) {
    var minInd = 0;
    for (var i = 1; i < arr.length; i++)
        if (arr[i] < arr[minInd])
            minInd = i;
    ;
    return minInd;
};
const getMax = function (arr) {
    var maxInd = 0;
    for (var i = 1; i < arr.length; i++)
        if (arr[i] > arr[maxInd])
            maxInd = i;
    ;
    return maxInd;
};
const minOf2 = function (x, y) {
    return (x < y) ? x : y;
};
