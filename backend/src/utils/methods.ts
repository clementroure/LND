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

export const openChannel = async (c: Context) => {
    if (!c.body) throw new Error('No body provided');
    try {
        const { node_pubkey_string, local_funding_amount } = c.body as any;

        const channel = {
            node_pubkey_string,
            local_funding_amount,
            sat_per_byte: 0, // Optional: Specify satoshis per byte for fee
        };

        lndClient.openChannelSync(channel, (error: any, res: any) => {
            if (error) {
               console.log(error.message)
            } else {
                console.log(res)
            }
        });
    } catch (error: any) {
        console.log(error.message)
    }
};

export const sendPayment = async (c: Context) => {
    if (!c.body) throw new Error('No body provided');
    try {
        const { payment_request } = c.body as any;

        const payment = {
            payment_request,
        };

        lndClient.sendPaymentSync(payment, (error: any, res: any) => {
            if (error) {
                console.log(error.message)
            } else {
                console.log(res)
            }
        });
    } catch (error: any) {
        console.log(error.message)
    }
};

export const listChannels = async (c: Context) => {
    lndClient.listChannels({}, (error: any, res: any) => {
        if (error) {
            console.log(error.message)
        } else {
            console.log(res)
        }
    });
};