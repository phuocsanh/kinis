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
      marginRight={15}
      radius={10}
      width={width / 1.9}>
      <View>
        <Image
          radius={10}
          width={'100%'}
          height={width / 2.7}
          contentFit="cover"
          source={{
            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcC_69NP09PgSBKKjaeV_sXCePYdiQgS74Cw&s',
          }}
        />
        <View
          position="absolute"
          bottom={5}
          left={5}
          paddingHorizontal={5}
          paddingVertical={1}
          alignSelf="flex-start"
          backgroundColor={COLORS.white}
          radius={10}>
          <Text fontSize={11}>Kinis Ai</Text>
        </View>
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
    </Pressable>
  );
};

export default Item;
