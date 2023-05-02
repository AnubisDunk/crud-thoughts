const express = require('express');
const { getThoughts, postThought, getThought, updateThought, deleteThought, show404, newThought } = require('../controllers/thought-controller');

const router = express.Router();

router.get('/', getThoughts);
router.get('/thoughts/new', newThought);
router.post('/thoughts', postThought);
router.get('/thoughts/:id', getThought);
router.patch('/thoughts/:id', updateThought);
router.delete('/thoughts/:id', deleteThought);
router.get('*', show404);

module.exports = router;