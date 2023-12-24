"use client"

import React, { useState } from 'react';
import axios from 'axios';
import { Channel } from '../../types/index';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

const Dashboard = () => {
  const [memo, setMemo] = useState('');
  const [amount, setAmount] = useState('');
  const [nodePubkeyString, setNodePubkeyString] = useState('');
  const [localFundingAmount, setLocalFundingAmount] = useState('');
  const [paymentRequest, setPaymentRequest] = useState('');
  const [channels, setChannels] = useState<Channel[]>([]);

  const createInvoice = async () => {
    try {
      const response = await axios.post('/api/v1/create-invoice', { memo, amount });
      alert('Invoice created: ' + response.data.payment_request);
    } catch (error: any) {
      alert('Error creating invoice: ' + error!.message);
    }
  };

  const openChannel = async () => {
    try {
      const response = await axios.post('/api/v1/open-channel', { node_pubkey_string: nodePubkeyString, local_funding_amount: localFundingAmount });
      alert('Channel open request sent.');
    } catch (error: any) {
      alert('Error opening channel: ' + error!.message);
    }
  };

  const sendPayment = async () => {
    try {
      const response = await axios.post('/api/v1/send-payment', { payment_request: paymentRequest });
      alert('Payment sent.');
    } catch (error: any) {
      alert('Error sending payment: ' + error.message);
    }
  };

  const listChannels = async () => {
    try {
      const response = await axios.get('/api/v1/list-channels');
      setChannels(response.data.channels);
    } catch (error: any) {
      alert('Error listing channels: ' + error.message);
    }
  };

  return (
    <div className="container mx-auto py-6">
      <h2 className="text-center text-2xl font-bold mb-6">Lightning Network</h2>

      <div className="mb-4">
        <Input
          className="my-2"
          value={memo}
          onChange={e => setMemo(e.target.value)}
          placeholder="Invoice memo"
        />
        <Input
          className="my-2"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          placeholder="Amount (satoshis)"
        />
        <Button onClick={createInvoice} className="my-2">Create Invoice</Button>
      </div>

      <div className="mb-4">
        <Input
          className="my-2"
          value={nodePubkeyString}
          onChange={e => setNodePubkeyString(e.target.value)}
          placeholder="Node pubkey string"
        />
        <Input
          className="my-2"
          value={localFundingAmount}
          onChange={e => setLocalFundingAmount(e.target.value)}
          placeholder="Local funding amount (satoshis)"
        />
        <Button onClick={openChannel} className="my-2">Open Channel</Button>
      </div>

      <div className="mb-4">
        <Input
          className="my-2"
          value={paymentRequest}
          onChange={e => setPaymentRequest(e.target.value)}
          placeholder="Payment request"
        />
        <Button onClick={sendPayment} className="my-2">Send Payment</Button>
      </div>

      <div>
        <Button onClick={listChannels} className="my-2">List Channels</Button>
        {channels.map(channel => (
          <div key={channel.chan_id} className="mb-2">{channel.channel_point}</div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
