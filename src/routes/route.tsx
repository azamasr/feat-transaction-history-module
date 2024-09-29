import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootNavigation} from './routeTypes';
import LoginPage from '../screens/auth/LoginPage';
import TransactionHistoryList from '../screens/txnHistory/TransactionHistoryList';

const Stack = createNativeStackNavigator<RootNavigation>();

export const LOGIN_PAGE = 'LOGIN_PAGE';
export const TRANSACTION_HISTORY_LIST = 'TRANSACTION_HISTORY_LIST';

const Routes: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: {backgroundColor: 'white'},
        }}>
        <Stack.Screen name={LOGIN_PAGE} component={LoginPage} />
        <Stack.Screen name={TRANSACTION_HISTORY_LIST} component={TransactionHistoryList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
