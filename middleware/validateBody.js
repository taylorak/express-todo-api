function validateBody(bodyParams) {
  return function(req, res, next) {
    var body = req.body;

    var isValid = Object.keys(bodyParams).every(function(key) {

      if(bodyParams[key] === 'number'){
        if(parseInt(body[key]).toString() === body[key]) {
          return true;
        }
      }

      if(bodyParams[key] === 'boolean' && body[key] !== 'true' && body[key] !== 'false') {
        return false;
      }

      return body.hasOwnProperty(key);
    });

    if(isValid) {
      next();
    } else {
      res.json({ success : false});
    }
  };
}

module.exports = validateBody;