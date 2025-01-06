import React from 'react';
import moment from 'moment';
import {ActionsProps} from 'react-native-gifted-chat';
// import {Image as ImageCompressor} from 'react-native-compressor';
import {Pressable, View} from 'components/base';

export type RenderActionProps = ActionsProps & {
  onSend?: (images: {image: string}[]) => void;
};

const MAX_FILE = 5;

// const DEFAULT_OPTION: Options = {
//   mediaType: 'photo',
//   compressImageQuality: 0.8,
//   compressImageMaxHeight: 2000,
//   compressImageMaxWidth: 2000,
// };

export default function RenderAction({onSend}: RenderActionProps) {
  const openCamera = () => {
    // Picker.openCamera({
    //   ...DEFAULT_OPTION,
    // }).then(async image => {
    //   const result = await ImageCompressor.compress(image.path);
    //   if (result) {
    //     uploadChatsPicture([
    //       {uri: result, name: `${moment().valueOf()}.jpg`, type: image.mime},
    //     ]).then(res => {
    //       if (res.data?.picture) {
    //         for (let i = 0; i < res.data?.picture.length!; i++) {
    //           onSend?.([{image: `${URI_IMG}${res?.data?.picture?.[i]}` || ''}]);
    //         }
    //         verifyPicture(res.data.picture);
    //       }
    //     });
    //   }
    // });
  };

  const openGallery = () => {
    // Picker.openPicker({
    //   mediaType: 'photo',
    //   compressImageQuality: 0.8,
    //   multiple: true,
    //   maxFiles: MAX_FILE,
    // }).then(async resPicker => {
    //   if (resPicker?.length) {
    //     const length =
    //       resPicker?.length > MAX_FILE ? MAX_FILE : resPicker?.length;
    //     let imgs: UploadFile[] = [];
    //     const reduceImageQuality = async (idx: number) => {
    //       if (idx === length) {
    //         return;
    //       }
    //       const result = await ImageCompressor.compress(resPicker[idx].path);
    //       imgs.push({
    //         uri: result,
    //         name: `${moment().valueOf()}-${idx}.jpg`,
    //         type: resPicker[idx].mime,
    //       });
    //       await reduceImageQuality(idx + 1);
    //     };
    //     await reduceImageQuality(0);
    //     if (imgs.length > 0) {
    //       uploadChatsPicture(imgs).then(res => {
    //         if (res.data?.picture) {
    //           for (let i = 0; i < res.data?.picture.length!; i++) {
    //             onSend?.([
    //               {image: `${URI_IMG}${res?.data?.picture?.[i]}` || ''},
    //             ]);
    //           }
    //           verifyPicture(res.data.picture);
    //         }
    //       });
    //     }
    //   }
    // });
  };

  return (
    <View rowCenter position="absolute" top={0} bottom={0}>
      {/* <Pressable marginRight={12} onPress={openCamera}>
        <Icon type="Ionicons" name="camera" size={30} color={COLORS.primary} />
      </Pressable>
      <Pressable onPress={openGallery}>
        <Icon type="Ionicons" name="image" size={30} color={COLORS.primary} />
      </Pressable> */}
    </View>
  );
}
