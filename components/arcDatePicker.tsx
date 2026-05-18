import dayjs from 'dayjs';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Dimensions, FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

const {height} = Dimensions.get('window');

export type Precision = 'year' | 'month' | 'day' | 'hour' | 'minute' | 'second';

interface Props {
  visible: boolean;
  value?: Date;
  precision?: Precision;
  minDate?: Date;
  maxDate?: Date;
  onCancel: () => void;
  onConfirm: (date: Date) => void;
}

const ITEM_HEIGHT = 40;
const VISIBLE_COUNT = 5;

const PRECISION_ORDER: Precision[] = ['year', 'month', 'day', 'hour', 'minute', 'second'];

function getColumns(precision: Precision) {
  const endIndex = PRECISION_ORDER.indexOf(precision);
  return PRECISION_ORDER.slice(0, endIndex + 1);
}

function range(start: number, end: number) {
  const arr: number[] = [];
  for (let i = start; i <= end; i++) arr.push(i);
  return arr;
}

function getDays(year: number, month: number) {
  return dayjs(`${year}-${month}`).daysInMonth();
}

function WheelColumn({list, value, onChange}: any) {
  const ref = useRef<FlatList>(null);

  useEffect(() => {
    const index = list.findIndex((i: number) => i === value);
    if (index >= 0) {
      ref.current?.scrollToOffset({
        offset: index * ITEM_HEIGHT,
        animated: false,
      });
    }
  }, [list, value]);

  const onScrollEnd = (e: any) => {
    const offsetY = e.nativeEvent.contentOffset.y;
    const index = Math.round(offsetY / ITEM_HEIGHT);
    const val = list[index];
    if (val !== undefined) onChange(val);
  };

  return (
    <View
      style={{
        height: ITEM_HEIGHT * VISIBLE_COUNT,
        overflow: 'hidden',
        minWidth: 50,
        alignItems: 'center',
      }}
    >
      <FlatList
        ref={ref}
        data={list}
        keyExtractor={item => item.toString()}
        showsVerticalScrollIndicator={false}
        snapToInterval={ITEM_HEIGHT}
        decelerationRate='normal'
        onMomentumScrollEnd={onScrollEnd}
        getItemLayout={(_, index) => ({
          length: ITEM_HEIGHT,
          offset: ITEM_HEIGHT * index,
          index,
        })}
        contentContainerStyle={{paddingVertical: ITEM_HEIGHT * 2}}
        renderItem={({item}) => {
          const selected = item === value;
          return (
            <View
              style={{
                height: ITEM_HEIGHT,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={[styles.item, selected && styles.active]}>{item.toString().padStart(2, '0')}</Text>
            </View>
          );
        }}
      />
    </View>
  );
}

export default function ArcDatePikcer({visible, value, precision = 'day', minDate, maxDate, onCancel, onConfirm}: Props) {
  const columns = useMemo(() => getColumns(precision), [precision]);

  const [inner, setInner] = useState(dayjs(value || new Date()));

  useEffect(() => {
    if (visible) {
      setInner(dayjs(value || new Date()));
    }
  }, [value, visible]);

  const translateY = useSharedValue(height);

  useEffect(() => {
    translateY.value = withTiming(visible ? 0 : height, {duration: 250});
  }, [translateY, visible]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{translateY: translateY.value}],
  }));

  const dataMap = {
    year: range(1970, 2100),
    month: range(1, 12),
    day: range(1, getDays(inner.year(), inner.month() + 1)),
    hour: range(0, 23),
    minute: range(0, 59),
    second: range(0, 59),
  };

  const setValue = (type: Precision, val: number) => {
    if (type === 'day') {
      const maxDay = getDays(inner.year(), inner.month() + 1);
      if (val < 1 || val > maxDay) {
        return;
      }
    }

    let next = inner.set(type as any, type === 'month' ? val - 1 : val);

    if (type === 'year' || type === 'month') {
      const maxDay = getDays(next.year(), next.month() + 1);
      if (next.date() > maxDay) {
        next = next.set('date', maxDay);
      }
    }

    if (minDate && next.isBefore(dayjs(minDate))) next = dayjs(minDate);
    if (maxDate && next.isAfter(dayjs(maxDate))) next = dayjs(maxDate);

    setInner(next);
  };

  return (
    <Modal transparent visible={visible} animationType='none'>
      <View style={styles.mask}>
        <TouchableOpacity style={{flex: 1}} onPress={onCancel} />

        <Animated.View style={[styles.panel, animatedStyle]}>
          <View style={styles.header}>
            <TouchableOpacity onPress={onCancel}>
              <Text style={styles.btn}>取消</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onConfirm(inner.toDate())}>
              <Text style={[styles.btn, styles.confirm]}>确定</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.body}>
            {columns.map(type => (
              <WheelColumn key={type} list={dataMap[type]} value={type === 'month' ? inner.month() + 1 : inner.get(type)} onChange={(val: number) => setValue(type, val)} />
            ))}
          </View>

          {/* 中间高亮 */}
          <View style={styles.indicator} pointerEvents='none' />
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  mask: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  panel: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  btn: {
    fontSize: 16,
    color: '#666',
  },
  confirm: {
    color: '#1677ff',
  },
  body: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
  },
  item: {
    fontSize: 16,
    color: '#333',
  },
  active: {
    color: '#1677ff',
    fontWeight: 'bold',
  },
  indicator: {
    position: 'absolute',
    top: ITEM_HEIGHT * 2 + 56,
    left: 0,
    right: 0,
    height: ITEM_HEIGHT,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
});
