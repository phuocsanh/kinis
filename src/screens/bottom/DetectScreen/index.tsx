import {Camera, Text, View} from 'components/base';
import React from 'react';
import NotificationsScreen from 'screens/common/NotificationsScreen';

export const DetectScreen = () => {
  return (
    <View flex safePaddingBottom safePaddingTop safeMarginTop safeMarginBottom>
      <NotificationsScreen />
    </View>
  );
};
