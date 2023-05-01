const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const { v4: uuid } = require('uuid');
const methodOverride = require('method-override');
const { default: mongoose } = require('mongoose');
const Thought = require('./models/thought')


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));


const db = 'mongodb+srv://anubisdark98:rQbnNoZU9ZoK1kSP@cluster0.yhhtoyn.mongodb.net/?retryWrites=true&w=majority';

mongoose
    .connect(db)
    .then((res) => console.log('Connected to DB'))
    .catch((error) => console.log(error));

app.get('/', (req, res) => {
    res.redirect('/thoughts');
})

app.get('/thoughts', async (req, res) => {
    const thoughts = await Thought.find({});
    res.render('home', { thoughts });
})

app.get('/thoughts/new', (req, res) => {
    res.render('new');
})

app.post('/thoughts', async (req, res) => {
    try {
        const { username, text } = req.body;
        const thought = new Thought({ username, text });
        await thought.save();
        console.log("Saved");
        res.redirect('/thoughts');
    }
    catch(err){
        res.send("err");
    }
});

app.get('/thoughts/:id', async(req, res) => {
    const { id } = req.params;
    const thought = await Thought.findById(id);
    res.render('details', {thought});

});

app.patch('/thoughts/:id', async(req, res) => {
    const { id } = req.params;
    const newText = req.body.text;
    const thought = await Thought.findByIdAndUpdate(id,newText);
    console.log("Updated");
    res.redirect('/thoughts');
});

app.delete('/thoughts/:id', async(req, res) => {
    const { id } = req.params;
    const thought = await Thought.findByIdAndDelete(id);
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


//rQbnNoZU9ZoK1kSP