'use strict';
//require('dotenv').config();






module.exports = {
      PORT: process.env.PORT || 8080,
      // MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost/noteful',
      // TEST_MONGODB_URI: process.env.TEST_MONGODB_URI || 'mongodb://localhost/noteful-test',
      JWT_SECRET: 'PURPLE_FRUIT',
      JWT_EXPIRY: '7d',
      DATABASE_URL:
        process.env.DATABASE_URL || 'mongodb://localhost/thinkful-backend',
  TEST_DATABASE_URL:
        process.env.TEST_DATABASE_URL ||
        'mongodb://localhost/thinkful-backend-test'
    };
// module.exports = {
//       PORT: process.env.PORT || 8080,
//       // MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost/noteful',
//       // TEST_MONGODB_URI: process.env.TEST_MONGODB_URI || 'mongodb://localhost/noteful-test',
//       JWT_SECRET: process.env.JWT_SECRET,
//       JWT_EXPIRY: process.env.JWT_EXPIRY || '7d'
//     };




    module.exports = {
  PORT: process.env.PORT || 8080,
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || 'http://localhost:3000',
  DATABASE_URL:
        process.env.DATABASE_URL || 'mongodb://localhost/thinkful-backend',
  TEST_DATABASE_URL:
        process.env.TEST_DATABASE_URL ||
        'mongodb://localhost/thinkful-backend-test'
  // DATABASE_URL:
  //     process.env.DATABASE_URL || 'postgres://localhost/thinkful-backend',
  // TEST_DATABASE_URL:
  //     process.env.TEST_DATABASE_URL ||
  //     'postgres://localhost/thinkful-backend-test'
};
