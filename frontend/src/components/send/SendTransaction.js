import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendTransaction } from '../../redux/blockChain/action';
import './index.css';

export default function SendTransaction({sender}) {
  const dispatch = useDispatch()
  
  const [recipient, setRecipient] = useState()
  const [amount, setAmount] = useState(0)

  const onSendTransaction = () => {
    dispatch(sendTransaction({sender, recipient, amount, pk: localStorage.getItem('pk')}))
  }

  let transaction = useSelector(state => state.blockchain.transaction)
  useEffect(() => {
    if (transaction && transaction.message) {
      alert(transaction.message)
    }
  }, [transaction])
  return (
    <div className="transaction__container">
      <div className="transaction">
        <div className="transaction__header"><span>Send Transaction</span></div>
        <div className="transaction__body">
          <div className="transaction__form">

            <div className="transaction__row group-double">
              <div className="tmp-form-control group-double__2">
                <label className="tmp-form-control__label">Amount</label>
                <input value={amount} onChange={e => setAmount(+e.target.value)} type="number" className="tmp-form-control__input" />
              </div>
            </div>
            <div className="transaction__row tmp-form-control">
              <label className="tmp-form-control__label">To Address</label>
              <input onChange={e => setRecipient(e.target.value)} type="text" className="tmp-form-control__input" placeholder="Enter wallet's address, which you want to send"/>
            </div>
          </div>
        </div>
        <div className="transaction__footer">
          <button onClick={onSendTransaction} className="btn__send">Send Transaction</button>
        </div>
      </div>
    </div>
  )
}