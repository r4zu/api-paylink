import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { cors } from 'hono/cors';

import { payLinkRoute } from './routes/paylink.js';

const app = new Hono();

app.use(logger());
app.use('/api/*', cors());

app.basePath('/api').route('/paylink', payLinkRoute);

app.get('/api/health', (c) => {
  return c.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

export default app;
