export default (expenses) => {
    return expenses.reduce((accumulator, expense)=>{
        return accumulator+expense.amount
    }, 0)
}