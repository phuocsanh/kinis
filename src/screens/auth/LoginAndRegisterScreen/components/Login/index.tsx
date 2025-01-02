import {Button, CheckBox, Image, Pressable, Text, View} from 'components/base';
import {FormInput} from 'components/form';
import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import formConfig, {FormField} from './formConfig';
import {useAppStore} from 'stores';
import {COLORS} from 'themes/color';
import {width} from 'themes/helper';
import {ICONS} from 'assets';
import {useLogin} from 'queries/auth';

const Login = () => {
  const saveAccount = useAppStore(state => state.saveAccount);
  const accountSaved = useAppStore(state => state.accountSaved);
  const {control, handleSubmit, setValue} = useForm<FormField>(formConfig);
  const [isSaved, setIsSaved] = useState(!!saveAccount && !!accountSaved);
  const {mutate, isPending, error} = useLogin();

  const onSubmit = async (value: FormField) => {
    mutate({
      username: value.username,
      password: value.password,
      isSaveAccount: !!isSaved,
    });
  };

  return (
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

            <Text fontSize={12} marginLeft={5} color={COLORS.darkElectricBlue}>
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
        marginTop={24}
        fontSize={16}
        font={'bold'}
        onPress={handleSubmit(onSubmit)}
      />
      <View marginTop={24} rowCenter justifyContent="space-between">
        <View
          borderWidth={0.3}
          borderStyle="solid"
          width={'30%'}
          borderColor={COLORS.cadetBlue}
        />
        <Text color={COLORS.cadetBlue}>or continue to</Text>
        <View
          borderWidth={0.3}
          borderStyle="solid"
          width={'30%'}
          borderColor={COLORS.cadetBlue}
        />
      </View>
      <Pressable
        marginTop={24}
        rowCenter
        alignItems="center"
        justifyContent="center"
        borderWidth={1}
        borderColor={COLORS.border}
        radius={100}
        height={48}>
        <Image source={ICONS.ic_google} square={24} contentFit="contain" />
        <Text
          marginLeft={12}
          fontSize={16}
          font="medium"
          color={COLORS.charcoal}>
          Sign in with Google
        </Text>
      </Pressable>
      <Pressable
        marginTop={12}
        rowCenter
        alignItems="center"
        justifyContent="center"
        borderWidth={1}
        backgroundColor={COLORS.black}
        borderColor={COLORS.border}
        radius={100}
        height={48}>
        <Image source={ICONS.ic_apple} square={24} contentFit="contain" />
        <Text marginLeft={12} fontSize={16} font="medium" color={COLORS.white}>
          Sign in with Apple
        </Text>
      </Pressable>
    </View>
  );
};

export default Login;
