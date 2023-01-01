var express = require('express');
var router = express.Router();

const mongoRepository =  require("../mogoose.js");

/* GET home page. */
router.get('/', function(req, res, next) {
  mongoRepository.findAllPosts()
  .then(data => {
    mongoRepository.disconnect()
    res.render('posts', { title: 'Notre Blog', articles: data });
  })
  .catch(err => console.log(err));
});

router.post('/', function(req, res) {
  console.log(req.body)
  mongoRepository.savePost({...req.body})
  .then(data => {
    mongoRepository.findAllPosts()
    .then(data => {
      res.render('posts', { title: 'Notre Blog', articles: data })
      mongoRepository.disconnect()
    })
    .catch(err => console.log(err))
  })
  .catch(err=> console.log(err))
});

router.get('/edit', function(req, res) {
  res.render('edit', { title: 'Edit', article:{_id: "", title:"", author: "", description: "", createdAt: null, updatedAt: null}});
});

router.get('/edit/:id', function(req, res) {
  const id = req.params.id;
  mongoRepository.findPostById(id)
  .then((data) => {
    res.render('edit', { title: 'Details', article: data });
    mongoRepository.disconnect();
  })
  .catch(err => console.log(err));
});

router.get('/:id', function(req, res) {
  const id = req.params.id;
  mongoRepository.findPostById(id)
  .then((data) => {
    res.render('post', { title: 'Details', article: data });
    mongoRepository.disconnect();
  })
  .catch(err => console.log(err));
});

module.exports = router;
