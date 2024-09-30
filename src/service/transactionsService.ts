import {transactionsList} from '../utility/transactionList';

export const getTransactionList = (payload: any) => {
  try {
    //MOCK TRANSACTIONS API
    if (payload === 'all') {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(transactionsList);
        }, 1000);
      });
    }
  } catch (error) {
    throw new Error('Fetch Transactions Error');
  }
};
