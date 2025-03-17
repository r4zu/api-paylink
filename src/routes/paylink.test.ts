import { describe, it, expect } from 'vitest';
import app from '../app.ts';

describe('payLinkRoute', async () => {
  it('should return a list of payments', async () => {
    const res = await app.request('/api/paylink');

    expect(res.status).toBe(200);
  });

  it('should return a single payment', async () => {
    const res = await app.request('/api/paylink/cm8byzxqj0000scwfvv0949c5');

    expect(res.status).toBe(200);
  });

  it('should return a 404 for an invalid payment ID', async () => {
    const res = await app.request('/api/paylink/cm8byzxqj0000scwfvv0949c4');

    expect(res.status).toBe(404);
  });

  it('should return a 400 for an invalid payment ID', async () => {
    const res = await app.request('/api/paylink/cm8byzxqj0000scwfvv0949c5x');

    expect(res.status).toBe(400);
  });

  it('should create a payment successfully', async () => {
    const mockPayment = {
      email: 'test@test.com',
      amount: 111.11,
      billingAddress: {
        fullName: 'Full Name',
        address: 'Address',
        city: 'City',
        state: 'State',
        zip: '111111',
        phone: '9999999999',
      },
      paymentInformation: {
        nameOnCard: 'Full Name',
        cardNumber: '4234567891345623',
        expiration: '03/25',
        cvv: '123',
      },
    };

    const res = await app.request('/api/paylink', {
      method: 'POST',
      body: JSON.stringify(mockPayment),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    });
    expect(res.status).toBe(201);
  });
});
