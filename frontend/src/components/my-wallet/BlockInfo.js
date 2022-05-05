import React from 'react';
import './index.css'


export default function BLockInfo(props) {
  console.log(props);
  const { address, balance: { addressBalance = "***" } = {} } = props || {};
  return (
    <div className="block-group">
      <div className="block block-address">
        <div className="block__content">
          <div className="block__title">My wallet's address</div>
          <div className="block__info">{address}</div>
        </div>
      </div>
      <div className="block block-balance">
        <div className="block__content">
          <div className="block__title">Balance</div>
          <div className="block__info">{addressBalance} Coin</div>
        </div>
      </div>
    </div>
  )
}