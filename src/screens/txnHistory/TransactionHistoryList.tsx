/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {
  Image,
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useQuery} from 'react-query';
import {useNavigation} from '@react-navigation/native';
import {RefreshControl, ScrollView} from 'react-native-gesture-handler';
import * as Progress from 'react-native-progress';

import arrowDown from '../../assets/icon/arrowDown.png';
import arrowUp from '../../assets/icon/arrowUp.png';
import filter from '../../assets/icon/filterIcon.png';
import logOut from '../../assets/icon/logOutIcon.png';
import NoData from '../../assets/image/not_found_illustration.jpg';

import MonthList from '../../components/MonthList';
import {getTransactionList} from '../../service/transactionsService';
import {mapTransactionHistoryToList} from '../../utility/historyMapper';
import {months} from '../../utility/months';
import {LOGIN_PAGE} from '../../routes/route';

const TransactionHistoryList = () => {
  const navigation = useNavigation();
  const [selectedMonth, setSelectedMonth] = React.useState(0);
  const [transactionList, setTransactionList] = React.useState<any>([]);

  const [isFilterVisible, setIsFilterVisible] = React.useState(false);
  const [isFetchDone, setIsFetchDone] = React.useState(false);
  const [payload, setPayload] = React.useState(0);

  const {refetch} = useQuery(
    'getTransactionList',
    () => getTransactionList(payload),
    {
      enabled: !isFetchDone,
      onSuccess: data => {
        setIsFetchDone(true);
        setTransactionList(data);
      },
      onError: () => {
        setIsFetchDone(true);
      },
    },
  );

  React.useEffect(() => {
    refetch();
    setIsFetchDone(false);
  }, [payload]);

  const updatePayload = React.useCallback(() => {
    setPayload(
      selectedMonth === 0
        ? 0
        : months.find(month => month.value === selectedMonth)?.value ?? 0,
    );
  }, [selectedMonth, refetch]);

  React.useEffect(() => {
    updatePayload();
  }, [selectedMonth]);

  const mappedHistory = React.useMemo(
    () => mapTransactionHistoryToList(transactionList || []),
    [transactionList],
  );

  const renderRecordList = ({item}: any) => (
    <View style={styles.transactionDetailContainer}>
      <View style={styles.leftRowContainer}>
        <View
          style={[
            styles.arrowContainer,
            item.type === 'Credit' ? styles.credit : styles.debit,
          ]}>
          <Image
            source={item.type === 'Credit' ? arrowUp : arrowDown}
            style={styles.arrow}
          />
        </View>
        <View>
          <Text style={styles.detailsText}>{item.description}</Text>
          <Text style={styles.detailsText2}>{item.time}</Text>
        </View>
      </View>
      <View style={styles.rightRowContainer}>
        <Text
          style={[
            styles.detailsText,
            item.type === 'Credit' ? styles.amountCredit : styles.amountDebit,
          ]}>
          RM{item.amount}
        </Text>
        <Text style={styles.detailsText2}>{item.type}</Text>
      </View>
    </View>
  );

  const renderSectionHeader = ({section}: any) => {
    return (
      <View style={styles.sectionHeaderContainer}>
        <Text style={styles.sectionHeaderText}>{section.title}</Text>
      </View>
    );
  };

  if (!isFetchDone) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Transaction History</Text>
        </View>
        <View style={styles.progress}>
          <Progress.Circle
            color="#ff735c"
            size={40}
            borderWidth={20}
            indeterminate={true}
            style={styles.progress}
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={!isFetchDone}
            onRefresh={() => setIsFetchDone(false)}
          />
        }>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(LOGIN_PAGE);
            }}>
            <Image source={logOut} style={styles.headerIcon} />
          </TouchableOpacity>
          <Text style={styles.title}>Transaction History</Text>
          <TouchableOpacity
            onPress={() => {
              setIsFilterVisible(!isFilterVisible);
              setSelectedMonth(0);
            }}>
            <Image source={filter} style={styles.headerIcon} />
          </TouchableOpacity>
        </View>

        {isFilterVisible && (
          <View style={styles.monthListContainer}>
            <MonthList month={selectedMonth} setMonth={setSelectedMonth} />
          </View>
        )}

        {transactionList?.length > 0 ? (
          <SectionList
            sections={mappedHistory}
            renderItem={renderRecordList}
            renderSectionHeader={renderSectionHeader}
            keyExtractor={(item, index) => index.toString()}
          />
        ) : (
          <>
            <Image source={NoData} style={styles.noDataImage} />
            <Text style={styles.noDataText}>No transactions available</Text>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  progress: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 30,
  },
  monthListContainer: {
    paddingBottom: 10,
  },
  arrowContainer: {
    borderRadius: 30,
    padding: 10,
    marginRight: 10,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignContent: 'center',
  },
  arrow: {
    width: 10,
    height: 12,
  },
  headerIcon: {
    width: 20,
    height: 20,
  },
  credit: {
    backgroundColor: '#d3f5e9',
  },
  debit: {
    backgroundColor: '#f8e8eb',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    color: '#395963',
    flex: 1,
    textAlign: 'center',
  },
  transactionDetailContainer: {
    marginHorizontal: 15,
    marginVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftRowContainer: {
    width: '80%',
    flexDirection: 'row',
  },
  rightRowContainer: {
    justifyContent: 'flex-end',
    width: '20%',
  },
  dividerContainer: {flex: 1, paddingHorizontal: 18},
  sectionHeaderContainer: {
    padding: 10,
    backgroundColor: '#ff735c',
  },
  sectionHeaderText: {
    color: 'white',
    fontSize: 14,
  },
  detailsText: {
    fontSize: 14,
    fontWeight: '400',
  },
  amountCredit: {
    color: '#00B761',
  },
  amountDebit: {
    color: '#FF5F5F',
  },
  detailsText2: {
    fontSize: 12,
    color: '#686E73',
  },
  noDataImage: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginBottom: 20,
  },
  noDataText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#395963',
    textAlign: 'center',
  },
});

export default TransactionHistoryList;
