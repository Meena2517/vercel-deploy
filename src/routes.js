const express = require('express');
const router = express.Router();
const controller = require('./controller');

// router.get('/mongodb-data', controller.getMongoDBData);
// router.post('/postmongodb-data', controller.postMongoDBData);
router.get('/getdetails', controller.getData);
router.post('/insertData', controller.insertData);
router.delete('/deleteData/:id', controller.deleteData);
router.put('/updateData/:id',controller.updateData )


module.exports = router;
