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
    //console.info("Person " + ( + 1) + " pays " + min + " to " + "Person " + ( + 1));
    result.push({
      debtorIndex: mxDebit,
      payAmount: min,
      creditorIndex: mxCredit
    })
    minCashFlowRec(amount, result);
};
const minCashFlow = function (graph, result) {
    var amount = (function (s) { var a = []; while (s-- > 0)
        a.push(0); return a; })(N);
    for (var p = 0; p < N; p++)
        for (var i = 0; i < N; i++)
            amount[p] += (graph[i][p] - graph[p][i]);
    ;
    minCashFlowRec(amount, result);
};

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
