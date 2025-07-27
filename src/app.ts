import express from 'express';
import spotRoutes from './routes/spotRoutes';
import userRoutes from './routes/userRoutes';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

app.use(express.json());

// Routes
app.use('/api/spots', spotRoutes);
app.use('/api/users', userRoutes);

app.use(errorHandler);

export default app;
