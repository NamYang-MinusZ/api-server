var express = require('express');
var Busdata = require('../database/busdata');
var ping = require ("net-ping");
var router = express.Router();

router.get('/', function (req, res, next) {
  
    console.log(typeof(req.query.CARD_CALL_NUM));
  if(req.query.CARD_CALL_NUM==1){
    Busdata.find({},{},{skip:0,limit:18})
    .then((busdatas) => {
     
        console.log(busdatas);
        res.json(busdatas);
      
      
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });0
  }
  else{
  Busdata.find({},{},{skip : 18*(req.query.CARD_CALL_NUM-1),limit:18})
    .then((busdatas) => {
      
     
        console.log(busdatas);
        res.json(busdatas);
      
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
  }

  
  
});
router.get('/location_call', function (req, res, next) {
  Busdata.find({bus_id:req.query.bus_id})
    .then((busdatas) => {
      console.log(busdatas);
      res.json(busdatas[0].location);
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
  
  
});
router.get('/chartdata_call', function (req, res, next) {
  Busdata.find({bus_id:req.query.bus_id})
    .then((busdatas) => {
      console.log(busdatas);
      res.json({ bus_id : busdatas[0].bus_id ,concentration: busdatas[0].concentration});
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
  
  
});
router.get('/:id', function (req, res, next) {
  Busdata.find({bus_id : req.params.id})
    .then((busdatas) => {
      if(busdatas.length==0){
        res.status(404).json({"status": 404});
      }else{
        res.json(busdatas);
      }
      
    })
    .catch((err) => {
      
      console.error(err);
      next(err);
    });
});
router.post('/', function (req, res, next) {
    console.log(req.body);
    console.log(req.headers);
    let array12=[]
    array12.push(req.body.concentration);
  const busdata = new Busdata({
    bus_id: req.body.bus_id,
    bus_name: req.body.bus_name,
    concentration: array12,
    location: req.body.location,
  });
  busdata.save()
    .then((result) => {
      console.log(result);
      res.status(201).json(result);
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
});
router.patch('/', function (req, res, next) {
  console.log(req.body);
Busdata.find({ bus_id: req.body.bus_id})
.then((result) => {
    console.log(result[0].concentration);
    result[0].concentration.push(req.body.concentration);
    Busdata.update({_id:result[0]._id},{concentration: result[0].concentration})
    .then((upresult) => {
      res.status(201).json(upresult);
  })
  .catch((err) => {
      console.error(err);
      next(err);
  });
    console.log(result);
    res.status(201).json(result);
})
.catch((err) => {
    console.error(err);
    next(err);
});
});

module.exports = router;