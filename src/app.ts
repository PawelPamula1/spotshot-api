import express from 'express';
import spotRoutes from './routes/spotRoutes';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

app.use(express.json());

// Routes
app.use('/api/spots', spotRoutes);

app.use(errorHandler);

export default app;
