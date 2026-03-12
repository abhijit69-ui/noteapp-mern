import dotenv from 'dotenv';
import express from 'express';
import noteRoutes from './routes/notesRoutes.js';
import { connectDB } from './config/db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

connectDB();

// parsing middleware
app.use(express.json());

app.use('/notes', noteRoutes);

app.listen(PORT, () => {
  console.log(`Server started on PORT:${PORT}`);
});
