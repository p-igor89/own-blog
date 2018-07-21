'use strict';

let express = require('express');
let router = express.Router();
let mongoose = require('../mongoose');

let User = require('../models/user');
let Post = require('../models/post');
let Work = require('../models/work');

// Main
router.get('/', function (req, res) {
  res.render('index/index');
});

// Работы
router.get('/works', function (req, res) {
  Work.getAll().then(function (works) {
    res.render('works/works', {
      works: works
    });
  });
});

// About me
router.get('/about', function (req, res) {
  let Model = mongoose.model('skillscategory');

  Model.find().exec(function (error, data) {
    let skills = data.reduce(function (prev, cur, i) {
      prev[cur.name] = cur.skills.reduce(function (prev, cur) {
        prev[cur.name] = cur.percent;

        return prev;
      }, {});

      return prev;
    }, {});

    res.render('about/about', {
      skills: skills
    });
  });
});

// Blog
router.get('/blog', function (req, res) {
  Post.getAll().then(function (posts) {
    res.render('blog/blog', {
      posts: posts
    });
  });
});

// Authentication
router.post('/login', function (req, res) {
  User.check(req.body.login, req.body.password).then(function (user) {
    req.session._id = user._id;
    req.session.login = user.login;

    res.send({
      status: 'success',
      redirect: '/admin'
    });
  }, function () {
    res.send({
      status: 'error',
      message: 'Incorrect login or password!'
    });
  });
});

module.exports = router;