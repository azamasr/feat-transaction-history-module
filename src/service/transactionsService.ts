import {transactionsList} from '../utility/transactionList';

export const getTransactionList = (payload: any) => {
  try {
    //MOCK TRANSACTIONS API
    if (payload === 'all') {
      return transactionsList;
    }
  } catch (error) {
    throw new Error('Fetch Transactions Error');
  }
};
