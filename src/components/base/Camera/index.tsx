import React, {
  forwardRef,
  Ref,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedProps,
  useSharedValue,
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {initialWindowMetrics} from 'react-native-safe-area-context';
import {StyleSheet, Platform, View, Text, Pressable, Image} from 'react-native';
import {
  Camera as VisionCamera,
  CameraProps as VisionCameraProps,
  CameraPosition,
  useCameraDevice,
  useCameraPermission,
  CameraRuntimeError,
  PhotoFile,
  VideoFile,
  useCameraFormat,
} from 'react-native-vision-camera';
import {GIFS} from '../../../assets';
import {getBestFormatCamera} from '../../../utils/helper';
import {height, width} from '../../../themes/helper';

interface CameraProps extends Omit<VisionCameraProps, 'device' | 'isActive'> {}

const AnimatedCamera = Animated.createAnimatedComponent(VisionCamera);

Animated.addWhitelistedNativeProps({zoom: true});

const pixelFormat = Platform.OS === 'ios' ? 'rgb' : 'yuv';
const MAX_ZOOM_FACTOR = 2;
const SCALE_FULL_ZOOM = 3;

export const Camera = forwardRef(
  (props: CameraProps, ref: Ref<VisionCamera>) => {
    const [cameraPosition, setCameraPosition] =
      useState<CameraPosition>('back');
    const [enableHdr, setEnableHdr] = useState(false);
    const [flash, setFlash] = useState<'off' | 'on'>('off');
    const [enableNightMode, setEnableNightMode] = useState(false);
    const [targetFps, setTargetFps] = useState(60);

    const device = useCameraDevice(cameraPosition);
    const format = useMemo(
      () =>
        device !== undefined
          ? getBestFormatCamera(device, width, height)
          : undefined,
      [device],
    );
    const {hasPermission, requestPermission} = useCameraPermission();

    const zoom = useSharedValue(1);
    const zoomOffset = useSharedValue(0);
    const isPressingButton = useSharedValue(false);

    // const format = useCameraFormat(device, [
    //   {fps: targetFps},
    //   {videoAspectRatio: height / width},
    //   {videoResolution: 'max'},
    //   {photoAspectRatio: height / width},
    //   {photoResolution: 'max'},
    // ]);

    const minZoom = device?.minZoom ?? 1;
    const maxZoom = Math.min(device?.maxZoom ?? 1, MAX_ZOOM_FACTOR);
    const supportsFlash = device?.hasFlash ?? false;
    const supportsHdr = format?.supportsPhotoHdr;
    const supports60Fps = useMemo(
      () => device?.formats.some(f => f.maxFps >= 60),
      [device?.formats],
    );
    const canToggleNightMode = device?.supportsLowLightBoost ?? false;
    const videoHdr = format?.supportsVideoHdr && enableHdr;
    const photoHdr = format?.supportsPhotoHdr && enableHdr && !videoHdr;
    const fps = Math.min(format?.maxFps ?? 1, targetFps);
    console.log('🚀 ~ Camera ~ fps:', fps);

    const setIsPressingButton = useCallback(
      (_isPressingButton: boolean) => {
        isPressingButton.value = _isPressingButton;
      },
      [isPressingButton],
    );

    const onMediaCaptured = useCallback(
      (media: PhotoFile | VideoFile, type: 'photo' | 'video') => {
        console.log(`Media captured! ${JSON.stringify(media)}`);
        // navigation.navigate('MediaPage', {
        //   path: media.path,
        //   type: type,
        // });
      },
      [],
    );

    const onFlipCameraPressed = useCallback(() => {
      setCameraPosition(p => (p === 'back' ? 'front' : 'back'));
    }, []);

    const onFlashPressed = useCallback(() => {
      setFlash(f => (f === 'off' ? 'on' : 'off'));
    }, []);

    const onError = useCallback((error: CameraRuntimeError) => {
      console.error(error);
    }, []);

    const cameraAnimatedProps = useAnimatedProps(() => {
      const z = Math.max(Math.min(zoom.value, maxZoom), minZoom);
      return {
        zoom: z,
      };
    }, [maxZoom, minZoom, zoom]);

    useEffect(() => {
      zoom.value = device?.neutralZoom ?? 1;
    }, [zoom, device]);

    useEffect(() => {
      requestPermission();
    }, [requestPermission]);

    const gesture = Gesture.Pinch()
      .onBegin(() => {
        zoomOffset.value = zoom.value;
      })
      .onUpdate(event => {
        const z = zoomOffset.value * event.scale;
        const scale = interpolate(
          event.scale,
          [1 - 1 / SCALE_FULL_ZOOM, 1, SCALE_FULL_ZOOM],
          [-1, 0, 1],
          Extrapolation.CLAMP,
        );
        zoom.value = interpolate(
          scale,
          [-1, 0, 1],
          [minZoom, z, maxZoom],
          Extrapolation.CLAMP,
        );
      });

    if (!hasPermission) {
      return (
        <View>
          <Text>No permission</Text>
        </View>
      );
    }

    if (device === undefined) {
      return (
        <View>
          <Text>No device</Text>
        </View>
      );
    }

    return (
      <View>
        <GestureDetector gesture={gesture}>
          <AnimatedCamera
            style={StyleSheet.absoluteFill}
            device={device}
            fps={fps}
            isActive
            ref={ref}
            exposure={0}
            torch={flash}
            format={format}
            // video
            // photo
            // videoHdr={videoHdr}
            // photoHdr={photoHdr}
            enableFpsGraph={true}
            enableZoomGesture={false}
            pixelFormat={pixelFormat}
            outputOrientation="device"
            // photoQualityBalance="speed"
            animatedProps={cameraAnimatedProps}
            onStarted={() => console.log('Camera started!')}
            onStopped={() => console.log('Camera stopped!')}
            onPreviewStarted={() => console.log('Preview started!')}
            onPreviewStopped={() => console.log('Preview stopped!')}
            onOutputOrientationChanged={o =>
              console.log(`Output orientation changed to ${o}!`)
            }
            onPreviewOrientationChanged={o =>
              console.log(`Preview orientation changed to ${o}!`)
            }
            onUIRotationChanged={degrees =>
              console.log(`UI Rotation changed: ${degrees}°`)
            }
            onError={onError}
            {...props}
          />
        </GestureDetector>

        {/* <View absoluteFillObject contentCenter>
        <LottieView autoPlay loop source={LOTTIES.QRScanner} style={{width: width, height: width, top: '-5%'}} />
      </View> */}

        <View>
          <Pressable onPress={onFlipCameraPressed}>
            <Text>Camera</Text>
          </Pressable>
          {supportsFlash && (
            <Pressable onPress={onFlashPressed}>
              <Text>{flash === 'on' ? 'Flash On' : 'Flash Off'}</Text>
            </Pressable>
          )}
          {supports60Fps && (
            <Pressable onPress={() => setTargetFps(t => (t === 30 ? 60 : 30))}>
              <Text>{`${targetFps}\nFPS`}</Text>
            </Pressable>
          )}
          {supportsHdr && (
            <Pressable onPress={() => setEnableHdr(h => !h)}>
              <Text>{enableHdr ? 'hdr' : 'hdr-off'}</Text>
            </Pressable>
          )}
          {canToggleNightMode && (
            <Pressable onPress={() => setEnableNightMode(!enableNightMode)}>
              <Text>{enableNightMode ? 'moon' : 'moon-outline'}</Text>
            </Pressable>
          )}
          {canToggleNightMode && (
            <Pressable onPress={() => setEnableNightMode(!enableNightMode)}>
              <Text>{enableNightMode ? 'moon' : 'moon-outline'}</Text>
            </Pressable>
          )}
          <Pressable>
            <Text>{'Cài đặt'}</Text>
          </Pressable>
          <Pressable>
            <Image source={GIFS.ic_scanner} width={23} height={23} />
          </Pressable>
        </View>
      </View>
    );
  },
);
