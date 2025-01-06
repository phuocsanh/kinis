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
import {Image, Pressable, Text, View} from 'components/base';
import {StyleSheet, Platform} from 'react-native';
import {getBestFormatCamera} from 'utils/helper';
import {height, width} from 'themes/helper';
import {GIFS, LOTTIES} from 'assets';
import {COLORS} from 'themes/color';
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
import {
  Circle,
  CircleOff,
  Moon,
  MoonStar,
  Settings,
  SwitchCamera,
  Zap,
  ZapOff,
} from 'lucide-react-native';
import {useIsFocused} from '@react-navigation/native';

interface CameraProps extends Omit<VisionCameraProps, 'device' | 'isActive'> {}

const AnimatedCamera = Animated.createAnimatedComponent(VisionCamera);

Animated.addWhitelistedNativeProps({zoom: true});

const pixelFormat = Platform.OS === 'ios' ? 'rgb' : 'yuv';
const MAX_ZOOM_FACTOR = 2;
const SCALE_FULL_ZOOM = 3;

export const Camera = forwardRef(
  (props: CameraProps, ref: Ref<VisionCamera>) => {
    const [cameraPosition, setCameraPosition] =
      useState<CameraPosition>('front');
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
      console.error('error camera', error);
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
        <View flex contentCenter>
          <Text>No permission</Text>
        </View>
      );
    }

    if (device === undefined) {
      return (
        <View flex contentCenter>
          <Text>No device</Text>
        </View>
      );
    }

    const [isCameraInitialized, setIsCameraInitialized] = useState(false);
    const [isActive, setIsActive] = useState(Platform.OS === 'ios');

    const isFocused = useIsFocused();

    useEffect(() => {
      if (Platform.OS === 'ios') {
        return () => {};
      }

      let timeout: NodeJS.Timeout;

      if (isCameraInitialized) {
        timeout = setTimeout(() => setIsActive(true), 150);
      }

      setIsActive(false);
      return () => {
        clearTimeout(timeout);
      };
    }, [isCameraInitialized]);
    const onInitialized = useCallback(() => {
      setIsCameraInitialized(true);
    }, []);
    return (
      <View flex>
        <GestureDetector gesture={gesture}>
          <AnimatedCamera
            onInitialized={onInitialized}
            style={StyleSheet.absoluteFill}
            device={device}
            fps={fps}
            isActive={isActive && isFocused && isCameraInitialized}
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
            photoQualityBalance="speed"
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

        <View
          gap={12}
          right={15}
          position="absolute"
          top={
            initialWindowMetrics?.insets.top
              ? initialWindowMetrics?.insets.top + 15
              : 15
          }>
          <Pressable
            contentCenter
            round={40}
            backgroundColor={COLORS.blackTransparent40}
            onPress={onFlipCameraPressed}>
            <SwitchCamera color="white" size={24} />
          </Pressable>
          {supportsFlash && (
            <Pressable
              contentCenter
              round={40}
              backgroundColor={COLORS.blackTransparent40}
              onPress={onFlashPressed}>
              {flash === 'on' ? <Zap /> : <ZapOff />}
            </Pressable>
          )}
          {supports60Fps && (
            <Pressable
              contentCenter
              round={40}
              backgroundColor={COLORS.blackTransparent40}
              onPress={() => setTargetFps(t => (t === 30 ? 60 : 30))}>
              <Text
                fontSize={11}
                fontWeight="bold"
                textAlign="center"
                color={COLORS.white}>{`${targetFps}\nFPS`}</Text>
            </Pressable>
          )}
          {supportsHdr && (
            <Pressable
              contentCenter
              round={40}
              backgroundColor={COLORS.blackTransparent40}
              onPress={() => setEnableHdr(h => !h)}>
              {enableHdr ? (
                <Circle color="white" size={24} />
              ) : (
                <CircleOff color="white" size={24} />
              )}
            </Pressable>
          )}
          {canToggleNightMode && (
            <Pressable
              contentCenter
              round={40}
              backgroundColor={COLORS.blackTransparent40}
              onPress={() => setEnableNightMode(!enableNightMode)}>
              {enableNightMode ? (
                <Moon color="white" size={24} />
              ) : (
                <MoonStar color="white" size={24} />
              )}
            </Pressable>
          )}

          <Pressable
            contentCenter
            round={40}
            backgroundColor={COLORS.blackTransparent40}>
            <Settings color="white" size={24} />
          </Pressable>
          <Pressable
            contentCenter
            round={40}
            backgroundColor={COLORS.blackTransparent40}>
            <Image source={GIFS.ic_scanner} square={25} />
          </Pressable>
        </View>
      </View>
    );
  },
);
