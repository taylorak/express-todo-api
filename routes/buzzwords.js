var express = require('express');
var validateBody = require('../middleware/validateBody');
var router = express.Router();

router.route('/')
  .get(function(req, res) {
    res.json({ buzzWords : req.bingo.buzzWords });
  })
  .post(validateBody({'buzzWord' : 'string', 'points' : 'number'}), function(req, res) {
    var buzzWord = req.body.buzzWord;
    var points = req.body.points;

    req.bingo.buzzWords.push({
      buzzWord : buzzWord,
      points : points,
      heard : false
    });
    res.json({ success : true });

  })
  .put(validateBody({'buzzWord' : 'string', 'heard' : 'boolean'}), function(req, res) {
    var buzzWord = req.body.buzzWord;
    var heard = Boolean(req.body.heard);
    var buzzWords = req.bingo.buzzWords;

    for(var i = 0; i < buzzWords.length; i++) {
      if(buzzWords[i].buzzWord === buzzWord) {
        buzzWords[i].heard = heard;
        if(heard === true) {
          console.log(buzzWords[i].points);
          req.bingo.score += parseInt(buzzWords[i].points);
        } else if (heard === false) {
          req.bingo.score -= parseInt(buzzWords[i].points);
        }
      }
    }
    res.json({ success : true, newScore: req.bingo.score });

  })
  .delete(validateBody({'buzzWord' : 'string'}), function(req, res) {
    var buzzWord = req.body.buzzWord;
    var buzzWords = req.bingo.buzzWords;

    for(var i = 0; i < buzzWords.length; i++) {
      if(buzzWords[i].buzzWord === buzzWord) {
        buzzWords.splice(i, 1);
        res.json({ success : true });
      }
    }

  });

  module.exports = router;