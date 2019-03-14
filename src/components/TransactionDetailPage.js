import React from 'react';
import TransactionList from './TransactionList';
import TransactionListFilters from './TransactionListFilters';

const TransactionDetailPage = () => (
    <div>
      <TransactionListFilters />
      <TransactionList />
    </div>
  );

export default TransactionDetailPage;
