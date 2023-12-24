// utils/lnd.ts
import { lndClient } from './lndClient';
import { Context } from 'elysia';

export const createInvoice = async (c: Context) => {
    //   Check for body
    if (!c.body) throw new Error('No body provided')
    try {
        const { memo, amount } = c.body as any

        const invoice = {
            memo, // memo = msg, eg: Payment Invoice
            value: amount, // amount in satoshis
        };

        lndClient.addInvoice(invoice, (error: any, res: any) => {
            if (error) {
                res.status(500).send({ error: error.message });
                console.log(error.message);
            } else {
                res.send(res);
                console.log(error.message);
            }
        });
    } catch (error: any) {
        console.log(error.message);
    }
};
