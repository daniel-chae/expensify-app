export const getQuote = async () => {
    const response = await fetch('https://cors-anywhere.herokuapp.com/https://favqs.com/api/qotd');
    if (response.status === 200){
        const data = await response.json();
        const quote = data.quote.body;
        const author = data.quote.author;
        return [quote, author]
    }

}

