import React, {useEffect, useState} from 'react';

import {Button, Image, Pressable, Text, View} from 'components/base';
import {IMAGES} from 'assets';
import {height, width} from 'themes/helper';
import {COLORS} from 'themes/color';
import {ChevronLeft} from 'lucide-react-native';

import {ScrollView} from 'react-native';
import {useForm} from 'react-hook-form';
import {FormInput} from 'components/form';
import {navigationRef} from 'navigation/navigationRef';
import formConfig, {FormField} from './formConfig';
import {useUpdatePassword} from 'queries/auth';
import {showToast} from 'components/common/CustomToast';

const UpdatePassScreen = () => {
  const {control, handleSubmit, setValue} = useForm<FormField>(formConfig);

  const {mutate, isPending, error} = useUpdatePassword();
  useEffect(() => {
    if (error) {
      showToast({
        type: 'error',
        text1: 'Error!',
        text2: error.response?.data.message || 'Please trying!',
      });
    }
  }, [error]);
  const onSubmit = async (value: FormField) => {
    mutate({
      currentPassword: value.currentPassword,
      newPassword: value.password,
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
          <Pressable
            onPress={() => navigationRef.navigate('Login')}
            padding={5}>
            <ChevronLeft style={{marginLeft: 10}} strokeWidth={1.5} size={24} />
          </Pressable>
          <Image
            marginTop={50}
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
            {'New Password'}
          </Text>
          <Text
            marginHorizontal={40}
            textAlign="center"
            fontSize={12}
            marginTop={12}
            color={COLORS.darkElectricBlue}>
            Please reset your personal password to access the app for future
            logins
          </Text>

          <View paddingHorizontal={36} marginTop={24}>
            <FormInput
              label="Current Password"
              height={48}
              control={control}
              name="currentPassword"
              fontSize={14}
              placeholder="Current Password"
              toggleHiddenPassword
            />

            <FormInput
              containerProps={{marginTop: 20}}
              label="New Password"
              height={48}
              control={control}
              name="password"
              fontSize={14}
              placeholder="Password"
              toggleHiddenPassword
            />

            <FormInput
              containerProps={{marginTop: 12}}
              height={48}
              control={control}
              name="confirmPassword"
              fontSize={14}
              placeholder="Confirm Password"
              toggleHiddenPassword
            />

            <Button
              title="Update password"
              disabled={isPending}
              loading={isPending}
              marginTop={30}
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
export default UpdatePassScreen;
