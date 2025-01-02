import React, {useState} from 'react';
// import Modal from 'react-native-modal';
import Animated, {
  Extrapolation,
  interpolate,
  interpolateColor,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {StyleSheet, Platform} from 'react-native';
import {View, Image, Pressable, Text} from 'components/base';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {navigationRef} from 'navigation';
import {COLORS} from 'themes/color';
import {width} from 'themes/helper';

type HealthMetrics = 'BMI' | 'BMR' | 'TDEE';
type HealthMetricsItemList = {
  title: HealthMetrics;
  value: string;
  image_url: string;
  calculationFormula: string;
};

const listHealthMetrics: HealthMetricsItemList[] = [
  {
    title: 'BMI',
    value: '1800',
    image_url: 'https://cdn-icons-png.flaticon.com/128/4349/4349071.png',
    calculationFormula: '',
  },
  {
    title: 'TDEE',
    value: '1800',
    image_url: 'https://cdn-icons-png.flaticon.com/128/8923/8923711.png',
    calculationFormula: '',
  },
  {
    title: 'BMR',
    value: '1800',
    image_url: 'https://cdn-icons-png.flaticon.com/128/4514/4514739.png',
    calculationFormula: '',
  },
];

export const constants = {
  padding: 16,
  margin: 10,
  titleSize: 28,
  textSize: 20,
  subtextSize: 18,
  headerButtonWidth: 40,
  name: 'Developer',
  membersCount: 2,
};

export default function AccountInfoScreen() {
  const scrollY = useSharedValue(0);
  const {bottom} = useSafeAreaInsets();
  const [showInfoHealthMetrics, setShowInfoHealthMetrics] =
    useState<HealthMetricsItemList>();

  const handleScroll = useAnimatedScrollHandler(e => {
    scrollY.value = e.contentOffset.y;
  });

  const offsetValue = 140;
  const animatedHeader = useAnimatedStyle(() => {
    const headerInitialHeight = 130;
    const headerNextHeight = Platform.OS === 'ios' ? 110 : 120;
    const height = interpolate(
      scrollY.value,
      [0, offsetValue],
      [headerInitialHeight, headerNextHeight],
      Extrapolation.CLAMP,
    );

    const backgroundColor = interpolateColor(
      scrollY.value,
      [0, offsetValue],
      [COLORS.antiFlashWhite, COLORS.primary],
    );
    return {
      backgroundColor,
      height,
    };
  });
  const iconAnimatedStyles = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [0, 100, offsetValue],
      [0, 0, 1],
      Extrapolation.CLAMP,
    );
    return {opacity};
  });
  const nameAnimatedStyles = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [0, 100, offsetValue],
      [0, 0, 1],
      Extrapolation.CLAMP,
    );
    const translateX = interpolate(
      scrollY.value,
      [0, offsetValue],
      [-28, 0],
      Extrapolation.CLAMP,
    );
    const translateY = interpolate(
      scrollY.value,
      [0, offsetValue],
      [28, 0],
      Extrapolation.CLAMP,
    );
    return {opacity, transform: [{translateX}, {translateY}]};
  });
  const animImage = useAnimatedStyle(() => {
    const yValue = Platform.OS === 'ios' ? 54 : 45;
    const translateY = interpolate(
      scrollY.value,
      [0, offsetValue],
      [0, -yValue],
      Extrapolation.CLAMP,
    );

    const xValue =
      width / 2 - 2 * constants.padding - constants.headerButtonWidth;
    const translateX = interpolate(
      scrollY.value,
      [0, offsetValue],
      [0, -xValue],
      Extrapolation.CLAMP,
    );

    const scale = interpolate(
      scrollY.value,
      [0, offsetValue],
      [1, 0.3],
      Extrapolation.CLAMP,
    );
    return {
      transform: [{translateY}, {translateX}, {scale}],
    };
  });

  return <View flex backgroundColor={COLORS.antiFlashWhite}></View>;
}

const styles = StyleSheet.create({
  header: {
    paddingTop: Platform.OS === 'ios' ? 50 : 60,
    width: '100%',
    height: 120,
    paddingHorizontal: 8,
    zIndex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },

  headerTitle: {
    fontSize: 24,
    fontWeight: '500',
    marginHorizontal: 60,
    color: COLORS.white,
  },
  // backButton: {
  //   width: constants.headerButtonWidth,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   marginTop: constants.padding,
  // },
  showMoreButton: {
    width: constants.headerButtonWidth,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: Platform.OS === 'ios' ? 66 : 76,
    right: constants.padding,
    zIndex: 1,
  },
  nameTextContainer: {
    paddingTop: 100,
    paddingBottom: 4,
    alignItems: 'center',
  },
  name: {
    fontSize: constants.titleSize,
    alignSelf: 'center',
    marginBottom: 8,
  },
  threadType: {
    fontSize: 20,
    fontWeight: '500',
    color: COLORS.textPlaceholder,
  },
  ctaStyles: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    paddingHorizontal: constants.margin,
    paddingVertical: constants.padding,
  },
  addCommunityTab: {
    padding: constants.padding,
    flexDirection: 'row',
    alignItems: 'center',
  },
  communityTextContainer: {paddingHorizontal: constants.padding, width: '90%'},
  iconContainer: {
    paddingHorizontal: 8,
    paddingVertical: constants.margin,
    backgroundColor: COLORS.primary,
    borderRadius: 6,
  },
  tabTitleText: {
    color: COLORS.primary,
    fontSize: constants.textSize,
  },
  bringMembersText: {color: COLORS.textPlaceholder, fontSize: 15, marginTop: 4},
  createdAt: {
    color: COLORS.textPlaceholder,
    fontSize: 17,
    marginTop: constants.margin,
  },
  membersCountStyles: {
    paddingHorizontal: constants.padding,
    color: COLORS.textPlaceholder,
    fontSize: 15,
    marginTop: 4,
  },
  profileImage: {
    width: 130,
    height: 130,
    borderRadius: 65,
    position: 'absolute',
    zIndex: 99999,
    alignSelf: 'center',
    top: 70,
  },
});
