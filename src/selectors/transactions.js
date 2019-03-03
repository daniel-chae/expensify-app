import moment from 'moment'
// Get visible expenses

export default (transactions, { text, sortBy, startDate, endDate }) => {
  return transactions.filter((transaction) => {
    const createdAtMoment = moment(transaction.createdAt)
    const startDateMatch = startDate ? createdAtMoment.isSameOrAfter(startDate, 'day') : true;//updated this to use moment
    const endDateMatch = endDate ? createdAtMoment.isSameOrBefore(endDate, 'day'): true;
    const textMatch = transaction.description.toLowerCase().includes(text.toLowerCase());
    return startDateMatch && endDateMatch && textMatch;
  }).sort((a, b) => {
    if (sortBy === 'date') {
      return a.createdAt < b.createdAt ? 1 : -1;
    } else if (sortBy === 'amount') {
      return a.amount < b.amount ? 1 : -1;
    }
  });
};
