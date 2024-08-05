const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectDb } = require('./configure/db');
const allRoutes = require('./routes/allRoutes');
const router = require('./routes/TestRoutes');
const cluster = require('cluster');
const os = require('os');

dotenv.config();
connectDb();
const port = process.env.PORT || 3000;

if (cluster.isMaster) {
  // Master process - Fork workers
  const numCPUs = os.cpus().length;
  console.log(`Master process is running. Forking ${numCPUs} workers...`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  // Listen for dying workers and restart them
  cluster.on('exit', (worker, code, signal) => {
    if (code !== 0 && !worker.exitedAfterDisconnect) {
      console.log(`Worker ${worker.process.pid} died. Restarting...`);
      cluster.fork();
    }
  });
} else {
  // Worker processes
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use("/api/v1", allRoutes);
  app.use("/api/v1/lab", router);

  app.get("/", (req, res) => {
    res.send("Welcome to Lab Mantra");
  });

  app.listen(port, () => {
    console.log(`Worker ${process.pid} is running on port ${port}`);
  });

  // Handle uncaught exceptions and unhandled rejections
  process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    process.exit(1);
  });

  process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    process.exit(1);
  });
}
