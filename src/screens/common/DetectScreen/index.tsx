import {Camera, View} from 'components/base';
import useLandmarks from 'hooks/useLandmarks';
import React from 'react';

export const DetectScreen = () => {
  const frameProcessor = useLandmarks({isPose: true});
  return (
    <View flex>
      <Camera frameProcessor={frameProcessor} />
    </View>
  );
};
