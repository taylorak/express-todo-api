var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  req.bingo.buzzWords = [];
  req.bingo.score = 0;
  res.json({ success : true });
})

module.exports = router;