import {
  Frame,
  useSkiaFrameProcessor,
  VisionCameraProxy,
} from 'react-native-vision-camera';
import {PaintStyle, Skia} from '@shopify/react-native-skia';
import {linesBodyPart} from '../constants/linesPointPair';
import {COLORS} from '../themes/color';

const paint = Skia.Paint();
paint.setStrokeWidth(10);
paint.setStyle(PaintStyle.Fill);
paint.setColor(Skia.Color(COLORS.secondary));

const linePaint = Skia.Paint();
linePaint.setStrokeWidth(6);
linePaint.setStyle(PaintStyle.Fill);
linePaint.setColor(Skia.Color(COLORS.primary));

const landmarksPosePlugin = VisionCameraProxy.initFrameProcessorPlugin(
  'LandmarksPose',
  {},
);
// const landmarksHandPlugin = VisionCameraProxy.initFrameProcessorPlugin('landmarksHand', {});

function bodyLandmarks(frame: Frame) {
  'worklet';
  if (landmarksPosePlugin === undefined) {
    console.log(
      '🚀 ~ bodyLandmarks ~ landmarksPosePlugin:',
      landmarksPosePlugin,
    );
    throw new Error('Failed to load Frame Processor Plugin!');
  }
  return landmarksPosePlugin.call(frame);
}

// function handLandmarks(frame: Frame) {
//   'worklet';
//   if (landmarksHandPlugin === undefined) {
//     throw new Error('Failed to load Frame Processor Plugin!');
//   }
//   return landmarksHandPlugin.call(frame);
// }

// function drawParts(detectedPartsArray: any[], linesPart: number[][], frame: DrawableFrame) {
//   'worklet';
//   const frameWidth = Number(frame.width);
//   const frameHeight = Number(frame.height);
//   detectedPartsArray.forEach(part => {
//     if (Array.isArray(part) && part.length > 0) {
//       linesPart.forEach(([fromIndex, toIndex]) => {
//         const from = part[fromIndex];
//         const to = part[toIndex];
//         frame.drawLine(from.x * frameWidth, from.y * frameHeight, to.x * frameWidth, to.y * frameHeight, linePaint);
//       });
//       part.forEach(landmark => {
//         if (landmark && landmark.x !== undefined && landmark.y !== undefined) {
//           frame.drawCircle(landmark.x * frameWidth, landmark.y * frameHeight, 6, paint);
//         }
//       });
//     }
//   });
// }

interface LandmarksProps {
  isHand?: boolean;
  isPose?: boolean;
}
const pointsToDraw = Array.from(new Set(linesBodyPart.flat()));

export default function useLandmarks({isPose}: LandmarksProps) {
  const frameProcessor = useSkiaFrameProcessor(frame => {
    'worklet';
    // const resized = resize(frame, {
    //   scale: {
    //     width: 192,
    //     height: 192
    //   },
    //   pixelFormat: 'rgb',
    //   dataType: 'uint8'
    // })
    const detectedBodyData = isPose && bodyLandmarks(frame);
    console.log('🚀 ~ frameProcessor ~ detectedBodyData:', detectedBodyData);
    // const detectedHandData = isHand && handLandmarks(frame);

    frame.render();

    // const detectedBodyArray = Array.isArray(detectedBodyData) ? detectedBodyData : [];
    // const detectedHandArray = Array.isArray(detectedHandData) ? detectedHandData : [];

    // drawParts(detectedBodyArray, linesBodyPart, frame);
    // drawParts(detectedHandArray, linesHandPart, frame);

    const frameWidth = frame.width;
    const frameHeight = frame.height;

    for (const hand of detectedBodyData || ([] as any)) {
      // Draw lines
      for (const [from, to] of linesBodyPart) {
        frame.drawLine(
          hand[from].x * Number(frameWidth),
          hand[from].y * Number(frameHeight),
          hand[to].x * Number(frameWidth),
          hand[to].y * Number(frameHeight),
          linePaint,
        );
      }
      for (const index of pointsToDraw) {
        const mark = hand[index];
        frame.drawCircle(
          mark.x * Number(frameWidth),
          mark.y * Number(frameHeight),
          6,
          paint,
        );
      }
    }
  }, []);

  return frameProcessor;
}
