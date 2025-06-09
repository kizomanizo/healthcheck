import express from 'express';
import os from 'os';

const app = express();
const port = process.env.PORT || 3009;

app.get('/health', (req, res) => {
  const uptime = process.uptime();
  const memoryUsage = process.memoryUsage();

  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: `${Math.floor(uptime)} seconds`,
    memory: {
      rss: `${Math.round(memoryUsage.rss / 1024 / 1024)} MB`,
      heapTotal: `${Math.round(memoryUsage.heapTotal / 1024 / 1024)} MB`,
      heapUsed: `${Math.round(memoryUsage.heapUsed / 1024 / 1024)} MB`,
    },
    platform: {
      hostname: os.hostname(),
      type: os.type(),
      arch: os.arch(),
      cpus: os.cpus().length,
    },
  });
});

app.listen(port, () => {
  console.log(`✅ Health check server running at http://localhost:${port}/health`);
});

