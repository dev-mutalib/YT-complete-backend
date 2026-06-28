import dotenv from 'dotenv';
import dns from 'dns';

// Load environment variables immediately
dotenv.config();

dns.setServers(['8.8.8.8', '8.8.4.4']);

// Use async IIFE to load modules after env vars are set
(async () => {
  const app = (await import('./src/app.js')).default;
  const connectDB = (await import('./src/db/mongoDB.js')).default;

  const PORT = process.env.PORT;

  connectDB(process.env.MONGO_URI)
    .then(() => {
      app.listen(PORT, () => {
        console.log(`Server is running on PORT ${PORT}`);
      });
    })
    .catch((error) => {
      console.log(`Internal server Error ${error}`);
    });
})();
