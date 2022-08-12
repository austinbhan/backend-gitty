const { Router } = require('express');
const Post = require('../models/Post');
const router = Router();

router
  .get('/', async (req, res, next) => {
    try {
      const posts = await Post.getAll();
      res.json(posts);
    } catch(e) {
      next(e);
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const postData = await Post.insert(req.body);
      res.json(postData);
    } catch (e) {
      next(e);
    }
  });

module.exports = router;
