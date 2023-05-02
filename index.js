const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const methodOverride = require('method-override');
const { default: mongoose } = require('mongoose');
const thoughtApiRoutes = require('./routes/thought-api-routes');
const thoughtRoutes = require('./routes/thought-routes');

require('dotenv').config({ path: __dirname + '/.env' });


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(thoughtRoutes);
app.use(thoughtApiRoutes);

app.use((req, res) => {
    const link = req.url;
    res.status(404).render('notfound', { link });
})
const db = process.env['MONGO_URL'];

mongoose
    .connect(db)
    .then((res) => console.log('Connected to DB'))
    .catch((error) => console.log(error));

app.listen('3000', () => {
    console.log('Listening on port 3000');
});