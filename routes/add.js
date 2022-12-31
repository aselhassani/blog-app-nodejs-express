var express = require('express');
var router = express.Router();

const mongoRepository =  require("../mogoose.js");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('add', { title: 'Add'});
});

module.exports = router;
