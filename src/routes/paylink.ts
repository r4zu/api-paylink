import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { HTTPException } from 'hono/http-exception';

import { paymentSchema, type Payment } from '../routes/schema.ts';
import { prisma } from '../db/client.ts';
import {
  createMaskToken,
  determineCardType,
  isCuid,
  maskCardNumber,
} from '../tools/utilities.ts';

const payLinkRoute = new Hono();

payLinkRoute.get('/', async (c) => {
  const payments = await prisma.payments.findMany();

  return c.json({ payments: payments });
});

payLinkRoute.get('/:id', async (c) => {
  const id = c.req.param('id');

  if (!isCuid(id)) {
    throw new HTTPException(400, { message: 'Invalid ID' });
  }

  const payment = await prisma.payments.findUnique({
    where: { id },
    include: {
      billingAddress: {
        select: {
          full_name: true,
          address: true,
          city: true,
          state: true,
          zip: true,
          phone: true,
        },
      },
      paymentInformation: false,
    },
  });

  if (!payment) {
    return c.notFound();
  }

  return c.json({ payment });
});

payLinkRoute.post('/', zValidator('json', paymentSchema), async (c) => {
  try {
    const body = c.req.valid('json');

    const result = await prisma.$transaction(async (tx: any) => {
      const payment = await tx.payments.create({
        data: {
          email: body.email,
          amount: body.amount,
        },
      });

      const billingAddress = await tx.BillingAddress.create({
        data: {
          full_name: body.billingAddress.fullName,
          address: body.billingAddress.address,
          city: body.billingAddress.city,
          state: body.billingAddress.state,
          zip: body.billingAddress.zip,
          phone: body.billingAddress.phone,
          paymentsId: payment?.id,
        },
      });

      await tx.PaymentInformation.create({
        data: {
          name_on_card: body.paymentInformation.nameOnCard,
          card_number: await createMaskToken(
            body.paymentInformation.cardNumber
          ),
          expiration: body.paymentInformation.expiration,
          cvv: await createMaskToken(body.paymentInformation.cvv),
          paymentsId: payment.id,
        },
      });

      return { payment, billingAddress };
    });

    return c.json(
      {
        success: true,
        message: 'Payment created successfully',
        data: {
          payment: {
            id: result.payment.id,
            email: result.payment.email,
            amount: result.payment.amount,
            createdAt: result.payment.createdAt,
          },
          billingAddress: {
            fullName: result.billingAddress.full_name,
            address: result.billingAddress.address,
            city: result.billingAddress.city,
            state: result.billingAddress.state,
            zip: result.billingAddress.zip,
            phone: result.billingAddress.phone,
          },
          paymentInformation: {
            cardNumber: maskCardNumber(body.paymentInformation.cardNumber),
            type: determineCardType(body.paymentInformation.cardNumber),
          },
        },
      },
      201
    );
  } catch (error) {
    console.error('Payment creation failed:', error);

    return c.json(
      {
        success: false,
        message: 'Failed to create payment',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      500
    );
  }
});

export { payLinkRoute };
