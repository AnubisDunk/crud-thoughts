const Thought = require('../models/thought');

const getThoughts = async (req, res) => {
    const thoughts = await Thought.find({}).sort({createdAt:-1});
    res.render('home', { thoughts });
};
const postThought = async (req, res) => {
    try {
        const { username, text } = req.body;
        const thought = new Thought({ username, text });
        await thought.save();
        console.log("Saved");
        res.redirect('/');
    }
    catch (err) {
        res.send("err");
    }
}
const newThought = (req, res) => {
    res.render('new');
}

const getThought = async (req, res) => {
    const { id } = req.params;
    const thought = await Thought.findById(id);
    res.render('details', { thought });
}

const updateThought = async (req, res) => {
    const { id } = req.params;
    const newText = req.body.text;
    const thought = await Thought.findByIdAndUpdate(id, { text: newText });
    res.redirect('/');
}

const deleteThought = async (req, res) => {
    const { id } = req.params;
    const thought = await Thought.findByIdAndDelete(id);
    console.log("Deleted");
    res.redirect('/');
}


module.exports = {
    getThoughts,
    newThought,
    postThought,
    getThought,
    updateThought,
    deleteThought,
};