'use strict';
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const { JWT_SECRET } = require('../config');
<<<<<<< HEAD

=======
//const JWT_SECRET = 'PURPLE_FRUIT;';
>>>>>>> 7b808c6c18fd2266551877a0eb98c2d4f78fcc1b
const options = {
  secretOrKey: JWT_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
  algorithms: ['HS256']
};
  
const jwtStrategy = new JwtStrategy(options, (payload, done) => {
  done(null, payload.user);
});

module.exports  = jwtStrategy;