'use strict';
require('dotenv').config();






module.exports = {
      PORT: process.env.PORT || 8080,
      // MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost/noteful',
      // TEST_MONGODB_URI: process.env.TEST_MONGODB_URI || 'mongodb://localhost/noteful-test',
      JWT_SECRET: process.env.JWT_SECRET,
      JWT_EXPIRY: '7d',
      DATABASE_URL:
        process.env.DATABASE_URL || 'mongodb://WebUser:shadow8@ds251622.mlab.com:51622/dothraki',
  TEST_DATABASE_URL:
        process.env.TEST_DATABASE_URL ||
        'mongodb://localhost/thinkful-backend-test'
    };

