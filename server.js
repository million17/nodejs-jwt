/**
 * Created by trieu.ngoquang author on 12/3/20 - 11:01.
 * nodejs-jwt
 */
require('dotenv').config()

const express = require('express');
const app = express();
const initAPIs = require('./src/routes/apis');

app.use(express.json());
const port = 8080;
initAPIs(app);

app.listen(port, () => {
    console.log(`Server started ${port}`)
});