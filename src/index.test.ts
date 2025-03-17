import { describe, it, expect, vi } from 'vitest';
import { serve } from '@hono/node-server';
import app from './app.ts';

vi.mock('@hono/node-server', () => ({
  serve: vi.fn(),
}));

describe('Server', () => {
  it('should start the server on the specified port', async () => {
    const mockServe = serve as vi.Mock;
    const mockConsoleLog = vi
      .spyOn(console, 'log')
      .mockImplementation(() => {});

    await import('./index.ts');

    expect(mockServe).toHaveBeenCalledWith(
      {
        fetch: app.fetch,
        port: 8080,
      },
      expect.any(Function)
    );

    const callback = mockServe.mock.calls[0][1];
    callback({ port: 8080 });

    expect(mockConsoleLog).toHaveBeenCalledWith(
      'Server is running on http://localhost:8080'
    );

    mockConsoleLog.mockRestore();
  });
});
