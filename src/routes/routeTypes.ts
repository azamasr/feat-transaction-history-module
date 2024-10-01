export type RootNavigation = {
  LOGIN_PAGE: undefined;
  TRANSACTION_HISTORY_LIST: undefined;
  TRANSACTION_DETAILS: {
    params: {
      description: string;
      amount: number;
      date: string;
      type: string;
      id: string;
    };
  };
};
