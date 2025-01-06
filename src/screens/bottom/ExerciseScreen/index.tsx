import {Camera, Text, View} from 'components/base';
import React from 'react';
import {DetectScreen} from 'screens/common/DetectScreen';
import NotificationsScreen from 'screens/common/NotificationsScreen';

export const ExerciseScreen = () => {
  return (
    <View flex safePaddingBottom safePaddingTop safeMarginTop safeMarginBottom>
      {/* <NotificationsScreen /> */}
      <DetectScreen />
    </View>
  );
};
