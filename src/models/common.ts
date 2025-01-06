// import {FirebaseMessagingTypes} from '@react-native-firebase/messaging';
import {AxiosError} from 'axios';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyObject = {[key: string]: any};

export type ApiResponse = {code: number; message: string};

export interface ApiResponseData<D> extends ApiResponse {
  record: D;
}

export interface PagingResponseData<D> extends ApiResponse {
  totalPages: number;
  total: number;
  limit: number;
  page: number;
  list: D[];
}

export interface RecordCommon {
  _id: string;
  name: string;
  imageUrl: string;
  videoUrl: string;
  content: string;
  description: string;
}

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
