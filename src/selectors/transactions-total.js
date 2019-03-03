export default (transactions) => {
    return transactions.reduce((accumulator, transaction)=>{
        return accumulator+transaction.amount
    }, 0)
}