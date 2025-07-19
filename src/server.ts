import app from './app';
import config from './config/config';

app.listen(config.port, () => {
  console.log(`Spotshot API running on port ${config.port}`);
});
