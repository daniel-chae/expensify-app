import React from 'react';
import { NavLink } from 'react-router-dom';

const ExpenseListItem = ({ description, amount, createdAt, id }) => (
    <div> 
        <NavLink to = {`/edit/${id}`}> 
            <h3>{description}</h3>
        </NavLink>
        <p>{amount} - {createdAt}</p>
    </div>
);

//Template string goes between two backtick `` variable can be part of string by using ${variable}

export default ExpenseListItem;