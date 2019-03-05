export const totalPerCurrency = (incomes, expenses) => {
    const transactionSum = {};
    incomes.forEach((income)=>{
        if (!transactionSum[income.currency]) {
            transactionSum[income.currency]=0
            transactionSum[income.currency]+=income.amount
        } else {
            transactionSum[transaction.currency]+=income.amount
        };
    });
    expenses.forEach((expense)=>{
        if (!transactionSum[expense.currency]) {
            transactionSum[expense.currency]=0
            transactionSum[expense.currency]-=expense.amount
        } else {
            transactionSum[expense.currency]-=expense.amount
        };
    });
    return transactionSum
};

