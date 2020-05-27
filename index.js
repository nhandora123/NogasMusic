const express = require('express');
const connectDB = require('./config/db');
const apiRoutes = require('./routes/apiRoutes')
const app = express();

const PORT = process.env.PORT || 1000;

const session = require('express-session');

app.use(session({
    secret: 'subee team',
    resave: false,
    saveUninitialized: true,
}))
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", apiRoutes());



connectDB();

app.listen(PORT, () => console.log(`App running on port ${PORT}`));