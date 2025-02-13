import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { webRoutes } from './routes/webRoutes.js';
import { configViewEngine } from './config/viewEngine.js';

const app = express();

const PORT = process.env.PORT || 3008;
// config req.body
app.use(express.json()) // for json
app.use(express.urlencoded({extended: false})); // for form data

// config template engine
configViewEngine(app);

app.use('/', webRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}: http://localhost:${PORT}`);
})