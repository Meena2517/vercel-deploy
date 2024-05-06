var Desk = require('../model/model')
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');


// module.exports.addDesk = async (req, res) => {
//     try {
//         let { name, email, password, mobileNumber, empid } = req.body;
//         let image = null;
//         if(req.file){
//             image = new mongoose.Types.Buffer(req.file.buffer);
//         }
//         let desk = new Desk({  name, email, password, mobileNumber, image, empid});
//         let result = await desk.save();
//         res.send({ status: true, data: desk });
//     }
//     catch (error) {
//         res.send({ status: false, data: error })
//     }
// }

// module.exports.addDesk = async (req, res) => {
//     try {
//         let { name, email, password, mobileNumber, empid } = req.body;
//         let image = null;
//         if(req.file){
//             image = new mongoose.Types.Buffer(req.file.buffer);
//         }
//         const timestamp = Date.now();
//         const year = (new Date().getFullYear())%100;
//         const uniqueId = Math.floor(Math.random() * 100);
//         empid = `CRT${year}${timestamp}`;
//         let desk = new Desk({  name, email, password, mobileNumber, image, empid});
//         let result = await desk.save();
//         res.send({ status: true, data: desk });
//     }
//     catch (error) {
//         res.send({ status: false, data: error })
//     }
// }



module.exports.addDesk = async (req, res) => {
    try {
        const { name, email, mobileNumber, address, salary, image } = req.body;
        // Check if the email already exists in the database
        const existingDesk = await Desk.findOne({ email });
        if (existingDesk) {
            return res.json({ status: false, message: 'Email already exists' });
        }
        const lastDesk = await Desk.findOne().sort({ _id: -1 });
        let empid;
        if (!lastDesk) {
            empid = '23CRT1';
        } else {
            const lastEmpid = lastDesk.empid;
            let res = null;
            let string = '';
            for (let i = 1; res !== 'T'; i++) {
                res = lastEmpid.charAt(lastEmpid.length - i);
                if (res !== 'T') {
                    string += res;
                } else {
                    break;
                }
            }
            empid = '23CRT' + (parseInt(string.split("").reverse().join("")) + 1)
        }
        const desk = new Desk({ name, email, mobileNumber, image, empid, address, salary });
        const result = await desk.save();
        res.send({ status: true, data: desk });
    } catch (error) {
        res.send({ status: false, data: error });
    }
};








module.exports.getAllDesks = async (req, res) => {
    try {
        let desks = await Desk.find();
        res.send({ status: true, data: desks })
    }
    catch (error) {
        res.send({ status: false, data: error })
    }
}

module.exports.getDesks = async (req, res) => {
    try {
        let desks = await Desk.find({ __v: 0 });
        res.send({ status: true, data: desks });
    } catch (error) {
        res.send({ status: false, data: error });
    }
};



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

module.exports.addoutemployee = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedFields = req.body;
        updatedFields.__v = 0;
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
}



module.exports.updateDeleteDesk = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedFields = req.body;
        if(req.file){
            updatedFields.image = new mongoose.Types.Buffer(req.file.buffer);
        }
        updatedFields.__v = 1;
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




module.exports.verifyToken = (req, res, next) => {
    const secretKey = 'Revanth@123';
    // Get token from headers or query parameters or cookies
    const token = req.headers['authorization'] || req.query.token || req.cookies.token;
  
    if (!token) {
      return res.status(403).json({ message: 'No token provided.' });
    }
  
    // Verify token
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Failed to authenticate token.' });
      }
      // Store decoded token for later use in request handlers
      req.decoded = decoded;
      next();
    });
  };
