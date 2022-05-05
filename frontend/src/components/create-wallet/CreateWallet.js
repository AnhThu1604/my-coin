import React from 'react';
import './index.css';
import { useDispatch, useSelector } from 'react-redux';
import { createWallet } from '../../redux/blockChain/action';
import Detail from '../my-wallet/Detail';

export default function CreateWallet() {
  const dispatch = useDispatch()
  const create = () => {
    dispatch(createWallet())
  }
  let address = useSelector(state => state.blockchain.wallet)
  return (
    <div >
      <div className="wallet__detail">
        {address ?<Detail address={address}></Detail>:
          <div className="wallet">
            <div className="wallet__wrapper">
              <div className="wallet__title">Click button to create Your wallet</div>
              <div className="wallet__footer">
                <button onClick={create} className="wallet__btn">Create wallet</button>
              </div>
            </div>

          </div>

        }
      </div>
    </div >

  )
}