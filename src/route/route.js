const express = require('express')
// const multer = require('multer')
const Deskcontroller = require('../controller/controller')
const Deskcontroller1 = require('../controller/controllerSignup')
const generatePDF = require('../controller/controllerPdf');
// const Deskcontroller2 = require('../controller/controllerimage')
const router = express.Router();
const verifyToken = require('../controller/verifyToken');


const multer = require('multer');

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/postdata', upload.single('image'), Deskcontroller.addDesk);
router.get('/getdata',verifyToken, Deskcontroller.getDesks)
router.get('/getalldata',Deskcontroller.getAllDesks)
router.get('/id/:id', Deskcontroller.getDeskById);
router.delete('/deletedata/:id', Deskcontroller.deleteDesk);
router.put('/updatedata/:id',upload.single('image'), Deskcontroller.updateDesk)


router.post('/signupdata',Deskcontroller1.addSignup);
router.get('/getSignupdata',Deskcontroller1.getSignup);
router.post('/sendotp', Deskcontroller1.checkandSendOTP);
router.post('/verifyotp', Deskcontroller1.verifyOTP);
router.post('/Forgotverifyotp', Deskcontroller1.ForgotverifyOTP);
// router.post('/forgotpasswordpage')
// router.get('/clear-response-data',Deskcontroller1.clearresponse);
router.put('/updatesignupdata/:id', Deskcontroller1.updateDesk);

router.post('/checklogin', Deskcontroller1.addlogin)
router.post('/checkforgotpassword', Deskcontroller1.addforgotpassword)


router.put('/Updatedeletedata/:id', Deskcontroller.updateDeleteDesk);

router.put('/addoutemployee/:id', Deskcontroller.addoutemployee);
router.post('/sendFeedback', Deskcontroller1.sendFeedbackMail);



router.post('/generatePDF', upload.single('photo'), generatePDF.generatePDF);
router.post('/postResumeData', upload.single('photo'), generatePDF.addDesk);
router.get('/getResumeData', generatePDF.getResumeData);
router.put('/updateResumeData/:id',upload.single('photo'), generatePDF.updateResumeData);
router.get('/getResumeDatabyID', generatePDF.getResumeDatabyID);


// router.post('/add',upload.single('file'),Deskcontroller2.addImage);
module.exports = router;
