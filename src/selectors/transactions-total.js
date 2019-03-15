export const getPerCurrencyBalance = (incomes=[], expenses=[]) => {
    const transactionSum = {};
    if (incomes.length!==0){
        incomes.forEach((income)=>{
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
            if (!transactionSum[expense.currency]) {
                transactionSum[expense.currency]=0
                transactionSum[expense.currency]-=expense.amount
            } else {
                transactionSum[expense.currency]-=expense.amount
            };
        });
    }
    return transactionSum
};

