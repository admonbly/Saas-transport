const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/transport-saas', {
  serverSelectionTimeoutMS: 30000
})
.then(() => {
  console.log('Connection successful');
  mongoose.connection.close();
})
.catch((err) => {
  console.error('Connection error:', err);
});
