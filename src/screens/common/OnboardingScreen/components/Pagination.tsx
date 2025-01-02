import {StyleSheet, View} from 'react-native';
import React from 'react';
import Animated, {useAnimatedStyle, interpolate, Extrapolation, SharedValue} from 'react-native-reanimated';
import {width} from 'themes/helper';
import {DataItem} from '../data';

interface PaginationProps {
  data: DataItem[];
  x: SharedValue<number>;
}

interface PaginationCompProps {
  i: number;
  x: SharedValue<number>;
}

const PaginationComp: React.FC<PaginationCompProps> = ({i, x}) => {
  const animatedDotStyle = useAnimatedStyle(() => {
    const widthAnimation = interpolate(
      x.value,
      [(i - 1) * width, i * width, (i + 1) * width],
      [10, 20, 10],
      Extrapolation.CLAMP,
    );
    const opacityAnimation = interpolate(
      x.value,
      [(i - 1) * width, i * width, (i + 1) * width],
      [0.5, 1, 0.5],
      Extrapolation.CLAMP,
    );
    return {
      width: widthAnimation,
      opacity: opacityAnimation,
    };
  });
  return <Animated.View style={[styles.dots, animatedDotStyle]} />;
};

const Pagination: React.FC<PaginationProps> = ({data, x}) => {
  return (
    <View style={styles.paginationContainer}>
      {data.map((_, i) => (
        <PaginationComp i={i} x={x} key={i} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  paginationContainer: {
    flexDirection: 'row',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dots: {
    height: 10,
    backgroundColor: 'orange',
    marginHorizontal: 10,
    borderRadius: 5,
  },
});

export default Pagination;
