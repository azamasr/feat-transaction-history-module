import React, {useRef} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';

import chevronRight from '../assets/icon/chevronRight.png';
import chevronLeft from '../assets/icon/chevronLeft.png';
import {months} from '../utility/months';

interface MonthProps {
  month: number;
  setMonth?: React.Dispatch<React.SetStateAction<number>>;
}

const MonthList: React.FC<MonthProps> = ({month, setMonth}) => {
  const flatListRef = useRef<FlatList>(null);
  const [monthOffSet, setMonthOffSet] = React.useState(0);

  const handleMoveRight = () => {
    if (monthOffSet !== 1000) {
      setMonthOffSet(monthOffSet + 200);
      const newOffset = monthOffSet + 200;
      flatListRef.current?.scrollToOffset({offset: newOffset, animated: true});
    }
  };

  const handleMoveLeft = () => {
    if (monthOffSet !== 0) {
      setMonthOffSet(monthOffSet - 200);
      const newOffset = monthOffSet - 200;
      flatListRef.current?.scrollToOffset({offset: newOffset, animated: true});
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={handleMoveLeft}
        style={styles.chevronContainer}>
        <Image source={chevronLeft} style={styles.chevronLeft} />
      </TouchableOpacity>
      <FlatList
        ref={flatListRef}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        data={months}
        renderItem={({item}) => {
          return (
            <View
              style={[
                styles.monthContainer,
                item.value === month && styles.selectedMonthContainer,
              ]}>
              <TouchableOpacity
                hitSlop={{top: 20, bottom: 20, left: 15, right: 15}}
                onPress={() => setMonth && setMonth(item.value)}>
                <Text
                  style={[
                    styles.monthText,
                    item.value === month && styles.selectedMonthText,
                  ]}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />
      <TouchableOpacity
        onPress={handleMoveRight}
        style={styles.chevronContainer}>
        <Image source={chevronRight} style={styles.chevronRight} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
    flexDirection: 'row',
  },
  chevronContainer: {
    top: 11,
  },
  chevronRight: {
    width: 20,
    height: 20,
  },
  chevronLeft: {
    width: 20,
    height: 20,
  },
  selectedMonthContainer: {
    backgroundColor: '#ff4f5a',
  },
  monthContainer: {
    padding: 10,
    margin: 5,
    width: 90,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#ff4f5a',
  },
  monthText: {
    fontSize: 12,
  },
  selectedMonthText: {
    color: 'white',
  },
});

export default MonthList;
