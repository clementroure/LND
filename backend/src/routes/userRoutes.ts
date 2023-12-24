import { Elysia, t } from 'elysia'
import { createInvoice, listChannels, openChannel, sendPayment } from '../utils/methods'

const userRoutes = (app: Elysia) => {
  
  app.group('/api/v1', (app) => 
    app
      .post('/create-invoice', createInvoice, {
        body: t.Object({
          memo: t.String(),
          amount: t.Number(),
        }),
        type: 'json',
      })

      .post('/open-channel', openChannel, {
        body: t.Object({
          node_pubkey_string: t.String(),
          local_funding_amount: t.Number(),
        }),
        type: 'json',
      })

      .post('/send-payment', sendPayment, {
        body: t.Object({
          payment_request: t.String(),
        }),
        type: 'json',
      })

      .get('/list-channels', listChannels)
    
  )
};

export default userRoutes as any