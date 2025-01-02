// import {FirebaseMessagingTypes} from '@react-native-firebase/messaging';
import {AxiosError} from 'axios';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyObject = {[key: string]: any};

export type ResponseData<D> = ApiResponse & {
  data: D;
};

export type ApiResponse = {
  code: number;
  message: string;
};

export type AppAxiosError = AxiosError<
  ApiResponse & {
    data?: AnyObject;
  }
>;

type Paging = {
  p?: number;
  limit?: number;
};

export type PagingParams<P = void> = P extends void
  ? Paging | void
  : Paging & P;

export type PagingResponseData<D> = ApiResponse & {
  data: {
    last_page: number;
    total: number;
    per_page: number;
    current_page: number;
    data: D[];
  };
  //from:number;
  //to:number;
};

export type Timeout = ReturnType<typeof setTimeout>;

export type Interval = ReturnType<typeof setInterval>;

export type UploadFile = {
  uri: string;
  name: string;
  type: string;
};

export const enum Gender {
  FEMALE,
  MALE,
}

export const enum Bool {
  NO,
  YES,
}

// export type FcmMessage = Omit<FirebaseMessagingTypes.RemoteMessage, 'data'> & {
//   data?: {
//     _id: string;
//     show_on_foreground?: '1' | '0';
//     type?: string;
//   };
// };
export type FcmMessage = Omit<any, 'data'> & {
  data?: {
    _id: string;
    show_on_foreground?: '1' | '0';
    type?: string;
  };
};
