import {queryOptions, useMutation, useQuery} from '@tanstack/react-query';
import {ApiResponse, ApiResponseData} from 'models/common';
import {useAppStore} from 'stores';
import messaging from '@react-native-firebase/messaging';
import api from 'utils/api';
import {StatusAccount, UserInfo} from 'models/auth';
import {navigationRef} from 'navigation/navigationRef';
import {showToast} from 'components/common/CustomToast';

export const useRegister = () => {
  return useMutation({
    mutationFn: async ({
      username,
      password,
      password_confirm,
    }: {
      username: string;
      password: string;
      password_confirm: string;
    }) => {
      const rand = Math.floor(Math.random() * 10000);
      const res = await api.postRaw<ApiResponse>('/user/signup', {
        username,
        password,
        password_confirm,
        full_name: `Asher ${rand}`,
        email: `example${rand}@example.com`,
        gender: 1,
        province: '13000',
        district: '13113',
        ward: '9252',
        address: 'HCM',
        device_name: 'iDroid 20 Ultra Super Pro Max Deluxe',
        device_token: 'token123456789',
      });
      return res;
    },
  });
};
export const useUpdatePassword = () => {
  return useMutation({
    mutationFn: async ({
      currentPassword,
      newPassword,
    }: {
      currentPassword: string;
      newPassword: string;
    }) => {
      const res = await api.patchRaw<ApiResponse>('client/change-password', {
        currentPassword,
        newPassword,
      });

      return res;
    },
    onSuccess: () => {
      useAppStore.setState({userActive: true});
      navigationRef.navigate('Bottom', {screen: 'Articles'});
    },
  });
};
export const useChangePassword = () => {
  return useMutation({
    mutationFn: async ({
      currentPassword,
      newPassword,
    }: {
      currentPassword: string;
      newPassword: string;
    }) => {
      const res = await api.patchRaw<ApiResponse>('client/change-password', {
        currentPassword,
        newPassword,
      });

      return res;
    },
    onSuccess: () => {
      navigationRef.goBack();
      showToast({
        type: 'success',
        text1: 'Change password success!',
      });
    },
    onError: error => {
      showToast({
        type: 'error',
        text1: 'Error!',
        text2: error.response?.data.message || 'Please trying!',
      });
    },
  });
};
export const useLogout = () => {
  return useMutation({
    mutationFn: async () => {
      const res = await api.post<ApiResponse>('user/logout');
      return res;
    },
    onSettled: () => {
      useAppStore.setState({userToken: undefined, userActive: undefined});
    },
  });
};

export const userInfoOption = (userToken?: string) => {
  const token = userToken || useAppStore.getState().userToken;
  return queryOptions({
    queryKey: ['userInfo', token].filter(Boolean),
    queryFn: async () => {
      const res = await api.get<ApiResponseData<UserInfo>>('client/profile');
      return res.record;
    },
    enabled: !!token,
  });
};

export const useQueryUserInfo = () => {
  const userToken = useAppStore(state => state.userToken);
  return useQuery(userInfoOption(userToken));
};

export const useLogin = () => {
  return useMutation({
    mutationFn: async (body: {
      username: string;
      password: string;
      isSaveAccount: boolean;
    }) => {
      const device_token = await messaging().getToken();

      const res = await api.postRaw<
        ApiResponseData<{
          _id: string;
          accessToken: string;
          status: {name: StatusAccount};
        }>
      >('auth/login', {
        ...body,
        // device_token,
        // device_name: Device.deviceName || 'unknown',
      });
      console.log(
        '🚀 ~ useLogin ~ res.record.status.name:',
        res.record.status.name,
      );

      if (
        res.record.accessToken &&
        res.record.status.name === StatusAccount.ACTIVE
      ) {
        useAppStore.setState({
          userToken: res.record.accessToken,
          userActive: true,
        });
        useQueryUserInfo();
      }
      if (
        res.record.accessToken &&
        res.record.status.name === StatusAccount.PENDING_VERIFICATION
      ) {
        useAppStore.setState({
          userToken: res.record.accessToken,
          userActive: false,
        });
        navigationRef.navigate('UpdatePass');
      }
      return res;
    },
    onSuccess: (_, body) => {
      useAppStore.setState({
        accountSaved: {username: body.username, password: body.password},
        saveAccount: body.isSaveAccount,
      });
    },
  });
};
