import React from 'react';
import TransactionList from './TransactionList';
import TransactionListFilters from './TransactionListFilters';

const TransactionDetailPage = () => (
    <div>
      <div className="page-header">
        <div className="content-container">
            <h1>Finance Detail</h1>
        </div>
      </div>
      <TransactionListFilters />
      <TransactionList />
    </div>
  );

export default TransactionDetailPage;
