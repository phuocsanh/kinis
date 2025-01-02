import {useState} from 'react';
import messaging from '@react-native-firebase/messaging';
import {useEffect} from 'react';

export function useFCMToken() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    messaging()
      .getToken()
      .then(setToken)
      .catch(e => {
        if (__DEV__) {
          console.log('GET FCM TOKEN ERROR', e);
        }
      });
    const unsubcribe = messaging().onTokenRefresh(setToken);
    return () => {
      unsubcribe();
    };
  }, []);

  useEffect(() => {
    if (token) {
      if (__DEV__) {
        console.log('DEVICE_TOKEN: ', token);
      }
    }
  }, [token]);

  return token;
}
