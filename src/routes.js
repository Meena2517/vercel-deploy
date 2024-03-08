const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.get('/mongodb-data', controller.getMongoDBData);
router.post('/postmongodb-data', controller.postMongoDBData);


module.exports = router;
