import React, {useEffect, useState} from 'react';

import {Button, CheckBox, Image, Pressable, Text, View} from 'components/base';
import {ICONS, IMAGES} from 'assets';
import {height, width} from 'themes/helper';
import {COLORS} from 'themes/color';
import {ChevronLeft} from 'lucide-react-native';

import {ScrollView} from 'react-native';
import {useAppStore} from 'stores';
import {useForm} from 'react-hook-form';
import formConfig, {FormField} from './formConfig';
import {useLogin} from 'queries/auth';
import {FormInput} from 'components/form';
import {navigationRef} from 'navigation/navigationRef';
import {showToast} from 'components/common/CustomToast';

export const LoginScreen = () => {
  const saveAccount = useAppStore(state => state.saveAccount);
  const accountSaved = useAppStore(state => state.accountSaved);

  const {control, handleSubmit, setValue} = useForm<FormField>(formConfig);
  const [isSaved, setIsSaved] = useState(!!saveAccount && !!accountSaved);
  const {mutate, isPending, error} = useLogin();

  useEffect(() => {
    if (error) {
      showToast({
        type: 'error',
        text1: 'Error!',
        text2: error.response?.data.message || 'Please trying!',
      });
    }
  }, [error]);
  useEffect(() => {
    if (accountSaved && saveAccount) {
      setValue('username', accountSaved.username);
      setValue('password', accountSaved.password);
    }
  }, [accountSaved, saveAccount]);
  const onSubmit = async (value: FormField) => {
    mutate({
      username: value.username,
      password: value.password,
      isSaveAccount: !!isSaved,
    });
  };

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
            {'Login'}
          </Text>
          <Text
            textAlign="center"
            fontSize={12}
            marginTop={12}
            color={COLORS.darkElectricBlue}>
            Enter your email and password to log in
          </Text>

          <View paddingHorizontal={36} marginTop={24}>
            <FormInput
              height={48}
              control={control}
              name="username"
              fontSize={14}
              placeholder="Email/User ID"
            />

            <FormInput
              containerProps={{marginTop: 12}}
              height={48}
              control={control}
              name="password"
              fontSize={14}
              placeholder="Password"
              toggleHiddenPassword
            />
            <View marginTop={16}>
              <View rowCenter justifyContent="space-between">
                <Pressable
                  rowCenter
                  onPress={() => {
                    setIsSaved(!isSaved);
                  }}>
                  <CheckBox
                    size={16}
                    disabled
                    isCheck={isSaved}
                    activeColor={COLORS.black}
                  />

                  <Text
                    fontSize={12}
                    marginLeft={5}
                    color={COLORS.darkElectricBlue}>
                    Remember me
                  </Text>
                </Pressable>
                <Pressable>
                  <Text fontSize={12} font="semiBold" color={COLORS.frenchPuce}>
                    Forgot Password ?
                  </Text>
                </Pressable>
              </View>
            </View>
            <Button
              title="Log In"
              disabled={isPending}
              loading={isPending}
              marginTop={24}
              fontSize={16}
              font={'bold'}
              onPress={handleSubmit(onSubmit)}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
