/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {Text, View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation, RouteProp, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {SafeAreaView} from 'react-native-safe-area-context';

import backIcon from '../../assets/icon/backIcon.png';
import debitImage from '../../assets/image/debit_Illustration.jpg';
import creditImage from '../../assets/image/credit_Illustration.jpg';
import {RootNavigation} from 'routes/routeTypes';

type NavigationProp = NativeStackNavigationProp<
  RootNavigation,
  'TRANSACTION_DETAILS'
>;

interface TransactionDetailsRows {
  key: string;
  label: string;
  value: string;
}

const TransactionDetails: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const {params} = useRoute<
    RouteProp<
      {
        params: {
          data: {
            description: string;
            amount: number;
            date: string;
            type: string;
            id: string;
          };
        };
      },
      'params'
    >
  >();

  const {description, amount, type, date, id} = params.data;

  const transactionDetails = [
    {
      key: 'desc',
      label: 'Description:',
      value: description,
    },
    {
      key: 'date',
      label: 'Date:',
      value: date,
    },
    {
      key: 'id',
      label: 'Transaction ID:',
      value: `${id}${date}${type === 'Credit' ? 'C' : 'D'}`.replace('-', ''),
    },
    {
      key: 'accNum',
      label: 'Account Number:',
      value: '1234567890',
    },
  ] as TransactionDetailsRows[];

  const RenderTransactionDetails = () => {
    return (
      <View>
        {transactionDetails.map((data, index) => (
          <View style={styles.transactionRow} key={index}>
            <Text style={styles.leftText}>{data.label}</Text>
            <Text style={styles.rightText}>{data.value}</Text>
          </View>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Image source={backIcon} style={styles.headerIcon} />
        </TouchableOpacity>

        <Text style={styles.title}>Transaction Details</Text>
      </View>
      <View style={styles.contentContainer}>
        <Image
          source={type === 'Credit' ? creditImage : debitImage}
          style={styles.imageContainer}
        />
        <View style={styles.sectionAmount}>
          <Text style={styles.amountType}>
            {type === 'Credit' ? 'Money Credited:' : 'Money Debited:'}
          </Text>
          <Text
            style={[
              styles.amountText,
              type === 'Credit' ? styles.amountCredit : styles.amountDebit,
            ]}>
            RM{amount}
          </Text>
        </View>
        <RenderTransactionDetails />
      </View>
    </SafeAreaView>
  );
};

export default TransactionDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    paddingTop: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    color: '#395963',
    flex: 1,
    textAlign: 'center',
  },
  sectionAmount: {
    width: '100%',
    padding: 20,
    alignItems: 'flex-start',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#ff735c',
  },
  amountType: {
    fontSize: 12,
    fontWeight: '400',
  },
  amountText: {
    fontSize: 20,
    fontWeight: '700',
  },
  amountCredit: {
    color: '#00B761',
  },
  amountDebit: {
    color: '#FF5F5F',
  },
  headerIcon: {
    width: 20,
    height: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  imageContainer: {
    width: 200,
    height: 200,
  },
  transactionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  rightText: {
    fontSize: 12,
    fontWeight: '400',
    width: '60%',
  },
  leftText: {
    fontSize: 12,
    fontWeight: '700',
    width: '40%',
  },
});
