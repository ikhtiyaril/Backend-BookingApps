require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const db = require('./models'); 
const app = express();

app.use(cors());
app.use(bodyParser.json()); 

app.get('/', (req, res) => {
  res.send('Booking App is running!');
});

app.use('/api/services', require('./routes/serviceRoutes'));
app.use('/api/blockedTime', require('./routes/blockedTimeRoutes'))
app.use('/api/booking', require('./routes/bookingRoutes'));; 
app.use('/api/admin', require('./routes/adminRoutes'));
 

db.sequelize.sync({ alter: true })
  .then(() => {
    console.log('Database synced!');
  })
  .catch(err => {
    console.error('Failed to sync database:', err);
  });

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
