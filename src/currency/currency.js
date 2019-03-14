import currencyjs from './currency.min';

// Related to available App currency

export const currencyList = {
    'USD':'\u0024',
    'THB':'\u0E3F',
    'KRW':'\u20A9',
    'EUR':'\u20AC',
    'JPY':'\u00A5',
    'INR':'\u20B9'
}

export const getFormattedCurrency = (amount, currency) =>{
    switch (currency) {
        case "USD":
            return currencyjs(amount).format(true);
        case "JPY":
            return currencyjs(amount, { symbol: '\u00A5', decimal: '.', separator: ',' }).format(true);
        case "EUR":
            return currencyjs(amount, { symbol: '\u20AC', decimal: '.', separator: ',' }).format(true);
        case "INR":
            return currencyjs(amount, { symbol: '\u20B9', decimal: '.', separator: ',' }).format(true);
        case "KRW":
            return currencyjs(amount, { symbol: '\u20A9', decimal: '.', separator: ',' }).format(true);
        case "THB":
            return currencyjs(amount, { symbol: '\u0E3F', decimal: '.', separator: ',' }).format(true);
        default:
            return amount
    }
}

// Related to Exchange Rates and conversion

