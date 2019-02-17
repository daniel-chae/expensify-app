const express = require('express');
const app = express();
// We now have express application
const port = process.env.PORT || 3000;

const path = require('path');
const publicPath = path.join(__dirname, '..', 'public');

app.use(express.static(publicPath));
//register middleware
//something runs for each request

app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, () => {
    console.log('Server is up');
});