var express = require('express');
var router = express.Router();

const userController = require('./../controller/userController')


/* GET users listing. */
router.get('/getUsers', function(req, res, next) {
  userController.getUserLIst().then((resp)=>{
    console.log(resp)
    res.send(resp);

  }).catch((err)=>{
    res.status(500).send(err);

  })
});

router.post('/getUser',function(req,res,next){
  console.log(req.body)
  userController.getUserById(req).then((resp)=>{
    res.send(resp);

  }).catch((err)=>{
    res.status(500).send(err);

  })
})

/*Api for get setting   */
router.post('/getSettings',function(req,res,next){
  userController.getSettings(req).then((resp)=>{
    res.send(resp);

  }).catch((err)=>{
    res.status(500).send(err);

  })
})

/* Api for adding user */
router.post('/addUser', function(req, res, next) {
  userController.createUser(req).then((resp)=>{
    res.send(resp);
  }).catch((err)=>{
    console.log(err)
    res.status(500).send(err);
  })
});

/*Api for add settings */

router.post('/addSetting',function(req,res,next){
  console.log("ffff",req.body)
  userController.addSetting(req).then((resp)=>{
      console.log(resp)
      res.send(resp);

  }).catch((error)=>{
    console.log(error)
    res.status(500).send(err);

  })
})



module.exports = router;
