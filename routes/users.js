var express = require('express');
var User = require('../database/user');

var router = express.Router();

router.get('/', function (req, res, next) {
  User.find({})
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
});

router.post('/', function (req, res, next) {
  console.log(req.body);
  const user = new User({
    name: req.body.name,
    passwd: req.body.passwd,
  
  });
  user.save()
    .then((result) => {
      console.log(result);
      res.status(201).json(result);
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
});

module.exports = router;
