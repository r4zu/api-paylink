import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { HTTPException } from 'hono/http-exception';
import { z } from 'zod';

import { prisma } from '../db/client.ts';
import { isCuid } from '../tools/iscuid.ts';

const paymentSchema = z.object({
  amount: z.number(),
  email: z.string().email(),
});

type Payment = z.infer<typeof paymentSchema>;

export const payLinkRoute = new Hono()
  .get('/', async (c) => {
    const payments: Payment[] = await prisma.payments.findMany();

    return c.json({ payments: payments });
  })
  .post('/', zValidator('json', paymentSchema), async (c) => {
    const data = c.req.valid('json');

    const result: Payment = await prisma.payments.create({
      data: data,
    });

    c.status(201);
    return c.json(result);
  })
  .get('/:id', async (c) => {
    const id = c.req.param('id');

    if (!isCuid(id)) {
      throw new HTTPException(400, { message: 'Invalid ID' });
    }

    const payment = await prisma.payments.findUnique({
      where: { id },
    });

    if (!payment) {
      return c.notFound();
    }

    return c.json({ payment });
  })
  .put('/:id', zValidator('json', paymentSchema), async (c) => {
    const data = c.req.valid('json');
    const id = c.req.param('id');

    if (!isCuid(id)) {
      throw new HTTPException(400, { message: 'Invalid ID' });
    }

    const payment = await prisma.payments.findUnique({
      where: { id },
    });

    if (!payment) {
      return c.notFound();
    }

    const result = await prisma.payments.update({
      where: { id },
      data: data,
    });

    return c.json({ payment: result });
  })
  .delete('/:id', async (c) => {
    const id = c.req.param('id');

    if (!isCuid(id)) {
      throw new HTTPException(400, { message: 'Invalid ID' });
    }

    const payment = await prisma.payments.delete({
      where: { id },
    });

    if (!payment) {
      return c.notFound();
    }

    return c.json({ payment });
  });
