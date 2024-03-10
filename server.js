const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require('cors');
const routes = require('./src/routes');
const db = require('./src/database');

app.use(cors());
app.use(express.json());
db.connect();
// Routes
app.use('/api', routes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
