const router = require('express').Router();
const { comment } = require('../../models');
const withAuth = require('../../utils/auth');
router.get('/', (req, res) => {
  comment.findAll({})
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
});

router.get(':/id', (req, res) => {
  comment.findAll ({
    where: {
      id: req.params.id
    }
  })
  .then (dbCommentData => res.json(dbCommentData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.post('/', withAuth, (req, res) => {
  if (req.session) {
    comment.create({
      comment_text: req.body.comment_text,
      post_id: req.body.post_id,
      user_id: req.session.user_id,
    })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    })
  }
});

router.put('/:id', withAuth, (req, res) => {
  comment.update ({
    comment_text: req.body.comment_text
  }, {
    where: {
      id: req.params.id
    }
  }) .then(dbCommentData => {
    if (!dbCommentData) {
      res.status(404).json({ message: 'sorry! No comment is found with this id.'});
      return;
    }
    res.json(dbCommentData);
  }) .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.delete('/:id', withAuth, (req, res) => {
  comment.destroy ({
    where: {
      id: req.params.id
    }
  }) .then(dbCommentData => {
    if (!dbCommentData) {
      res.status(404).json({ message: 'Sorry! No comment found with this id'});
      return;
    }
    res.json(dbCommentData);
  }).catch (err);
  res.status(500).json(err);
});

module.exports = router;
