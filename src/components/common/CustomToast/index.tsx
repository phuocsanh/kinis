import React from 'react';
import Toast, {
  ToastConfigParams,
  ToastData,
  ToastOptions,
} from 'react-native-toast-message';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ICONS} from 'assets';
import {Image, Pressable, Text, View} from 'components/base';
import {rhs, width} from 'themes/helper';

type Status = 'error' | 'success' | 'warning' | 'info';

const iconToast = {
  success: ICONS.ic_toastSuccess,
  warning: ICONS.ic_toastWarning,
  error: ICONS.ic_toastError,
  info: ICONS.ic_toastInfo,
};

const textColor = {
  success: '#1f8722',
  warning: '#f08135',
  error: '#d9100a',
  info: '#2A8EFE',
};

const bgIconToast = {
  success: '#def1d7',
  warning: '#fef7ec',
  error: '#fae1db',
  info: '#E0F3FF',
};

export type ToastMessageProps = {
  status: Status;
  action?: {title: string; onPress: () => void};
};

export type ToastProps = ToastData &
  Omit<ToastOptions, 'type' | 'props' | 'onPress' | 'onHide' | 'onShow'> & {
    type: Status;
    action?: {title?: string; onPress?: () => void};
  };

export const CustomToast = () => {
  const {top} = useSafeAreaInsets();
  return (
    <Toast topOffset={top + 12} visibilityTime={4000} config={{ToastMessage}} />
  );
};

export const showToast = (toastProps: ToastProps) => {
  return Toast.show({
    ...toastProps,
    type: 'ToastMessage',
    props: {status: toastProps.type, action: toastProps.action},
  });
};

export const ToastMessage = (params: ToastConfigParams<ToastMessageProps>) => {
  const {
    text1,
    text2,
    props: {status, action},
  } = params;
  return (
    <View
      radius={18}
      padding={12}
      width={rhs(width - 30)}
      borderColor={textColor[status]}
      backgroundColor={bgIconToast[status]}>
      <View row alignItems={text2 ? undefined : 'center'}>
        <Image square={30} contentFit="contain" source={iconToast[status]} />
        <View flex marginLeft={15}>
          {!!text1 && (
            <Text font="semiBold" fontSize={16} color={textColor[status]}>
              {text1}
            </Text>
          )}
          {!!text2 && <Text color={textColor[status]}>{text2}</Text>}
        </View>
        {/* <Pressable contentCenter square={30} onPress={() => Toast.hide()}>
          <Icon type="Ionicons" name="close" color={textColor[status]} />
        </Pressable> */}
      </View>
      {action?.title && (
        <Pressable
          marginLeft={45}
          marginTop={12}
          onPress={() => {
            Toast.hide();
            action.onPress();
          }}>
          <Text fontSize={14} font="semiBold" color={textColor[status]}>
            {action.title}
          </Text>
        </Pressable>
      )}
    </View>
  );
};
