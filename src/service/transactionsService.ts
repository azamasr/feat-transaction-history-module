import {transactionsList} from '../utility/transactionList';

export const getTransactionList = (payload: any) => {
  try {
    //MOCK TRANSACTIONS API
    if (payload === 0) {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(transactionsList);
        }, 1000);
      });
    } else {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(
            transactionsList.filter(
              (transaction: any) =>
                new Date(transaction.date).getMonth() + 1 === payload,
            ),
          );
        }, 1000);
      });
    }
  } catch (error) {
    throw new Error('Fetch Transactions Error');
  }
};
