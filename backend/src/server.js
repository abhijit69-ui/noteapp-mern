import dotenv from 'dotenv';
import express from 'express';
import noteRoutes from './routes/notesRoutes.js';
import { connectDB } from './config/db.js';
import rateLimiter from './middleware/rateLimiter.js';

dotenv.config();

const app = express();

// trust proxy setting
app.set('trust proxy', 1);

const PORT = process.env.PORT || 5001;

// parsing middleware
app.use(express.json());
// custom middleware
app.use(rateLimiter);

app.use('/api/notes', noteRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server started on PORT:${PORT}`);
  });
});
