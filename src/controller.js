const axios = require('axios');

exports.getMongoDBData = async (req, res) => {
  try {
    console.log('hai');
    const data = {
      collection: "users",
      database: "Employees",
      dataSource: "Cluster0"
    };

    const response = await axios.post('https://ap-south-1.aws.data.mongodb-api.com/app/data-phkht/endpoint/data/v1/action/find', data, {
      headers: {
        'Content-Type': 'application/json',
        'api-key': 'wpG5JwGwnp6OZeERI20BqRCatoXGLqIKXX3Q2WGsbSOde8IyDqsWOu9F3aBmDFTE'
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching MongoDB data:', error);
    res.status(500).json({ error: 'Failed to fetch MongoDB data' });
  }
};


exports.postMongoDBData = async (req, res) => {
    const reqData = req.body;
    try {
      const data = {
        collection: "users",
        database: "Employees",
        dataSource: "Cluster0",
        document : {
            name : reqData.name,
            number : reqData.number
        }
      };
  
      const response = await axios.post('https://ap-south-1.aws.data.mongodb-api.com/app/data-phkht/endpoint/data/v1/action/insertOne', data, {
        headers: {
          'Content-Type': 'application/json',
          'api-key': 'wpG5JwGwnp6OZeERI20BqRCatoXGLqIKXX3Q2WGsbSOde8IyDqsWOu9F3aBmDFTE'
        }
      });
  
      res.json(response.data);
    } catch (error) {
      console.error('Error fetching MongoDB data:', error);
      res.status(500).json({ error: 'Failed to fetch MongoDB data' });
    }
  };
  