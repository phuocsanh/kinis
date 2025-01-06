import React, {useEffect, useState} from 'react';
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
import {View, Image, Pressable, Text, Button, Loading} from 'components/base';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {COLORS} from 'themes/color';
import {width} from 'themes/helper';
import {HeaderTitle} from 'components/common';
import {Camera, ChevronRight, Lock, User, UserRound} from 'lucide-react-native';
import {navigationRef} from 'navigation/navigationRef';
import {useLogout, useQueryUserInfo} from 'queries/auth';
import {useIsFocused} from '@react-navigation/native';
import {useAppStore} from 'stores';

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
  const loguot = useLogout();
  const userToken = useAppStore(state => state.userToken);

  const isFocused = useIsFocused();
  const userInfo = useQueryUserInfo();

  useEffect(() => {
    if (!userToken && isFocused) {
      setTimeout(() => {
        navigationRef.goBack();
      }, 500);
    }
  }, [userToken, isFocused]);
  return (
    <View flex backgroundColor={COLORS.white}>
      <HeaderTitle title="Profile Detail" />
      {loguot.isPending && <Loading />}
      <View
        square={80}
        marginTop={15}
        alignSelf="center"
        justifyContent="center"
        alignItems="center"
        radius={100}
        backgroundColor={COLORS.primary}>
        <UserRound color={'white'} size={40} />
        <View
          backgroundColor={COLORS.blackTransparent70}
          position="absolute"
          bottom={0}
          right={-3}
          round={30}
          justifyContent="center"
          alignItems="center">
          <Camera color={COLORS.white} size={18} />
        </View>
      </View>
      <Text marginTop={5} textAlign="center" fontSize={16} font="semiBold">
        {userInfo.data?.userId.fullName
          ? userInfo.data?.userId.fullName
          : 'Guest'}
      </Text>
      <Text marginTop={5} textAlign="center" color={COLORS.shadowBlue}>
        {userInfo.data?.email ? userInfo.data?.email : ''}
      </Text>
      <View marginTop={40} marginHorizontal={20} flex>
        <Text fontSize={16}>Account</Text>
        <Pressable
          onPress={() => navigationRef.navigate('EditProfile')}
          marginTop={10}
          paddingVertical={10}
          rowCenter
          justifyContent="space-between">
          <View rowCenter>
            <User color={COLORS.primary} />
            <Text marginLeft={10}>Edit Profile</Text>
          </View>
          <ChevronRight strokeWidth={1.5} />
        </Pressable>
        <Pressable
          onPress={() => navigationRef.navigate('ChangePassword')}
          paddingVertical={10}
          rowCenter
          justifyContent="space-between">
          <View rowCenter>
            <Lock color={COLORS.primary} />
            <Text marginLeft={10}>Change Password</Text>
          </View>
          <ChevronRight strokeWidth={1.5} />
        </Pressable>
      </View>
      <Button
        marginBottom={60}
        title="Log out"
        marginHorizontal={25}
        onPress={() => loguot.mutate()}
      />
    </View>
  );
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
