const settingsReducerDefaultState = {};

export default (state = settingsReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_CATETORY':
      return {
          ...state,
          categories: [...categories, action.category]
      }
    case 'SET_CATEGORIES':
      return {
        ...state,
        categories: action.categories
      }
    case 'SET_RATES':
      return {
        ...state,
        rates: action.rates
      }
    default:
      return state;
  }
};