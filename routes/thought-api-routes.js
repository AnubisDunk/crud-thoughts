const express = require('express');
const { getThoughts, postThought, getThought, updateThought, deleteThought, show404,  } = require('../controllers/api-thought-controller');

const router = express.Router();

router.get('/api/', getThoughts);
router.get('/api/thoughts', getThoughts);
router.post('/api/postThought', postThought);
router.get('/api/thoughts/:id', getThought);
router.patch('/api/thoughts/:id', updateThought);
router.delete('/api/thoughts/:id', deleteThought);

module.exports = router;