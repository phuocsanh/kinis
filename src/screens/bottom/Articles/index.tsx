import React, {useState, useEffect, useRef, useCallback} from 'react';
import {Button, Pressable, Text, View} from 'components/base';
import {BleManager, Device, DeviceId, Subscription} from 'react-native-ble-plx';
import {FlatList, ScrollView, StyleSheet, View as ViewRN} from 'react-native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {useLogout, useQueryUserInfo} from 'queries/auth';
import {useIsSignedIn, useIsSignedOut} from 'hooks/CheckLogin';
import {useAppStore} from 'stores';
import {navigationRef} from 'navigation/navigationRef';
import {useIsFocused} from '@react-navigation/native';
import {UserRound} from 'lucide-react-native';
import {COLORS} from 'themes/color';
import {TypeArticles} from 'models/articles';
import {useGetArticles} from 'queries/articles';
import BalanceHealth from './components/BalanceHealth';
import KinisAi from './components/KinisAi';
import Revention from './components/Revention';
import Wellness from './components/Wellness/index';

const tabs: {title: string; value: TypeArticles}[] = [
  {
    title: 'All',
    value: undefined,
  },
  {
    title: 'Balance Health',
    value: 'BALANCE_HEALTH',
  },
  {
    title: 'Kinis Ai',
    value: 'KINIS_AI',
  },
  {
    title: 'Prevention',
    value: 'PREVENTION',
  },
  {
    title: 'Wellness',
    value: 'WELLNESS',
  },
];
export const Articles: React.FC = () => {
  const [tab, setTab] = useState<TypeArticles>(undefined);
  const scrollViewRef = useRef<ScrollView>(null);
  const [balanceHealthLayout, setBalanceHealthLayout] = useState({y: 0});
  const [kinisAiLayout, setKinisAiLayout] = useState({y: 0});
  const userToken = useAppStore(state => state.userToken);
  const userInfo = useQueryUserInfo();
  const handleTabPress = (tabValue: TypeArticles, scrollTo: number) => {
    setTab(tabValue);

    // Scroll to the corresponding content section based on tab
    scrollViewRef.current?.scrollTo({x: 0, y: scrollTo, animated: true});
  };

  const handleScroll = useCallback(
    (event: any) => {
      const contentOffsetY = event.nativeEvent.contentOffset.y;

      // Change tab when reaching the respective section
      if (
        contentOffsetY >= kinisAiLayout.y &&
        contentOffsetY < balanceHealthLayout.y
      ) {
        setTab('KINIS_AI');
      } else if (contentOffsetY < kinisAiLayout.y) {
        setTab('BALANCE_HEALTH');
      }
    },
    [balanceHealthLayout, kinisAiLayout],
  );
  const onBalanceHealthLayout = (event: any) => {
    const layout = event.nativeEvent.layout;
    setBalanceHealthLayout({y: layout.y});
  };

  const onKinisAiLayout = (event: any) => {
    const layout = event.nativeEvent.layout;
    setKinisAiLayout({y: layout.y});
  };
  const handleGotoProfile = () => {
    if (!userToken) {
      return navigationRef.navigate('Login');
    }
    navigationRef.navigate('AccountInfo');
  };

  return (
    <View flex backgroundColor={COLORS.white}>
      <View paddingHorizontal={15}>
        <View marginTop={50} row justifyContent="space-between">
          {!userToken ? (
            <Pressable onPress={() => navigationRef.navigate('Login')}>
              <Text fontSize={18} font="semiBold">
                Log in for more
              </Text>
              <Text>Welcome to Kinis.ai</Text>
            </Pressable>
          ) : (
            <View>
              <Text fontSize={18} font="semiBold">
                {userInfo.data?.userId.fullName
                  ? userInfo.data?.userId.fullName
                  : 'Guest'}
              </Text>
              <Text>Welcome to Kinis.ai</Text>
            </View>
          )}

          <Pressable
            square={40}
            onPress={handleGotoProfile}
            justifyContent="center"
            alignItems="center"
            radius={100}
            backgroundColor={COLORS.primary}>
            <UserRound color={'white'} />
          </Pressable>
        </View>
      </View>
      <View marginTop={20}>
        <ScrollView
          horizontal
          style={{
            paddingHorizontal: 15,
            borderBottomWidth: 1,
            borderBottomColor: COLORS.shadowBlue,
          }}>
          {tabs.map((item, index) => (
            <Pressable
              onPress={() => handleTabPress(item.value, index * 300)}
              key={index}
              marginRight={25}
              borderBottomWidth={tab === item.value ? 2 : 0}
              borderColor={tab === item.value ? COLORS.primary : 'transparent'}
              marginBottom={1}>
              <Text font="medium" marginBottom={5}>
                {item.title}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
        {/* ScrollView data */}
      </View>
      <ScrollView
        style={{
          paddingHorizontal: 15,
          paddingTop: 15,
        }}
        showsHorizontalScrollIndicator={false}
        ref={scrollViewRef}
        onScroll={handleScroll}>
        <ViewRN style={{marginTop: 15}} onLayout={onBalanceHealthLayout}>
          <Text font="semiBold" fontSize={16}>
            About Balance Health
          </Text>
          <BalanceHealth />
        </ViewRN>
        <ViewRN style={{marginTop: 15}} onLayout={onKinisAiLayout}>
          <Text font="semiBold" fontSize={16}>
            About Kinis Ai
          </Text>
          <KinisAi />
        </ViewRN>
        <ViewRN style={{marginTop: 15}} onLayout={onKinisAiLayout}>
          <Text font="semiBold" fontSize={16}>
            Risks and Revention
          </Text>
          <Revention />
        </ViewRN>
        <ViewRN
          style={{marginTop: 15, marginBottom: 130}}
          onLayout={onKinisAiLayout}>
          <Text font="semiBold" fontSize={16}>
            Lifestyle & Wellness
          </Text>
          <Wellness />
        </ViewRN>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  list: {
    marginTop: 16,
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  connectedDevice: {
    marginTop: 16,
  },
});

// Function to start scanning BLE devices
