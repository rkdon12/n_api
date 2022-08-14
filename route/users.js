const express = require('express');
const router = express.Router();
const user = require('../models/users');

/*Get Users*/
router.get('/', async function(req, res, next){
  try{
    res.json(await user.getUsers(res.query));
  }catch(err){
    console.error('Error While Getting User Information', err.message);
    next(err);
  }

});

module.exports = router;
