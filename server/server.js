const express = require('express');
const app = express();
// We now have express application
const port = process.env.PORT || 3000;

const path = require('path');
const publicPath = path.join(__dirname, '..', 'public');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static(publicPath));
//register middleware
//something runs for each request

app.get('*', function(req, res, next) {
    res.sendFile(path.join(publicPath, 'index.html'));
});

// app.get('*', (req, res) => {
//     res.sendFile(path.join(publicPath, 'index.html'));
// });

app.listen(port, () => {
    console.log('Server is up');
});


