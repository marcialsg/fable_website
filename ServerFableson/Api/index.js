const express = require('express');
const app = express();
const cors = require("cors");

console.log('SERVER STARTED');

app.use(express.json());
app.use(cors());


const scenathonRouter = require('./scenathon');
const scenathonPrivateRouter = require('./scenathonPrivate');
const scenathon2023Router = require('./scenathon2023');

//routes
app.use(scenathonRouter);
app.use(scenathonPrivateRouter);
app.use(scenathon2023Router);


//build routes with c queries
app.listen(4000, () => {
    console.log(`listening ${4000}`);
});