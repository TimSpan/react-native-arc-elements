import dayjs from 'dayjs';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Dimensions, FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

const {height} = Dimensions.get('window');

const ITEM_HEIGHT = 40;
const VISIBLE_COUNT = 5;

type Precision = 'year' | 'month' | 'day' | 'hour' | 'minute' | 'second';

const ORDER: Precision[] = ['year', 'month', 'day', 'hour', 'minute', 'second'];

const range = (start: number, end: number) => {
  const arr: number[] = [];
  for (let i = start; i <= end; i++) arr.push(i);
  return arr;
};

const getDays = (y: number, m: number) => dayjs(`${y}-${m}`).daysInMonth();

function Wheel({data, value, onChange}: any) {
  const ref = useRef<FlatList>(null);
  const indexRef = useRef(0);

  const index = useMemo(() => data.findIndex((i: number) => i === value), [data, value]);

  useEffect(() => {
    if (index >= 0 && index !== indexRef.current) {
      indexRef.current = index;
      ref.current?.scrollToOffset({
        offset: index * ITEM_HEIGHT,
        animated: false,
      });
    }
  }, [index]);

  const handleEnd = (e: any) => {
    let i = Math.round(e.nativeEvent.contentOffset.y / ITEM_HEIGHT);

    if (i < 0) i = 0;
    if (i > data.length - 1) i = data.length - 1;

    indexRef.current = i;
    onChange(data[i]);
  };

  return (
    <View style={{height: ITEM_HEIGHT * VISIBLE_COUNT, overflow: 'hidden'}}>
      <FlatList
        ref={ref}
        data={data}
        keyExtractor={i => i.toString()}
        showsVerticalScrollIndicator={false}
        snapToInterval={ITEM_HEIGHT}
        decelerationRate='fast'
        onMomentumScrollEnd={handleEnd}
        getItemLayout={(_, i) => ({
          length: ITEM_HEIGHT,
          offset: ITEM_HEIGHT * i,
          index: i,
        })}
        contentContainerStyle={{
          paddingVertical: ITEM_HEIGHT * 2,
        }}
        renderItem={({item}) => {
          const active = item === value;
          return (
            <View style={styles.itemWrap}>
              <Text style={[styles.item, active && styles.active]}>{item.toString().padStart(2, '0')}</Text>
            </View>
          );
        }}
      />
    </View>
  );
}

export default function ArcDatePicker({visible, value, precision = 'day', minDate, maxDate, onCancel, onConfirm}: any) {
  const cols = ORDER.slice(0, ORDER.indexOf(precision) + 1);

  const d = dayjs(value || new Date());

  const [year, setYear] = useState(d.year());
  const [month, setMonth] = useState(d.month() + 1);
  const [day, setDay] = useState(d.date());
  const [hour, setHour] = useState(d.hour());
  const [minute, setMinute] = useState(d.minute());
  const [second, setSecond] = useState(d.second());

  useEffect(() => {
    if (visible) {
      const d = dayjs(value || new Date());
      setYear(d.year());
      setMonth(d.month() + 1);
      setDay(d.date());
      setHour(d.hour());
      setMinute(d.minute());
      setSecond(d.second());
    }
  }, [visible, value]);

  // ✅ 修正 day（只在 month/year 改时）
  useEffect(() => {
    const max = getDays(year, month);
    if (day > max) {
      setDay(max);
    }
  }, [year, month]);

  const data = {
    year: range(1970, 2100),
    month: range(1, 12),
    day: range(1, getDays(year, month)),
    hour: range(0, 23),
    minute: range(0, 59),
    second: range(0, 59),
  };

  const buildDate = () => {
    let d = dayjs()
      .year(year)
      .month(month - 1)
      .date(day)
      .hour(hour)
      .minute(minute)
      .second(second);

    if (minDate && d.isBefore(minDate)) d = dayjs(minDate);
    if (maxDate && d.isAfter(maxDate)) d = dayjs(maxDate);

    return d.toDate();
  };

  const translateY = useSharedValue(height);

  useEffect(() => {
    translateY.value = withTiming(visible ? 0 : height, {duration: 250});
  }, [visible]);

  const style = useAnimatedStyle(() => ({
    transform: [{translateY: translateY.value}],
  }));

  return (
    <Modal transparent visible={visible}>
      <View style={styles.mask}>
        <TouchableOpacity style={{flex: 1}} onPress={onCancel} />

        <Animated.View style={[styles.panel, style]}>
          <View style={styles.header}>
            <Text onPress={onCancel}>取消</Text>
            <Text onPress={() => onConfirm(buildDate())}>确定</Text>
          </View>

          <View style={styles.body}>
            {cols.map(c => {
              const map: any = {
                year: [year, setYear],
                month: [month, setMonth],
                day: [day, setDay],
                hour: [hour, setHour],
                minute: [minute, setMinute],
                second: [second, setSecond],
              };

              const [val, setter] = map[c];

              return <Wheel key={c} data={data[c]} value={val} onChange={setter} />;
            })}
          </View>

          <View style={styles.indicator} pointerEvents='none' />
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  mask: {flex: 1, backgroundColor: 'rgba(0,0,0,0.3)'},
  panel: {backgroundColor: '#fff'},
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  body: {flexDirection: 'row', justifyContent: 'space-around'},
  itemWrap: {
    height: ITEM_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {fontSize: 16, color: '#999'},
  active: {color: '#000', fontWeight: 'bold'},
  indicator: {
    position: 'absolute',
    top: ITEM_HEIGHT * 2,
    height: ITEM_HEIGHT,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
});
