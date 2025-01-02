import React, {useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';

const useNotificationListener = () => {
  useEffect(() => {
    const a = messaging().subscribeToTopic('test-topic');
    console.log('🚀 ~ useEffect ~ a:', a);
  }, []);

  useEffect(() => {
    const onMessageListener = messaging().onMessage(message => {
      if (__DEV__) {
        console.log(
          '%c FIREBASE_MESSAGE_FORE_GROUND: ',
          'color: yellow; font-weight: bold',
          message,
        );
      }
    });
    return onMessageListener;
  }, []);
};

export default useNotificationListener;
