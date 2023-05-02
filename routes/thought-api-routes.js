const express = require('express');
const { getThoughts, postThought, getThought, updateThought, deleteThought, show404,  } = require('../controllers/api-thought-controller');

const router = express.Router();

router.get('/api/', getThoughts);
router.post('/api/postThoughts', postThought);
router.get('/api/thoughts/:id', getThought);
router.patch('/api/thoughts/:id', updateThought);
router.delete('/api/thoughts/:id', deleteThought);

module.exports = router;