require('dotenv').config;
const express = require('express');
const webRoutes = require('./routes/webRoutes.js');
const configViewEngine = require('./config/viewEngine.js');


const app = express();

const PORT = process.env.PORT || 2019;
// config req.body
// app.use(express.json()) // for json
app.use(express.urlencoded({extended: true})); // for form data

// config template engine
configViewEngine(app);


app.use('/', webRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}: http://localhost:${PORT}`);
})