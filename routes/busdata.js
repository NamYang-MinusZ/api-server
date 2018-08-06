var express = require('express');
var busdata = require('../database/busdata');

var router = express.Router();

router.get('/:id', function (req, res, next) {
  busdata.find({ bus_id: req.params.id }).populate('bus_id')
    .then((busdatas) => {
      console.log(busdatas);
      res.json(s);
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
});

router.post('/', function (req, res, next) {
    console.log(req.body);
  const busdata = new Busdata({
    bus_id: req.body.bus_id,
    bus_name: req.body.bus_name,
    concentration: req.body.concentration,
    location: req.body.location,
  });
  busdata.save()
    .then((result) => {
        return Busdata.populate(result, { path: 'busdata' });
    })
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
});


module.exports = router;