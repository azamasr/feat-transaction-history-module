import { SectionListData } from 'react-native';
import dayjs from 'dayjs';
import {groupBy} from 'lodash';


export const mapTransactionHistoryToList = (
  data?: any,
): SectionListData<any, Record<string, any>>[] => {
  const groupedData = groupBy(data, val => {
    return dayjs(val.date).format('MMMM');
  });
  const mappedData = Object.keys(groupedData).map(val => ({
    title: val,
    data: groupedData[val],
  }));

  return mappedData;
};
