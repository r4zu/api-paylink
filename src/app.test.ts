import { describe, it, expect } from 'vitest';
import app from './app.ts';

describe('App healthy', async () => {
  it('should return health status', async () => {
    const res = await app.request('/api/health');
    expect(res.status).toBe(200);
  });

  it('should have /api/paylink route', async () => {
    const res = await app.request('/api/paylink');
    expect(res.status).toBe(200);
  });
});
