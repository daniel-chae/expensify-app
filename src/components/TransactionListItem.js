import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { getFormattedCurrency } from '../currency/currency';

const TransactionListItem = ({ description, amount, createdAt, id, type, currency }) => (
        <Link className = 'list-item' to = {type === 'expense'?`expense/edit/${id}`:`income/edit/${id}`}> 
            <div>
                <h3 className = 'list-item__title'>{description}</h3>
                <span className = 'list-item__sub-title'>{moment(createdAt).format('MMMM Do, YYYY')}</span>           
            </div>
            <div className="list-item__align-right">
                <h3 className = {type === 'expense'?'list-item__data list-item__expense':'list-item__data list-item__income'}>
                    {getFormattedCurrency(amount/100, currency)}
                </h3>
                <span className = 'list-item__sub-title'>{type === 'expense'?'paid':'receieved'}</span>
            </div>

        </Link>
);

//Template string goes between two backtick `` variable can be part of string by using ${variable}

export default TransactionListItem;