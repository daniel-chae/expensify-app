import database from '../firebase/firebase';

// ADD_INCOME
export const addIncome = (income) => ({
  type: 'ADD_INCOME',
  income
});

export const startAddIncome = (incomeData = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const {
      description = '',
      note = '',
      amount = 0,
      currency = '',
      createdAt = 0,
      type = 'income'
    } = incomeData;
    const  income = { description, note, amount, createdAt, type, currency };
    return database.ref(`users/${uid}/incomes`).push(income).then((ref)=>{
      dispatch(addIncome({
        id: ref.key,
        ...income
      }))
    })
  };
};


// REMOVE_INCOME
export const removeIncome = ({ id }) => ({
  type: 'REMOVE_INCOME',
  id
});

//export startRemoveExpense
export const startRemoveIncome = ({ id }) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/incomes/${id}`).remove().then(()=>{
      dispatch(removeIncome({ id }));
    });
  }
}

// EDIT_EXPENSE
export const editIncome = (id, updates) => ({
  type: 'EDIT_INCOME',
  id,
  updates
});

//export startEditExpense
export const startEditIncome = (id, updates) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/incomes/${id}`).update(updates).then(()=>{
      dispatch(editIncome(id, updates))
    })
  }
}

// SET_EXPENSES
export const setIncomes = (incomes) => {
  console.log("test2")
  return {
  type: 'SET_INCOMES',
  incomes
  }
}

// export const startSetExpenses;
export const startSetIncomes = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/incomes`).once('value').then((snapshot)=>{
      const incomes = [];
        snapshot.forEach((childSnapshot)=>{
        incomes.push({
          id: childSnapshot.key,
          ...childSnapshot.val()})
        dispatch(setIncomes(incomes));
        });
    });
  }
}

