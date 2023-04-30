const express = require('express');
const app = express();
const path = require('path');
//let thoughts = require('./thoughts.json')
const fs = require('fs');
const { v4: uuid } = require('uuid');
const methodOverride = require('method-override')


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

let thoughts = [
    {
        "username": "Alex",
        "text": "I love my significant one",
        "id": "edd53782-b646-41d6-87fe-506719f80ced"
    },
]

app.get('/thoughts', (req, res) => {
    res.render('home', { thoughts });
})

app.get('/thoughts/new', (req, res) => {
    res.render('new');
})

app.post('/thoughts', (req, res) => {
    const { username, text } = req.body;
    thoughts.push({ username, text, id: uuid() });
    res.redirect('/thoughts');
});

app.get('/thoughts/:id', (req, res) => {
    const { id } = req.params;
    const thought = thoughts.find(t => t.id === id);
    res.render('details', { thought });

});

app.patch('/thoughts/:id', (req, res) => {
    const { id } = req.params;
    const newText = req.body.text;
    const thought = thoughts.find(t => t.id === id);
    thought.text = newText;
    console.log("Updated");
    res.redirect('/thoughts');
});

app.delete('/thoughts/:id', (req, res) => {
    const { id } = req.params;
    thoughts = thoughts.filter(t => t.id !== id);
    console.log("Deleted");
    res.redirect('/thoughts');
})



app.get('*', (req, res) => {
    const link = req.url;
    res.render('notfound', { link });
});

app.listen('3000', () => {
    console.log('Listening on port 3000');
});

