import express from 'express';
import spotRoutes from './routes/spotRoutes';
import userRoutes from './routes/userRoutes';
import favouritesRoutes from './routes/favouritesRoutes';
import moderationRoutes from './routes/moderationRoutes';
import { errorHandler } from './middlewares/errorHandler';
import cors from 'cors';

const app = express();

app.use(cors());

app.use(express.json());

// Routes
app.use('/api/spots', spotRoutes);
app.use('/api/users', userRoutes);
app.use('/api/favourites', favouritesRoutes);
app.use('/api/moderation', moderationRoutes);

app.use(errorHandler);

export default app;
