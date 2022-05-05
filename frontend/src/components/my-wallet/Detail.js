import React from 'react';
import BlockInfo from './BlockInfo';
import SendTransaction from '../send/SendTransaction';
import { useDispatch, useSelector } from 'react-redux'
import { detailWallet } from '../../redux/blockChain/action'

export default function Detail({ address }) {
  const dispatch = useDispatch();
  const getDetail = () => {
    let pk = localStorage.getItem('pk');
    const params = {
      pk: pk,
      address: address
    }
    dispatch(detailWallet(params))
  }




  let addressState = useSelector(state => state.blockchain.detail)

  return (
    <div className="detail__contener">
      <div className="detail">
        <div className="detail__body">
          <div className="detail__form">
          <div className="detail__header"><span>My Wallet</span></div>
              
   
            </div>
          
        </div>
        <BlockInfo address={address} balance={addressState || {}} />
        <button className="detail__btn" onClick={getDetail}>Detail</button>


      </div>
    
      <SendTransaction sender={address}></SendTransaction>
    </div>
  )
}