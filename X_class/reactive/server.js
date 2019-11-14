const express = require('express')

const app = express()
const port = 8080

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PATCH");
    next();
});
app.use(express.static('static'))


app.listen(port, () => console.log(`Server is listening on ${port}`))
