var express = require('express');
var router = express.Router();

const mongoRepository =  require("../mogoose.js");

/* GET home page. */
router.get('/', function(req, res, next) {
  mongoRepository.findAllArticles().then(data => {
    res.render('index', { title: 'Notre Blog', articles: data });
    mongoRepository.disconnect()
  })
});


/* POST home page. */
router.post('/', function(req, res, next) {
  const article = {...req.body}
  mongoRepository.saveArticle(article)
  const articles = mongoRepository.findAllArticles()
  res.render('index', { title: 'Express', articles: articles });
});


module.exports = router;
