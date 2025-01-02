import React, {useEffect, useState} from 'react';

import {Image, Pressable, Text, View} from 'components/base';
import {ICONS, IMAGES} from 'assets';
import {height, width} from 'themes/helper';
import {COLORS} from 'themes/color';
import {ChevronLeft} from 'lucide-react-native';
import Login from './components/Login';
import {ScrollView} from 'react-native';

export const LoginAndRegisterScreen = () => {
  const [tab, setTab] = useState<'Sign up' | 'Login'>('Login');
  return (
    <View flex backgroundColor={COLORS.white}>
      <ScrollView>
        <Image
          position="absolute"
          source={IMAGES.img_bg}
          width={'100%'}
          height={height}
          contentFit="cover"
        />
        <View marginTop={55}>
          <ChevronLeft style={{marginLeft: 10}} strokeWidth={1.5} size={24} />
          <Image
            marginTop={60}
            alignSelf="center"
            source={IMAGES.img_logo_app}
            square={44}
          />
          <Text
            textAlign="center"
            marginTop={12}
            fontSize={30}
            font="bold"
            color={COLORS.frenchPuce}>
            {tab}
          </Text>
          <Text
            textAlign="center"
            fontSize={12}
            marginTop={12}
            color={COLORS.darkElectricBlue}>
            {tab === 'Login'
              ? 'Enter your email and password to log in'
              : 'Create an account to continue!'}
          </Text>
          <View
            rowCenter
            alignSelf="center"
            marginTop={24}
            padding={3}
            backgroundColor={COLORS.cultured}
            radius={100}>
            <Pressable
              radius={100}
              backgroundColor={tab === 'Login' ? COLORS.primary : 'transparent'}
              paddingHorizontal={14}
              paddingVertical={6}
              onPress={() => setTab('Login')}>
              <Text
                font="medium"
                fontSize={13}
                color={
                  tab === 'Login' ? COLORS.white : COLORS.darkElectricBlue
                }>
                Log In
              </Text>
            </Pressable>
            <Pressable
              radius={100}
              backgroundColor={
                tab === 'Sign up' ? COLORS.primary : 'transparent'
              }
              paddingHorizontal={14}
              paddingVertical={6}
              onPress={() => setTab('Sign up')}>
              <Text
                font="medium"
                fontSize={13}
                color={
                  tab === 'Sign up' ? COLORS.white : COLORS.darkElectricBlue
                }>
                Sign up
              </Text>
            </Pressable>
          </View>

          {tab === 'Login' ? <Login /> : <View />}
        </View>
      </ScrollView>
    </View>
  );
};
