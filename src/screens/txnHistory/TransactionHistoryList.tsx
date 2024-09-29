/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {Image, SectionList, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useQuery} from 'react-query';
import {RefreshControl, ScrollView} from 'react-native-gesture-handler';

import arrowDown from '../../assets/icon/arrowDown.png';
import arrowUp from '../../assets/icon/arrowUp.png';

import MonthList from '../../components/MonthList';
import {getTransactionList} from '../../service/transactionsService';
import {mapTransactionHistoryToList} from '../../utility/historyMapper';

const TransactionHistoryList = () => {
  const [selectedMonth, setSelectedMonth] = React.useState(1);
  const [transactionList, setTransactionList] = React.useState<any>([]);

  const [payload] = React.useState('all');

  const {refetch, isLoading} = useQuery(
    'getTransactionList',
    () => getTransactionList(payload),
    {
      enabled: true,
      onSuccess: data => {
        setTransactionList(data);
      },
      onError: error => {
        console.log('error', error);
      },
    },
  );

  React.useEffect(() => {
    refetch();
  }, [payload]);

  const mappedHistory = React.useMemo(
    () => mapTransactionHistoryToList(transactionList || []),
    [transactionList],
  );

  const renderRecordList = ({item}: any) => (
    <View style={styles.transactionDetailContainer}>
      <Image
        source={item.type === 'credit' ? arrowUp : arrowDown}
        style={styles.arrow}
      />
      <View>
        <Text>{item.description}</Text>
        <Text>{item.time}</Text>
      </View>
      <View>
        <Text>{item.amount}</Text>
        <Text>{item.type}</Text>
      </View>
    </View>
  );

  const renderSectionHeader = ({section}: any) => (
    <View style={styles.sectionHeaderContainer}>
      <Text style={styles.sectionHeaderText}>{section.title}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Transaction History</Text>
        </View>

        <MonthList month={selectedMonth} setMonth={setSelectedMonth} />

        {transactionList.length > 0 ? (
          <SectionList
            refreshControl={
              <RefreshControl refreshing={isLoading} onRefresh={refetch} />
            }
            // ListEmptyComponent={renderEmptyRecord}
            // ItemSeparatorComponent={ItemSeparatorComponent}
            sections={mappedHistory}
            renderItem={renderRecordList}
            renderSectionHeader={renderSectionHeader}
            keyExtractor={(item, index) => String(index).valueOf()}
          />
        ) : (
          <></>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  arrow: {
    width: 20,
    height: 20,
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    color: '#395963',
  },
  transactionDetailContainer: {
    padding: 10,
    flexDirection: 'row',
  },
  dividerContainer: {flex: 1, paddingHorizontal: 18},
  sectionHeaderContainer: {
    padding: 10,
    backgroundColor: '#ff735c',
  },
  sectionHeaderText: {
    color: 'white',
    fontSize: 16,
  },
});

export default TransactionHistoryList;
