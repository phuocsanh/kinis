import {Image, Pressable, Text, View} from 'components/base';
import {navigationRef} from 'navigation/navigationRef';
import React from 'react';
import {COLORS} from 'themes/color';
import {width} from 'themes/helper';

const Item = ({
  item,
}: {
  item: {name: string; description: string; _id: string};
}) => {
  return (
    <Pressable
      onPress={() => navigationRef.navigate('DetailArticle')}
      radius={10}
      marginBottom={15}
      row
      width={'100%'}>
      <View flex={2.5}>
        <View
          marginTop={5}
          paddingHorizontal={5}
          paddingVertical={1}
          alignSelf="flex-start"
          backgroundColor={COLORS.primary100}
          radius={10}>
          <Text fontSize={11}>Wellness</Text>
        </View>
        <Text marginTop={7} numberOfLines={1}>
          {item.name}
        </Text>
        <View rowCenter justifyContent="space-between" marginBottom={10}>
          <Text fontSize={12} color={COLORS.cadetGrey}>
            5 min read
          </Text>
          <Text font="semiBold" fontSize={12} color={COLORS.shadowBlue}>
            CDC verifed
          </Text>
        </View>
      </View>
      <Image
        radius={10}
        flex={1}
        marginLeft={15}
        height={width / 5}
        contentFit="cover"
        source={{
          uri: 'data:image/jpeg;base64,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',
        }}
      />
    </Pressable>
  );
};

export default Item;
