const { Router } = require('express');
const Post = require('../models/Post');
const router = Router();

router
  .get('/', async (req, res) => {
    const posts = await Post.getAll();
    res.json(posts);
  });

module.exports = router;
