var express = require('express');
var router = express.Router();

router.route('/')
  .get(function(req, res) {
    res.json({ buzzWords : req.bingo.buzzWords });
  })
  .post(function(req, res) {
    var buzzWord = req.body.buzzWord;
    var points = req.body.points;

    if(buzzWord && points) {
      req.bingo.buzzWords.push({
        buzzWord : buzzWord,
        points : points,
        heard : false
      })
      res.json({ success : true });
    } else {
      res.json({ success : false});
    }
  })
  .put(function(req, res) {
    var buzzWord = req.body.buzzWord;
    var heard = req.body.heard;
    var buzzWords = req.bingo.buzzWords;
    var newScore = req.bingo.buzzWords;

    if(buzzWord && heard) {
      for(var i = 0; i < buzzWords.length; i++) {
        if(buzzWords[i].buzzWord === buzzWord) {
          buzzWords[i].heard = heard;
          req.bingo.score += parseInt(buzzWords[i].points);
        }
      }
      res.json({ success : true, newScore: req.bingo.score });
    } else {
      res.json({ success : false});
    }
  })
  .delete(function(req, res) {
    var buzzWord = req.body.buzzWord;
    var buzzWords = req.bingo.buzzWords;

    if(buzzWord) {
      for(var i = 0; i < buzzWords.length; i++) {
        if(buzzWords[i].buzzWord === buzzWord) {
          buzzWords.splice(i, 1);
          res.json({ success : true });
        }
      }
    } else {
      res.json({ success : false});
    }
  })

  module.exports = router;