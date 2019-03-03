import React from 'react';
import TransactionList from './TransactionList';
import TransactionListFilters from './TransactionListFilters';
import TransactionsSummary from './TransactionsSummary';

const TransactionDashboardPage = () => (
  <div>
    <TransactionsSummary />
    <TransactionListFilters />
    <TransactionList />
  </div>
);

export default TransactionDashboardPage;
