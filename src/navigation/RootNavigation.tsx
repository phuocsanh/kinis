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
import React, {useState} from 'react';
import {useAppStore} from 'stores';
import {navigationRef} from './navigationRef';
import Bottom from './Bottom';
import auth from 'screens/auth';
import common from 'screens/common';

const RootStack = createNativeStackNavigator({
  screenOptions: {headerShown: false},
  screens: {
    OnboardingScreen: common.OnboardingScreen,
    Bottom,
    Message: common.MessageScreen,
    DetailArticle: common.DetailArticleScreen,
    AccountInfo: common.AccountInfoScreen,
    EditProfile: common.EditProfileScreen,
    ChangePassword: common.ChangePasswordScreen,
    UpdatePass: auth.UpdatePassScreen,
  },
  groups: {
    SignedOut: {
      if: useIsSignedOut,
      screens: {
        Login: auth.LoginScreen,
      },
    },
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
