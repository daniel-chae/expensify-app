import database from '../firebase/firebase';

export const setCategories = (categories) => ({
    type: 'SET_CATEGORIES',
    categories
  })
  
export const startSetCategories = () => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/settings/categories`).once('value').then((snapshot)=>{
            const categories = [];
            snapshot.forEach((childSnapshot)=>{
            categories.push(
            childSnapshot.val())
            dispatch(setCategories(categories));
            });
        });
    }
}

export const initializeCategory = (uid, store) => {
    return database.ref(`users/${uid}/settings/categories`).once('value').then((snapshot)=>{
        const initialUser = !snapshot.exists()
        if (initialUser) {
            const initialCategories = ['Rent', 'Food', 'Transportation', 'Utilities', 'Shopping', 'Hobby'];
            database.ref(`users/${uid}/settings/categories`).set(initialCategories).then(()=>{
                store.dispatch(startSetCategories());
            })
        } else {
            store.dispatch(startSetCategories()).then(()=>{
            });
        }   
    })
}

export const setRates = (rates) => ({
    type: 'SET_RATES',
    rates
  })

export const initializeRates = async (store) => {
    const response = await fetch(`https://openexchangerates.org/api/latest.json?app_id=9e844f98921a4005897657f751480c4b`);
    if (response.status === 200) {
        const data = await response.json();
        store.dispatch(setRates(data.rates));
    }
}