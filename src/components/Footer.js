import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default (props) => (
    <div className="page-footer">
        <Link className="button button--income" to="/income/create"><FontAwesomeIcon icon="plus" /> Income</Link>
        <Link className="button button--expense button--twobuttons" to="/expense/create"><FontAwesomeIcon icon="minus" /> Expense</Link>
    </div>
)
