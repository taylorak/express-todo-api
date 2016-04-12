var request = require('supertest');
var app = require('../app.js');
var bingo = require('../database/bingo');
var chai = require('chai');
var expect = chai.expect;


describe('buzzword routes', function() {
  var entry = {
      buzzWord : 'test',
      points : 10,
      heard : false
    };

  beforeEach(function() {
    bingo.buzzWords = [entry];
  });

  describe('GET /buzzword', function() {
    it('should return a list of buzzwords', function(done) {
      request(app)
        .get('/buzzword')
        .expect({ "buzzWords" : [entry] })
        .expect(200)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });

  describe('POST /buzzword', function() {
    it('should create a new buzzword object', function(done) {

      var body = {
        buzzWord : 'POST',
        points : 5
      };

      request(app)
        .post('/buzzword')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send(body)
        .expect({ "success" : true })
        .expect(200)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          expect(bingo.buzzWords).to.have.lengthOf(2);
          done();
        });

    });
  });

  describe('PUT /buzzword', function() {
    it('should update a buzzword', function(done) {
      var body = {
        buzzWord : 'test',
        heard : true
      };

      request(app)
        .put('/buzzword')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send(body)
        .expect({ "success" : true, newScore : 10 })
        .expect(200)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          expect(bingo.buzzWords.length).to.equal(1);
          expect(bingo.buzzWords.pop().heard).to.be.true;
          done();
        });
    });
  });

  describe('DELETE /buzzword', function() {
    it('should delete a buzzword', function(done) {
      var body = {
        buzzWord : 'test',
      };

      request(app)
        .delete('/buzzword')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send(body)
        .expect({ "success" : true })
        .expect(200)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          expect(bingo.buzzWords).to.have.lengthOf(0);

          done();
        });
    });
  });

});
