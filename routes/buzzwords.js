var express = require('express');
var router = express.Router();

var buzzWords = [];
router.route('/')
  .get(function(req, res) {
    res.json({ buzzWords : buzzWords });
  })
  .post(function(req, res) {
    var buzzWord = req.body.buzzWord;
    var points = req.body.points;

    if(buzzWord && points) {
      buzzWords.push({
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

    if(buzzWord && heard) {
      for(var i = 0; i < buzzWords.length; i++) {
        if(buzzWords[i].buzzWord === buzzWord) {
          buzzWords[i].heard = heard;
          res.json({ success : true });
        }
      }
    } else {
      res.json({ success : false});
    }
  })
  .delete(function(req, res) {
    var buzzWord = req.body.buzzWord;

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