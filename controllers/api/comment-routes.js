const express = require('express');
const router = express.Router();
const { Comment } = require('../../models');

router.post('/', async (req, res) => {
    try {
        const { body, session: { user_id } } = req;
        const newComment = await Comment.create({ ...body, user_id });
        res.status(200).json(newComment);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Failed to create comment' });
    }
});

module.exports = router;
