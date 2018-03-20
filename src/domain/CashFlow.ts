let N = 0
export const CashFlow = (graph) => {
  N = graph.length
  let result = []
  minCashFlow(graph, result)
  return result
}

const minCashFlowRec = function (amount, result) {
    var mxCredit = getMax(amount);
    var mxDebit = getMin(amount);
    if (amount[mxCredit] === 0 && amount[mxDebit] === 0)
        return;
    var min = minOf2(-amount[mxDebit], amount[mxCredit]);
    amount[mxCredit] -= min;
    amount[mxDebit] += min;
    //console.info("Person " + ( mxDebit+ 1) + " pays " + min + " to " + "Person " + ( mxCredit+ 1));
    result.push({
      debtorIndex: mxDebit,
      payAmount: min,
      creditorIndex: mxCredit
    })
    minCashFlowRec(amount, result);
};

const initialAmount = (numberOfFriends: number) => {
  let amount = []
  while (numberOfFriends-- > 0) {
    amount.push(0)
  }
  return amount
}

const minCashFlow = (graph, result) {
    let amount = initialAmount(N)
    for (let creditorIndex = 0; creditorIndex < N; creditorIndex++){
      for (let debtorIndex = 0; debtorIndex < N; debtorIndex++){
        const credit = graph[debtorIndex][creditorIndex]
        const debit = graph[creditorIndex][debtorIndex]
        amount[creditorIndex] += (credit - debit)
      }
    }
    minCashFlowRec(amount, result);
}

const getMin = function (arr) {
    var minInd = 0;
    for (var i = 1; i < N; i++)
        if (arr[i] < arr[minInd])
            minInd = i;
    ;
    return minInd;
};
const getMax = function (arr) {
    var maxInd = 0;
    for (var i = 1; i < N; i++)
        if (arr[i] > arr[maxInd])
            maxInd = i;
    ;
    return maxInd;
};
const minOf2 = function (x, y) {
    return (x < y) ? x : y;
};
