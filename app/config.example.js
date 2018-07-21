'use strict';

const config = {
  http: {
    host: 'localhost',
    port: 3000
  },
  db: {
    host: 'localhost',
    port: '27017',
    name: 'portfolio',
    user: '',
    password: ''
  },
  path: {
    // Static file
    static: '../build/',
    templates: '../build/template/pages',
    // Default content file
    content: '../build/template/data/content.json',
    // Download Folder
    upload: 'upload'
  },
  secure: {
    // Master Salt
    salt: 'salt',
    // Length of generated salt in bytes
    saltBytes: 16,
    // Hash algorithm
    algoritm: 'sha512',
    // The secret of the session :)
    sessionSecret: 'sessionSecret'
  },
  // Acceptable types of uploaded images
  avaibleUploadFileTypes: [
    'image/gif',
    'image/jpeg',
    'image/png',
    'image/pjpeg'
  ],
  // Maximum download size in bytes
  maxUploadFileSize: 5000000
};

module.exports = config;