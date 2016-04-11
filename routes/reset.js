var express = require('express');
var validateBody = require('../middleware/validateBody');
var router = express.Router();

router.post('/', validateBody({'reset' : 'boolean'}), function(req, res) {
  req.bingo.buzzWords = [];
  req.bingo.score = 0;
  res.json({ success : true });
});

module.exports = router;