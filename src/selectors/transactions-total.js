export const getPerCurrencyBalance = (incomes=[], expenses=[]) => {
    const transactionSum = {};
    if (incomes.length!==0){
        incomes.forEach((income)=>{
            console.log("reached1")
            if (!transactionSum[income.currency]) {
                transactionSum[income.currency]=0
                transactionSum[income.currency]+=income.amount
            } else {
                transactionSum[income.currency]+=income.amount
            };
        });
    }
    if (expenses.length!==0){
        expenses.forEach((expense)=>{
            console.log("reached2")
            if (!transactionSum[expense.currency]) {
                transactionSum[expense.currency]=0
                transactionSum[expense.currency]-=expense.amount
            } else {
                transactionSum[expense.currency]-=expense.amount
            };
        });
    }
    console.log(transactionSum)
    return transactionSum
};

