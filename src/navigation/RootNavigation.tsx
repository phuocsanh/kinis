import {
  createStaticNavigation,
  StaticParamList,
} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import {useIsSignedOut} from 'hooks/CheckLogin';
import useNotificationListener from 'hooks/useNotificationListener';
import React, {useEffect, useState} from 'react';
import {useAppStore} from 'stores';
import {navigationRef} from './navigationRef';
import Bottom from './Bottom';
import auth from 'screens/auth';
import common from 'screens/common';
// import remoteConfig from 'util/remoteConfig';

const RootStack = createNativeStackNavigator({
  screenOptions: {headerShown: false},
  groups: {
    OnboardingScreen: {
      if: useIsSignedOut,
      screens: {
        OnboardingScreen: common.OnboardingScreen,
      },
    },
    Auth: {
      if: useIsSignedOut,
      screens: {
        Login: auth.LoginAndRegisterScreen,
      },
    },
  },
  screens: {
    Bottom,
  },
});

export type RootStackParamList = StaticParamList<typeof RootStack>;

export type RootStackNavigationProps =
  NativeStackNavigationProp<RootStackParamList>;

const Navigation = createStaticNavigation(RootStack);

export const RootNavigation = () => {
  useNotificationListener();
  const [ready, setReady] = useState(false);
  // useEffect(() => {
  //   remoteConfig.setup().finally(() => {
  //     setReady(true);
  //   });
  // }, []);
  //   if (!ready) {
  //     return null;
  //   }
  return (
    <Navigation
      ref={navigationRef}
      onReady={() => useAppStore.setState({navigationReady: true})}
    />
  );
};
