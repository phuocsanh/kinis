import React, {useEffect, useState} from 'react';

import {Button, CheckBox, Image, Pressable, Text, View} from 'components/base';
import {ICONS, IMAGES} from 'assets';
import {height, width} from 'themes/helper';
import {COLORS} from 'themes/color';
import {ChevronLeft} from 'lucide-react-native';

import {ScrollView} from 'react-native';
import {useAppStore} from 'stores';
import {useForm} from 'react-hook-form';
import {useChangePassword, useLogin} from 'queries/auth';
import {FormInput} from 'components/form';
import {navigationRef} from 'navigation/navigationRef';
import formConfig, {FormField} from './formConfig';
import {HeaderTitle} from 'components/common';

const ChangePasswordScreen = () => {
  const {control, handleSubmit} = useForm<FormField>(formConfig);

  const {mutate, isPending} = useChangePassword();

  const onSubmit = async (value: FormField) => {
    mutate({
      currentPassword: value.currentPassword,
      newPassword: value.password,
    });
  };

  return (
    <View flex backgroundColor={COLORS.white}>
      <HeaderTitle title="Change Password" />
      <ScrollView>
        <View paddingHorizontal={25} marginTop={24}>
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
            title="Save password"
            disabled={isPending}
            loading={isPending}
            marginTop={60}
            fontSize={16}
            font={'bold'}
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </ScrollView>
    </View>
  );
};
export default ChangePasswordScreen;
