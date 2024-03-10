const axios = require('axios');
const Desks = require('./model')

// exports.getMongoDBData = async (req, res) => {
//   try {
//     console.log('hai');
//     const data = {
//       collection: "users",
//       database: "Employees",
//       dataSource: "Cluster0"
//     };

//     const response = await axios.post('https://ap-south-1.aws.data.mongodb-api.com/app/data-phkht/endpoint/data/v1/action/find', data, {
//       headers: {
//         'Content-Type': 'application/json',
//         'api-key': 'wpG5JwGwnp6OZeERI20BqRCatoXGLqIKXX3Q2WGsbSOde8IyDqsWOu9F3aBmDFTE'
//       }
//     });

//     res.json(response.data);
//   } catch (error) {
//     console.error('Error fetching MongoDB data:', error);
//     res.status(500).json({ error: 'Failed to fetch MongoDB data' });
//   }
// };


// exports.postMongoDBData = async (req, res) => {
//     const reqData = req.body;
//     try {
//       const data = {
//         collection: "users",
//         database: "Employees",
//         dataSource: "Cluster0",
//         document : {
//             name : reqData.name,
//             number : reqData.number
//         }
//       };
  
//       const response = await axios.post('https://ap-south-1.aws.data.mongodb-api.com/app/data-phkht/endpoint/data/v1/action/insertOne', data, {
//         headers: {
//           'Content-Type': 'application/json',
//           'api-key': 'wpG5JwGwnp6OZeERI20BqRCatoXGLqIKXX3Q2WGsbSOde8IyDqsWOu9F3aBmDFTE'
//         }
//       });
  
//       res.json(response.data);
//     } catch (error) {
//       console.error('Error fetching MongoDB data:', error);
//       res.status(500).json({ error: 'Failed to fetch MongoDB data' });
//     }
//   };


  exports.getData = async (req, res) => {
    try {
      const data = await Desks.find(); // Use exec() to execute the query and return a promise
      res.status(200).json(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Failed to fetch data' });
    }
  }

  exports.insertData = async (req, res) => {
    try {
      let {name, number} = req.body;
      let desk = new Desks({name, number});
      await desk.save();
      res.status(201).json({ message: 'Data inserted successfully' });
    } catch (error) {
      console.error('Error inserting data:', error);
      res.status(500).json({ error: 'Failed to insert data' });
    }
  }

  exports.deleteData = async (req,res) => {
    try {
      const {id} = req.params;
      const deleteData = await Desks.findByIdAndDelete(id);
      if(!deleteData) {
        return res.send({status : false, data : "Data not found"})
      }
      res.send({status : true, data : "data deleted successfully"})
    }
    catch(error) {
      res.send({status : false, data: error})
    }
  }

  exports.updateData = async (req,res) => {
    try {
      const { id } = req.params;
      const updatefields = req.body;
      const updatedData = await Desks.findByIdAndUpdate(id, updatefields, {new : true});
      if(!updatedData) {
        return res.send({status : false, message : "Data not found"})
      }
      res.send({status : true, message : updatedData})
    }
    catch(error) {
      res.send({status : false, data: error})  
    }
  }
  