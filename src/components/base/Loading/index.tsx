import React from 'react';
import {ActivityIndicator} from 'react-native';
import {View} from '../View';
import {COLORS} from 'themes/color';
import {Modal} from '../Modal';

export const Loading = () => {
  return (
    <Modal
      position="center"
      backdropOpacity={0.2}
      isVisible={true}
      containerStyle={{alignItems: 'center'}}>
      <View
        alignItems={'center'}
        justifyContent={'center'}
        height={70}
        width={70}
        radius={5}
        backgroundColor="gray">
        <ActivityIndicator size="small" color={COLORS.white} />
      </View>
    </Modal>
  );
};
