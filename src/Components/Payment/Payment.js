import React, { useState, useEffect } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { ToastContainer, toast } from 'react-toastify';

const paypal_URL = 'AZ6XI3RlXJYcLM4jTeRqBL7Wvrg3S-t2Z4Afpa11m2HxdNTW7crMbVt9A7knX42B3lU1pI2QnmMfEtsf';

export default function Payment({paid, setPaid}) {
  const [show, setShow] = useState(false);
  const [success, setSuccess] = useState(false);
  const [orderID, setOrderID] = useState('');


  useEffect(() => {
    if (success) {
      toast.success('Payment successful!!', {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }, [success]);
  // creates a paypal order
  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            description: 'Reservation Order',
            amount: {
              currency_code: 'USD',
              value: 20,
            },
          },
        ],
        // not needed if a shipping address is actually needed
        application_context: {
          shipping_preference: 'NO_SHIPPING',
        },
      })
      .then((orderID) => {
        setOrderID(orderID);
        return orderID;
      });
  };

  // check Approval
  const onApprove = (data, actions) => {
    try {
      return actions.order.capture().then(function (details) {
        const { payer } = details;
        console.log(payer);
        setSuccess(true);
      });
    } catch (error) {
      onError();
    }
  };
  //capture likely error
  const onError = (data, actions) => {
    toast.success('An Error occured with your payment ', {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  return (
    <div>
      <ToastContainer />
      <PayPalScriptProvider options={{ 'client-id': paypal_URL }}>
        <div className="container text-center">
          <div className="my-5">
            <button
type="button"
              className="btn btn-warning mx-5"
              onClick={() => {setPaid(true);setShow(true)}}>

              Pay now
            </button>
            
            <input
              type="checkbox"
              className="btn btn-info fs-4"
              name="pay"
              onChange={() => {setPaid(false);}}
              value={show}
              />
             <label className="text-primary fs-5">Pay Later</label> 
          </div>
          <div className="container">
            {show ? (
              <PayPalButtons
                style={{ layout: 'vertical' }}
                createOrder={createOrder}
                onApprove={onApprove}
              />
            ) : null}
          </div>
        </div>
      </PayPalScriptProvider>
    </div>
  );
}
