// const cors = require("cors")

const express = require('express');
const app = express();

app.use(express.static('./dist/monolith'));
// app.use(cors());
app.get('/*', (req, res)=>
    // res.sendFile('index.html', {root: 'src/'}),
    res.sendFile('index.html', {root: 'dist/cipher/browser/'}),
);

app.listen(process.env.PORT || 8080);