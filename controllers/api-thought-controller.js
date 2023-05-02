const Thought = require('../models/thought');

const handleError = async (res, err) => {
    res.status(500).send(err);
}
const getThoughts = async (req, res) => {
    try {
        const thoughts = await Thought.find({});
        res.status(200).json(thoughts);
    } catch (err) {
        handleError(res, err);
    }
};
const postThought = async (req, res) => {
    try {
        const { username, text } = req.body;
        const thought = new Thought({ username, text });
        await thought.save();
        res.status(200).json(thought);
    }
    catch (err) {
        handleError(res, err);
    }
}

const getThought = async (req, res) => {
    try {
        const { id } = req.params;
        const thought = await Thought.findById(id);
        res.status(200).json(thought);
    } catch (err) {
        handleError(res, err);
    }
}

const updateThought = async (req, res) => {
    try {
        const { id } = req.params;
        const newText = req.body.text;
        const thought = await Thought.findByIdAndUpdate(id, { text: newText });
        res.status(200).json(thought);
    } catch (err) {
        handleError(res, err);
    }
}

const deleteThought = async (req, res) => {
    try {
        const { id } = req.params;
        const thought = await Thought.findByIdAndDelete(id);
        res.status(200).json(id);
    } catch (err) {
        handleError(res, err);
    }
}



module.exports = {
    getThoughts,
    postThought,
    getThought,
    updateThought,
    deleteThought,
};