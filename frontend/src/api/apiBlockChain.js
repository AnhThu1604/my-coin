import API from './api';

const createWallet = () => {
  return API.post('/create-wallet').then(res => res.data)
}

const getDetail = (params) => {
  return API.get('/my-wallet', { params: params }).then(res => res.data)
}

const sendTransaction = (params) => {
  return API.post('/send', params).then(res => res.data)
}

const getHistory = (params) => {
  return API.get('/history', { params: params }).then(res => res.data)
}

const exportedObject = {
  createWallet,
  getDetail,
  sendTransaction,
  getHistory
};

export default exportedObject;