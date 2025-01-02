import {CameraDevice, CameraDeviceFormat} from 'react-native-vision-camera';

/**
 * @param time miliseconds
 * @default 3000
 */

export const DEFAULT_LOCALES = 'vi-VN';
export const NUMBER_FORMAT = new Intl.NumberFormat(DEFAULT_LOCALES);

export const sleep = (time = 3000) => new Promise(r => setTimeout(r, time));

export const getBestFormatCamera = (
  device: CameraDevice,
  targetWidth: number,
  targetHeight: number,
): CameraDeviceFormat => {
  const size = targetWidth * targetHeight;
  return device.formats.reduce((prev, curr) => {
    const currentSize = curr.videoWidth * curr.videoHeight;
    const diff = Math.abs(size - currentSize);
    const previousSize = prev.videoWidth * prev.videoHeight;
    const prevDiff = Math.abs(size - previousSize);
    if (diff < prevDiff) {
      return curr;
    }
    return prev;
  }, device.formats[0]);
};

export const mapValueLabel = <T, KV extends keyof T, KL extends keyof T>(
  list: T[] | undefined,
  keyValue: KV,
  keyLabel: KL,
) => {
  return list?.map(x => ({
    ...x,
    value: x[keyValue],
    label: x[keyLabel],
  }));
};
