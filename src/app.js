const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const blogRoutes = require('../src/routes/blogRoutes'); 

const mongodbUri = 'mongodb+srv://mehruddin:secret1900%40@cluster0.4kvse8m.mongodb.net/blogApp?retryWrites=true&w=majority';

mongoose.connect(mongodbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();
app.use(bodyParser.json());

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

app.use(cors());

app.use('/api/blog', blogRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
