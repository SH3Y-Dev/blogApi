const express = require('express');
const postRouter = require('./routes/post.routes');
const userRouter = require('./routes/user.routes');
var cors = require('cors')


const app = express();
app.use(cors())

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.use("/api", userRouter)
app.use("/api", postRouter)

module.exports = app;