import { Elysia, t } from 'elysia'
import { createInvoice } from '../utils/lnd'

const userRoutes = (app: Elysia) => {
  
  app.group('/api/v1/create-invoice', (app) =>
    app.post('/', createInvoice, {
      body: t.Object({
        memo: t.String(),
        amount: t.Number(),
      }),
      type: 'json',
    })
  )
};

export default userRoutes as any