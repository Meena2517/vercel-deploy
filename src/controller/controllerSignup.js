const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
var Desk = require('../model/modelsignup')
var { sendOTP, verifyOTP, sendFeedback } = require('../config/nodemailer')



module.exports.addSignup = async (req, res) => {
  try {
    let { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    let desk = new Desk({ username, email, password: hashedPassword });
    let result = await desk.save();
    res.send({ status: true, data: desk });
  }
  catch (error) {
    res.send({ status: false, data: error })
  }
}

// module.exports.addlogin = async (req,res) => {
//     try {
//         const { email, password } = req.body;
//         const user = await Desk.findOne({ email });
//         if (!user) {
//           return res.json({ status: false, message: 'Invalid email' });
//         }
//         const passwordMatch = bcrypt.compare(password, user.password);
//         if (passwordMatch) {
//           res.json({ status: true, data: { username: user.username } });
//         } else {
//           res.json({ status: false, message: 'Invalid password' });
//         }
//       } catch (error) {
//         console.error('Error logging in:', error);
//         res.status(500).json({ status: false, message: 'An error occurred while logging in' });
//       }
// }


  module.exports.addlogin = async (req, res) => {
    try {
      
      const { email, password } = req.body;
      const user = await Desk.findOne({ email });

      if (!user) {
        return res.json({ status: false, message: 'Invalid email' });
      }

      // Compare the entered password with the hashed password
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        const token = jwt.sign({ userId: user._id, email: user.email }, '123456', { expiresIn: '1h' });
        res.json({ status: true, data: { username: user.username, lastLoginTime: user.time, token, email : user.email } });
        const currentDate = new Date();
      const formattedDate = currentDate.toLocaleDateString('en-GB', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
      });

      user.time = formattedDate;
        const updatedDesk = await Desk.findByIdAndUpdate(user._id, user, {
          new: true,
        });
      } else {
        res.json({ status: false, message: 'Invalid password' });
      }
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ status: false, message: 'An error occurred while logging in' });
    }
  };

module.exports.addforgotpassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await Desk.findOne({ email });
    if (!user.email) {
      return res.json({ status: false, message: 'Invalid email' });
    }
    else {
      const result = await sendOTP(email);
      res.json({ status: true, data: { _id: user._id } });
    }
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ status: false, message: 'An error occurred while logging in' });
  }
}

module.exports.checkandSendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await Desk.findOne({ email });
    if (user && user.email === email) {
      console.log('Email already exists');
      res.json({ status: false, message: 'Email already exists' });
    } else {
      const result = await sendOTP(email);
      console.log('Email is valid');
      res.json({ status: true, message: 'Valid email' });
    }
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ status: false, message: 'An error occurred while logging in' });
  }
};


module.exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const result = await verifyOTP(email, otp)
    console.log(result);
    if (result.success) {
      res.json({ status: true, message: 'OTP verified' });
    }
    else {
      res.json({ status: false, message: 'Invalid OTP' });
    }
  }
  catch {
    console.error('Error logging in:', error);
    res.status(500).json({ status: false, message: 'An error occurred while logging in' });
  }
}



module.exports.ForgotverifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const result = await verifyOTP(email, otp);
    if (result.success) {
      res.json({ status: true, message: 'OTP verified' });
    }
    else {
      res.json({ status: false, message: 'Invalid OTP' });
    }
  }
  catch {
    console.error('Error logging in:', error);
    res.status(500).json({ status: false, message: 'An error occurred while logging in' });
  }
}













module.exports.getSignup = async (req, res) => {
  try {
    let desks = await Desk.find();
    res.send({ status: true, data: desks })
  }
  catch (error) {
    res.send({ status: false, data: error })
  }
}


module.exports.getDeskById = async (req, res) => {
  try {
    const { id } = req.params;
    const desk = await Desk.findById(id);
    if (!desk) {
      return res.send({ status: false, data: 'Desk not found' });
    }
    res.send({ status: true, data: desk });
  } catch (error) {
    res.send({ status: false, data: error });
  }
};


// module.exports.clearresponse = async (req,res) => {
//    // Clear the response data
//    res.status(204).send(); 
// }


// app.get('/clear-response-data', (req, res) => {
//   // Clear the response data
//   res.clear();
//   // Send a response indicating the data has been cleared
//   res.json({ message: 'Response data cleared' });
// });



module.exports.deleteDesk = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedDesk = await Desk.findByIdAndDelete(id);
    if (!deletedDesk) {
      return res.send({ status: false, data: 'Desk not found' });
    }
    res.send({ status: true, data: "data deleted succesfully" });
  } catch (error) {
    res.send({ status: false, data: error });
  }
};



module.exports.updateDesk = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedFields = req.body;
    updatedFields.password = await bcrypt.hash(updatedFields.password, 10);
    const updatedDesk = await Desk.findByIdAndUpdate(id, updatedFields, {
      new: true,
    });
    if (!updatedDesk) {
      return res.send({ status: false, message: 'Desk not found' });
    }
    res.send({ status: true, message: updatedDesk });
  } catch (error) {
    console.log(error);
    res.send({ status: false, message: 'Error updating desk' });
  }
};




module.exports.sendFeedbackMail = async (req, res) => {
  try {
    const reqData = req.body;
    const { email, name, message } = req.body;
      const result = await sendFeedback(email, name, message);
      res.json({ status: true, message: 'Send Successfully' });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ status: false, message: 'An error occurred while logging in' });
  }
};